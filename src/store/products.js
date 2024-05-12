import { defineStore } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { searchProduct } from '@/api/apiMarpico.js'
import { getAllProducts } from '@/api/apiPromos.js'
import { db } from '../../firebase.js'
import {combineProducts, normalizeProductsCA, normalizeProductsMP} from '@/helpers'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    error: null
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
        const normalizedPromosResults = data.response.map(normalizeProductsCA)
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
      if (!deletePromises.length) {
        return
      }
      await Promise.all(deletePromises)
    }
  }
})