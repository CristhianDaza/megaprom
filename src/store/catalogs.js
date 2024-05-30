import { defineStore } from 'pinia'
import { db } from '../../firebase.js'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes, deleteObject } from 'firebase/storage'
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
					 const diffInDays = daysDifferenceFromMidnight(lastUpdateDate, now)
					 
					 if (diffInDays < 1) {
						 this.catalogs = JSON.parse(catalogsLocalStorage)
						 this.isLoading = false
						 return
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
		
			async deleteCatalog(id, imageUrl) {
		 		this.isLoading = true
		 		await deleteDoc(doc(db, 'catalogs', id))
				if (imageUrl) {
					const storage = getStorage()
					const imageRef = storageRef(storage, imageUrl)
					try {
						await deleteObject(imageRef)
					} catch (error) {
						console.error("Error al eliminar la imagen:", error)
					}
				}
				await this.getCatalogs(true)
			},
			
			async _uploadImage (file) {
				if (!file) return
				
				const storage = getStorage();
				const fileRef = storageRef(storage, `catalogs/${file.name}`)
				await uploadBytes(fileRef, file)
				return await getDownloadURL(fileRef)
			},
		
			async addCatalog(data) {
				this.isLoading = true
				const image = await this._uploadImage(data.image)
				await addDoc(collection(db, 'catalogs'), { ...data, image })
				await this.getCatalogs(true)
			},
		
			async editCatalog(data) {
				this.isLoading = true
				let image = data.image
				if (data.image instanceof File) {
					image = await this._uploadImage(data.image)
				}
				await doc(db, 'catalogs', data.id)
				await updateDoc(doc(db, 'catalogs', data.id), { ...data, image })
				await this.getCatalogs(true)
			}
	}
})
