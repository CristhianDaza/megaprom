import { ref } from 'vue'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { searchProduct } from '@/api/apiMarpico.js'
import { getAllProducts, getAllStock } from '@/api/apiPromos.js'
import { db } from '../../firebase.js'
import { combineProducts, normalizeProductsCA, normalizeProductsMP } from '@/utils'

export function useProductHelpers() {
  const isLoadingMp = ref(true)
  const statusMp = ref()
  const isLoadingPromos = ref(true)
  const statusPromos = ref()
  const isLoadingAllProducts = ref(false)
  const lastUpdateProducts = ref()
  const isLoadingFirebase = ref(false)
  const isUpdatedFirebase = ref(false)
  
  const setAllProductsAndPromos = async (isAdmin, updated = false) => {
    try {
      if (isAdmin) {
        const isUpdated = await _isUpdated()
        if (isUpdated && !updated) {
          return await getProductsFirebase()
        }
        isLoadingAllProducts.value = true

        const [{ data: productsData }, { data: stockData }] = await Promise.all([
          getAllProducts(),
          getAllStock()
        ])

        isLoadingPromos.value = false
        statusPromos.value = 'success'
        
        const normalizedPromosResults = productsData.response.map(product =>
          normalizeProductsCA(product, stockData?.Stocks)
        )

        const { data: mpData } = await searchProduct()
        const normalizedSearchResults = mpData.results.map(normalizeProductsMP)

        isLoadingMp.value = false
        statusMp.value = 'success'
        
        const allNormalizedProducts = [...normalizedPromosResults, ...normalizedSearchResults]

        const batchSize = 200
        isLoadingFirebase.value = true
        isUpdatedFirebase.value = true
        
        await _updatedFirebase()
        
        for (let i = 0; i < allNormalizedProducts.length; i += batchSize) {
          const batch = allNormalizedProducts.slice(i, i + batchSize)
          await addDoc(collection(db, 'allProducts'), { products: batch })
        }
        
        return await getProductsFirebase()
      } else {
        return await getProductsFirebase()
      }
    } catch (error) {
      isLoadingPromos.value = false
      isLoadingMp.value = false
      statusPromos.value = 'failed'
      statusMp.value = 'failed'
      console.error('Error in setAllProductsAndPromos:', error)
      throw new Error(error.message || error.code)
    }
  }
  
  const getProductsFirebase = async () => {
    const docRef = await getDocs(collection(db, 'allProducts'))

    const docRefLastUpdated = await getDocs(collection(db, 'lastedUpdated'))
    const { lastUpdate } = docRefLastUpdated.docs[0].data()
    lastUpdateProducts.value = lastUpdate
    const allNormalizedProducts = combineProducts(docRef.docs)
    isLoadingFirebase.value = false
    setTimeout(() => {
      isLoadingAllProducts.value = false
      isUpdatedFirebase.value = false
    }, 1500)
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
    lastUpdateProducts.value = lastUpdateDate
    return lastUpdateDay === nowDay
  }
  
  const _updatedFirebase = async () => {
    await _deleteAllProducts()
    await addDoc(collection(db, 'lastedUpdated'), { lastUpdate: new Date().toISOString() })
  }
  
  return {
    getProductsFirebase,
    setAllProductsAndPromos,
    isLoadingAllProducts,
    isLoadingMp,
    isLoadingPromos,
    lastUpdateProducts,
    isLoadingFirebase,
    isUpdatedFirebase,
    statusMp,
    statusPromos
  }
}
