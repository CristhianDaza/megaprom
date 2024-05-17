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
    similarProducts: []
  }),
  actions: {
    async initProducts() {
      const { setAllProductsPromosApi } = useProductHelpers()
      try {
        const isAdminStorage = localStorage.getItem('isAdmin')
        if (isAdminStorage === 'true') {
          this.products = await setAllProductsPromosApi(true)
        } else {
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
    },
    async getCategories() {
      if (!this.products.length) {
        await this._getProductsFirebase()
      }
      const categories = this.products.map(product => product.category)
      const names = this.products.map(product => product.name.split(' ')[0])
      const organizedCategories = [...new Set(categories), ...new Set(names)]
      this.categories = organizedCategories.sort()
    },
    async filterProductsByCategory(searchTerm) {
      if (!searchTerm || searchTerm.trim().length < 3) {
        return
      }
      
      if (!this.products.length) {
        await this._getProductsFirebase()
      }
      
      this.filteredProducts = normalizeAndFilterProducts(this.products, searchTerm)
    },
    async searchProductsInput(searchTerm) {
      if (!searchTerm || searchTerm.trim().length < 3) {
        this.resetProductsInput()
        return
      }
      
      if (!this.products.length) {
        await this._getProductsFirebase()
      }
      
      const searchResults = normalizeAndFilterProducts(this.products, searchTerm)
      this.productsInput = searchResults.slice(0, 5)
    },
    resetProductsInput() {
      this.productsInput = []
    },
    async getProductById(id) {
      if (!this.products.length) {
        await this._getProductsFirebase()
      }
      this.product = this.products.find(product => product.id === id)
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
