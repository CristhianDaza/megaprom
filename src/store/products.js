import { defineStore } from 'pinia'
import { normalizeAndFilterProducts, normalizeProductsMP } from '@/utils'
import { useProductHelpers } from '@/composables/useProduct.js'
import { getProductId } from '@/api/apiMarpico.js'
import { getProductStock } from '@/api/apiPromos.js'
import { collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase.js'
import { constructUpdatedTableQuantityCA } from '@/helpers/index.js'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    error: null,
    categories: [],
    isAdmin: false,
    filteredProducts: [],
    productsInput: [],
    product: null,
    similarProducts: [],
    isLoading: false,
    isLoadingAllProducts: false,
    isLoadingMp: false,
    isLoadingPromos: false,
    lastUpdateProducts: null,
    isLoadingFirebase: false,
    isUpdatedFirebase: false,
    statusMp: null,
    statusPromos: null,
    attempts: 0,
    statusFirebase: null,
    isUpdatedTable: false,
  }),
  actions: {
    async initProducts(update = false) {
      const isLogin = localStorage.getItem('isLogin')
      const {
        setAllProductsAndPromos,
        isLoadingAllProducts,
        isLoadingMp,
        isLoadingPromos,
        lastUpdateProducts,
        isLoadingFirebase,
        isUpdatedFirebase,
        statusMp,
        statusPromos,
        statusFirebase,
      } = useProductHelpers()
      try {
        if (isLogin === 'true') {
          this.isLoadingAllProducts = isLoadingAllProducts
          this.isLoadingMp = isLoadingMp
          this.isLoadingPromos = isLoadingPromos
          this.lastUpdateProducts = lastUpdateProducts
          this.isLoadingFirebase = isLoadingFirebase
          this.isUpdatedFirebase = isUpdatedFirebase
          this.statusMp = statusMp
          this.statusPromos = statusPromos
          this.statusFirebase = statusFirebase
          this.products = await setAllProductsAndPromos(true, update)
        } else {
          this.lastUpdateProducts = lastUpdateProducts
          this.products = await setAllProductsAndPromos(false)
        }
      } catch (error) {
        this.isLoadingFirebase = false
        this.statusFirebase = 'failed'
        console.error('Error in getAllProductsPromosApi:', error)
        this.error = error.message || error.code
      }
    },
    async _getProductsFirebase() {
      const { getProductsFirebase } = useProductHelpers()
      this.products = await getProductsFirebase()
      this.isLoading = false
    },
    async getCategories() {
      this.isLoading = true
      if (!this.products.length) {
        await this._getProductsFirebase()
      }
      const categories = this.products.flatMap(product => {
        if (product?.category) {
          return product.category.split('|').map(category => category.trim())
        }
        return []
      })
      const organizedCategories = [...new Set(categories)]
      this.categories = organizedCategories.sort()
      this.isLoading = false
    },
    async filterProductsByCategory(searchTerm) {
      this.isLoading = true
      if (!searchTerm || searchTerm.trim().length < 3) {
        return
      }
      
      if (!this.products.length) {
        await this._getProductsFirebase()
      }
      
      this.filteredProducts = normalizeAndFilterProducts(this.products, searchTerm)
      this.isLoading = false
    },
    async searchProductsInput(searchTerm) {
      if (!searchTerm || searchTerm.trim().length < 3) {
        this.resetProductsInput()
        return
      }
      
      if (!this.products.length) {
        await this._getProductsFirebase()
      }

      this.productsInput = normalizeAndFilterProducts(this.products, searchTerm)
    },
    resetProductsInput() {
      this.productsInput = []
    },
    async getProductById(id) {
      this.isLoading = true
      if (!this.products.length) {
        await this._getProductsFirebase()
      }
      this.product = this.products.find(product => product.id === id)
      this.isLoading = false
    },
    async getSimilarProduct(name) {
      if (!this.products.length) {
        await this._getProductsFirebase()
      }
      
      const firstName = name?.split(' ')[0]
      let similar = normalizeAndFilterProducts(this.products, firstName)
      
      if (similar.length <= 2) {
        similar = []
        while (similar.length < 10) {
          const randomIndex = Math.floor(Math.random() * this.products.length)
          const randomProduct = this.products[randomIndex]
          if (!similar.includes(randomProduct)) {
            similar.push(randomProduct)
          }
        }
      }
      
      this.similarProducts = similar.slice(0, 10)
    },
    updateAttempts() {
      this.attempts++
    },
    resetAttempts() {
      this.attempts = 0
    },
    
    async updateProduct(api, id, product) {
      this.isUpdatedTable = true
      let productData = null
      
      if (api === 'marpico') {
        const { data } = await getProductId(id)
        const [product] = await data
        productData = normalizeProductsMP(product)
      } else if (api === 'promoopcion') {
        const { tableQuantity } = product
        const skuPromises = tableQuantity.map(async sku => {
          const { data } = await getProductStock(sku.sku)
          return data
        })

        const skuData = await Promise.all(skuPromises)

        const productReduce = skuData.reduce((acc, skuResponse) => {
          if (skuResponse.success && skuResponse.Stocks && skuResponse.Stocks.length > 0) {
            skuResponse.Stocks.forEach(stock => {
              acc.push({
                Material: stock.Material,
                Stock: stock.Stock,
                Planta: stock.Planta
              })
            })
          }
          return acc
        }, [])
        
        const newProductData = constructUpdatedTableQuantityCA(product.tableQuantity, productReduce)
        
        productData = {
          ...product,
          tableQuantity: newProductData,
          lastUpdate: new Date().toISOString()
        }
      }
      
      const allProductsRef = collection(db, 'allProducts')
      const allCollectionsSnapshot = await getDocs(allProductsRef)
      
      for (const docSnapshot of allCollectionsSnapshot.docs) {
        const docData = docSnapshot.data()
        
        if (docData.products) {
          const productIndex = docData.products.findIndex(product => product.id === id)
          
          if (productIndex !== -1) {
            const updatedProduct = {
              ...docData.products[productIndex],
              ...productData,
              lastUpdate: new Date().toISOString()
            };
            docData.products[productIndex] = updatedProduct
            
            await updateDoc(docSnapshot.ref, { products: docData.products })
            this._updateProductInStore(updatedProduct)
          }
        }
      }
      this.isUpdatedTable = false
    },
    
    _updateProductInStore(updatedProduct) {
      const index = this.products.findIndex(product => product.id === updatedProduct.id)
      if (index !== -1) {
        this.products.splice(index, 1, updatedProduct)
      }
    }
  }
})
