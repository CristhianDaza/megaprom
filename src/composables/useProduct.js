import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { searchProduct } from '@/api/apiMarpico.js'
import { getAllProducts, getAllStock } from '@/api/apiPromos.js'
import { db } from '../../firebase.js'
import { combineProducts, normalizeProductsCA, normalizeProductsMP } from '@/utils'

export function useProductHelpers() {
  const getProductsFirebase = async () => {
    const docRef = await getDocs(collection(db, 'allProducts'))
    const allNormalizedProducts = combineProducts(docRef.docs)
    return allNormalizedProducts.sort((a, b) => a.name.localeCompare(b.name))
  }
  
  const _deleteAllProducts = async () => {
    const docRef = await getDocs(collection(db, 'allProducts'))
    const lastUpdateRef = await getDocs(collection(db, 'lastedUpdated'))
    
    const deleteLastUpdate = lastUpdateRef.docs.map(document => deleteDoc(doc(db, 'lastedUpdated', document.id)))
    
    const deletePromises = docRef.docs.map(document => deleteDoc(doc(db, 'allProducts', document.id)))
    if (!deletePromises || deletePromises.length === 0) {
      return
    }
    await Promise.all([deletePromises, deleteLastUpdate])
  }
  
  const setAllProductsPromosApi = async (isAdmin) => {
    try {
      if (isAdmin) {
        const isUpdated = await _isUpdated()
        if (isUpdated) {
          return await getProductsFirebase()
        }
        
        await _deleteAllProducts()
        
        const { data } = await getAllProducts()
        const { data: stock } = await getAllStock()
        const normalizedPromosResults = data.response.map(product => normalizeProductsCA(product, stock?.Stocks))
        const allNormalizedProducts = [...normalizedPromosResults]
        
        await addDoc(collection(db, 'allProducts'), { products: allNormalizedProducts })
        return await _setAllProductsMpApi()
      } else {
        return await getProductsFirebase()
      }
    } catch (error) {
      console.error('Error in getAllProductsPromosApi:', error)
      throw new Error(error.message || error.code)
    }
  }
  
  const _setAllProductsMpApi = async () => {
    try {
      let products
      const { data } = await searchProduct()
      const normalizedSearchResults = data.results.map(normalizeProductsMP)
      products = [...normalizedSearchResults]
      
      const batchSize = 100
      for (let i = 0; i < products.length; i += batchSize) {
        const batch = products.slice(i, i + batchSize)
        await addDoc(collection(db, 'allProducts'), { products: batch })
      }
      
      await addDoc(collection(db, 'lastedUpdated'), { lastUpdate: new Date().toISOString() })
      return await getProductsFirebase()
    } catch (error) {
      console.error('Error in getAllProductsMpApi:', error)
      throw new Error(error.message || error.code)
    }
  }
  
  const _isUpdated = async () => {
    const docRef = await getDocs(collection(db, 'lastedUpdated'))
    if (!docRef.docs || docRef.docs.length === 0) {
      return false
    }
    const { lastUpdate } = docRef.docs[0].data()
    const lastUpdateDate = new Date(lastUpdate)
    const now = new Date()
    const lastUpdateDay = lastUpdateDate.getDate()
    const nowDay = now.getDate()

    return lastUpdateDay === nowDay
  }
  
  return {
    getProductsFirebase,
    setAllProductsPromosApi,
  }
}
