import {defineStore} from 'pinia'
import {addDoc, collection, deleteDoc, doc, getDocs} from 'firebase/firestore'
import {searchProduct} from '@/api/apiMarpico.js'
import {getAllProducts, getAllStock} from '@/api/apiPromos.js'
import {db} from '../../firebase.js'
import {combineProducts, normalizeAndFilterProducts, normalizeProductsCA, normalizeProductsMP} from '@/helpers'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    error: null,
    categories: [],
    isAdmin: false,
    filteredProducts: [],
    productsInput: [],
    product: null,
    similarProducts: []
  }),
  actions: {
    async setAllProductsPromosApi() {
      try {
        const lastUpdateLocalStorage = localStorage.getItem('productsLastUpdate')
        if (lastUpdateLocalStorage) {
          const lastUpdateDate = new Date(lastUpdateLocalStorage)
          const now = new Date()
          const diffInMs = now - lastUpdateDate
          const diffInHours = diffInMs / (1000 * 60 * 60)
          if (diffInHours < 24) {
            if (!this.products || this.products.length === 0) {
              await this._getProductsFirebase()
            }
            return
          }
        }
        
        await this._deleteAllProducts()
        
        const { data } = await getAllProducts()
        const { data: stock } = await getAllStock()
        const normalizedPromosResults = data.response.map(product => normalizeProductsCA(product, stock?.Stocks))
        const allNormalizedProducts = [...normalizedPromosResults]
        
        await addDoc(collection(db, 'allProducts'), { products: allNormalizedProducts })
        await this._setAllProductsMpApi()
      } catch (error) {
        console.error('Error in getAllProductsPromosApi:', error)
        this.error = error.message || error.code
      }
    },
    async _setAllProductsMpApi() {
      try {
        let products = [];
        const { data } = await searchProduct()
        const normalizedSearchResults = data.results.map(normalizeProductsMP)
        products = [...normalizedSearchResults]
        
        await addDoc(collection(db, 'allProducts'), { products })
        localStorage.setItem('productsLastUpdate', new Date().toISOString())
        await this._getProductsFirebase()
      } catch (error) {
        console.error('Error in getAllProductsMpApi:', error)
        this.error = error.message || error.code
      }
    },
    async _getProductsFirebase() {
      const docRef = await getDocs(collection(db, 'allProducts'))
      const allNormalizedProducts = combineProducts(docRef.docs)
      this.products = allNormalizedProducts.sort((a, b) => a.name.localeCompare(b.name))
    },
    async _deleteAllProducts() {
      const docRef = await getDocs(collection(db, 'allProducts'))
      
      const deletePromises = docRef.docs.map(document => deleteDoc(doc(db, 'allProducts', document.id)))
      if (!deletePromises || deletePromises.length === 0) {
        return
      }
      await Promise.all(deletePromises)
    },
    async getCategories() {
      if (!this.products.length) {
        await this._getProductsFirebase()
      }
      const categories = this.products.map(product => product.category)
      this.categories = [...new Set(categories)]
    },
    async filterProductsByCategory(searchTerm) {
      if (!searchTerm || searchTerm.trim().length < 3) {
        return;
      }
      
      if (!this.products.length) {
        await this._getProductsFirebase();
      }
      
      this.filteredProducts = normalizeAndFilterProducts(this.products, searchTerm);
    },
    
    async searchProductsInput(searchTerm) {
      if (!searchTerm || searchTerm.trim().length < 3) {
        this.resetProductsInput();
        return;
      }
      
      if (!this.products.length) {
        await this._getProductsFirebase();
      }
      
      const searchResults = normalizeAndFilterProducts(this.products, searchTerm);
      this.productsInput = searchResults.slice(0, 5);
    },
    
    resetProductsInput() {
      this.productsInput = []
    },
    
    async getProductById(id) {
      if (!this.products.length) {
        await this._getProductsFirebase();
      }
      this.product = this.products.find(product => product.id === id)
    },
    async getSimilarProduct(name) {
      if (!this.products.length) {
        await this._getProductsFirebase();
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
      
      this.similarProducts = similar.slice(0, 10);
    }
  }
})
