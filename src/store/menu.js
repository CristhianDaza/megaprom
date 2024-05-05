import { defineStore } from 'pinia'
import { db } from '../../firebase.js'
import { collection, getDocs } from 'firebase/firestore'

export const useMenuStore = defineStore('menu', {
    id: 'menu',
    state: () => ({
        items: [],
    }),
    actions: {
        async getMenu() {
            const querySnapshot = await getDocs(collection(db, 'menu'));
            const items = [];

            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });

            items.sort((a, b) => {
                const orderA = parseInt(a.order);
                const orderB = parseInt(b.order);
                return orderA - orderB;
            });

            this.items = items;
        }
    }
})
