import { defineStore } from 'pinia'
import { db } from '../../firebase.js'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { daysDifferenceFromMidnight } from '../utils/index.js'

export const useCatalogsStore = defineStore('catalogs', {
	state: () => ({
		catalogs: [],
		isLoading: true
	}),
	actions: {
	 async getCatalogs(update = false) {
			this.isLoading = true
		 	this.catalogs = []
			
		 	if (!update) {
				 const catalogsLocalStorage = localStorage.getItem('catalogs')
				 const lastUpdateLocalStorage = localStorage.getItem('catalogsLastUpdate')
				 if (catalogsLocalStorage && lastUpdateLocalStorage) {
					 const lastUpdateDate = new Date(lastUpdateLocalStorage)
					 const now = new Date()
					 const diffInDays = daysDifferenceFromMidnight(lastUpdateDate, now);
					 
					 if (diffInDays < 1) {
						 this.catalogs = JSON.parse(catalogsLocalStorage);
						 this.isLoading = false;
						 return;
					 }
				 }
		 }
		 
		 	const querySnapshot = await getDocs(collection(db, 'catalogs'))
			const items = []
		 
			querySnapshot.forEach((doc) => {
				items.push({ id: doc.id, ...doc.data() })
			})
		 
				this.catalogs = items
				localStorage.setItem('catalogs', JSON.stringify(items))
				localStorage.setItem('catalogsLastUpdate', new Date().toISOString())
				this.isLoading = false
			},
		
			async deleteCatalog(id) {
		 		this.isLoading = true
		 		await deleteDoc(doc(db, 'catalogs', id))
				await this.getCatalogs(true)
			}
	}
})
