import { defineStore } from 'pinia'
import { db } from '../../firebase.js'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes, deleteObject } from 'firebase/storage'
import { daysDifferenceFromMidnight } from '../utils/index.js'

export const useCarouselStore = defineStore('carousel', {
    state: () => ({
        carousel: [],
        isLoading: true
    }),
    actions: {
        async getCarousel(update = false) {
            this.isLoading = true
            if (!update) {
                const carouselLocalStorage = localStorage.getItem('carousel')
                const lastUpdateLocalStorage = localStorage.getItem('carouselLastUpdate')
                if (carouselLocalStorage && lastUpdateLocalStorage) {
                    const lastUpdateDate = new Date(lastUpdateLocalStorage)
                    const now = new Date()
                    const diffInDays = daysDifferenceFromMidnight(lastUpdateDate, now);
                    if (diffInDays < 1) {
                        this.carousel = JSON.parse(carouselLocalStorage)
                        this.isLoading = false
                        return
                    }
                }
            }

            const querySnapshot = await getDocs(collection(db, 'carousel'))
            const items = []

            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() })
            })

            this.carousel = items;
            localStorage.setItem('carousel', JSON.stringify(items))
            localStorage.setItem('carouselLastUpdate', new Date().toISOString())
            this.isLoading = false
        },
        
        async deleteCarousel(id, imageUrl) {
            this.isLoading = true
            await deleteDoc(doc(db, 'carousel', id))
            if (imageUrl) {
                const storage = getStorage()
                const imageRef = storageRef(storage, imageUrl)
                try {
                    await deleteObject(imageRef)
                } catch (error) {
                    console.error("Error al eliminar la imagen:", error)
                }
            }
            await this.getCarousel(true)
        },
        
        async _uploadImageCarousel (file) {
            if (!file) return
            
            const storage = getStorage();
            const fileRef = storageRef(storage, `carousel/${file.name}`)
            await uploadBytes(fileRef, file)
            return await getDownloadURL(fileRef)
        },
        
        async addImageCarousel(data) {
            this.isLoading = true
            const image = await this._uploadImageCarousel(data.image)
            await addDoc(collection(db, 'carousel'), { ...data, image })
            await this.getCarousel(true)
        },
        
        async editImageCarousel(data) {
            this.isLoading = true
            let image = data.image
            if (data.image instanceof File) {
                image = await this._uploadImageCarousel(data.image)
            }
            await doc(db, 'carousel', data.id)
            await updateDoc(doc(db, 'carousel', data.id), { ...data, image })
            await this.getCarousel(true)
        }
    }
})
