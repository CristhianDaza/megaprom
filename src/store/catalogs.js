import { defineStore } from 'pinia'
import { db } from '../../firebase.js'
import { collection, getDocs } from 'firebase/firestore'

export const useCatalogsStore = defineStore('catalogs', {
	state: () => ({
		catalogs: []
	}),
	actions: {
	 async getCatalogs() {
			const catalogsLocalStorage = localStorage.getItem('catalogs')
      const lastUpdateLocalStorage = localStorage.getItem('catalogsLastUpdate')
		  if (catalogsLocalStorage && lastUpdateLocalStorage) {
				 const lastUpdateDate = new Date(lastUpdateLocalStorage);
				 const now = new Date();
				 const lastUpdateMidnight = new Date(lastUpdateDate.getFullYear(), lastUpdateDate.getMonth(), lastUpdateDate.getDate());
				 const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
				 const diffInMs = nowMidnight - lastUpdateMidnight;
				 const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
				 
				 if (diffInDays < 1) {
					 this.catalogs = JSON.parse(catalogsLocalStorage);
					 return;
				 }
			 }
		 
		 const querySnapshot = await getDocs(collection(db, 'catalogs'))
			const items = []
		 
			querySnapshot.forEach((doc) => {
				items.push({ id: doc.id, ...doc.data() })
			})
		 
			this.catalogs = items
		}
	}
})
