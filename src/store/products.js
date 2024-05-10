import {defineStore} from 'pinia'
import { collection, addDoc, updateDoc, arrayUnion, getDocs, doc } from 'firebase/firestore'
import {searchProduct} from '@/api/apiMarpico.js'
import {getAllProducts} from '@/api/apiPromos.js'
import { db } from '../../firebase.js'
import { normalizeProductsCA, normalizeProductsMP } from '@/helpers'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    error: null
  }),
  actions: {
    async setAllProductsPromosApi() {
      try {
        const lastUpdateLocalStorage = localStorage.getItem('productsLastUpdate');
        if (lastUpdateLocalStorage) {
          const lastUpdateDate = new Date(lastUpdateLocalStorage);
          const now = new Date();
          const diffInMs = now - lastUpdateDate;
          const diffInHours = diffInMs / (1000 * 60 * 60);
          if (diffInHours < 24) {
            if (!this.products || this.products.length === 0) {
              this.getProductsFirebase();
            }
            return;
          }
        }
        
        // await this.deleteAllProducts(); TODO: Uncomment this line
        
        const [{ data: dataPromos }] = await Promise.all([getAllProducts()]);
        const normalizedPromosResults = dataPromos.response.map(normalizeProductsCA);
        const allNormalizedProducts = [...normalizedPromosResults];
        this.products = allNormalizedProducts.sort((a, b) => a.name.localeCompare(b.name));
        
        const docRef = await addDoc(collection(db, 'allProducts'), { products: this.products });
        await this.setAllProductsMpApi();
      } catch (error) {
        console.error("Error in getAllProductsPromosApi:", error);
        this.error = error.message || error.code;
      }
    },
    async setAllProductsMpApi() {
      try {
        const [{ data: searchData }] = await Promise.all([searchProduct()]);
        const normalizedSearchResults = searchData.results.map(normalizeProductsMP);
        const allNormalizedProducts = [...normalizedSearchResults];
        this.products.push(allNormalizedProducts.sort((a, b) => a.name.localeCompare(b.name)));
        
        const docRef = await addDoc(collection(db, 'allProducts'), { products: this.products });
        localStorage.setItem('productsLastUpdate', new Date().toISOString());
      } catch (error) {
        console.error("Error in getAllProductsMpApi:", error);
        this.error = error.message || error.code;
      }
    },
    async getProductsFirebase() {
      const docRef = await getDocs(collection(db, 'allProducts'));
      const items = [];
      
      docRef.forEach(doc => {
        items.push({ ...doc.data() });
      });
      // items.sort((a, b) => a.name.localeCompare(b.name));
      this.products = items;
    },
    async deleteAllProducts() {
      // TODO: funtion incomplete
      const collectionRef = collection(db, 'allProducts');
      const querySnapshot = await getDocs(collectionRef);
      
      const deletePromises = querySnapshot.docs.map(document => deleteDoc(doc(db, collectionName, document.id)));
      
      await Promise.all(deletePromises);
    }
  }
});
