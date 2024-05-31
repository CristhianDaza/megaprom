import { defineStore } from 'pinia'
import { db } from '../../firebase.js'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { daysDifferenceFromMidnight } from '../utils/index.js'

export const useMenuStore = defineStore('menu', {
    state: () => ({
        menu: [],
        isLoading: true
    }),
    actions: {
        async getMenu(update = false) {
            this.isLoading = true
            if (!update) {
                const menuLocalStorage = localStorage.getItem('menu')
                const lastUpdateLocalStorage = localStorage.getItem('menuLastUpdate')
                if (menuLocalStorage && lastUpdateLocalStorage) {
                    const lastUpdateDate = new Date(lastUpdateLocalStorage)
                    const now = new Date()
                    const diffInDays = daysDifferenceFromMidnight(lastUpdateDate, now);
                    if (diffInDays < 1) {
                        this.menu = JSON.parse(menuLocalStorage)
                        this.isLoading = false
                        return
                    }
                }
            }

            const querySnapshot = await getDocs(collection(db, 'menu'))
            const items = []

            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() })
            });

            items.sort((a, b) => {
                const orderA = parseInt(a.order)
                const orderB = parseInt(b.order)
                return orderA - orderB
            });

            this.menu = items
            localStorage.setItem('menu', JSON.stringify(items))
            localStorage.setItem('menuLastUpdate', new Date().toISOString())
            console.log({ items })
            this.isLoading = false
        },
        
        async deleteMenu(id) {
            this.isLoading = true
            await deleteDoc(doc(db, 'menu', id))
            await this.getMenu(true)
        },
        
        async addMenu(data) {
            console.log({ data })
            this.isLoading = true
            await addDoc(collection(db, 'menu'), { ...data })
            await this.getMenu(true)
        },
        
        async editMenu(data) {
            this.isLoading = true
            await doc(db, 'menu', data.id)
            await updateDoc(doc(db, 'menu', data.id), { ...data })
            await this.getMenu(true)
        }
    }
})
