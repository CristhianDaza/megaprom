import { defineStore } from 'pinia'
import { normalizeAndFilterProducts } from '@/utils'
import { useProductHelpers } from '@/composables/useProduct.js'

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
    lastUpdateProducts: null
  }),
  actions: {
    async initProducts() {
      const isLogin = localStorage.getItem('isLogin')
      const {
        setAllProductsPromosApi,
        isLoadingAllProducts,
        isLoadingMp,
        isLoadingPromos,
        lastUpdateProducts
      } = useProductHelpers()
      try {
        if (isLogin === 'true') {
          this.isLoadingAllProducts = isLoadingAllProducts
          this.isLoadingMp = isLoadingMp
          this.isLoadingPromos = isLoadingPromos
          this.lastUpdateProducts = lastUpdateProducts
          this.products = await setAllProductsPromosApi(true)
        } else {
          this.lastUpdateProducts = lastUpdateProducts
          this.products = await setAllProductsPromosApi(false)
        }
      } catch (error) {
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
    }
  }
})
