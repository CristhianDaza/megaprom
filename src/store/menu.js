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
            const menuLocalStorage = localStorage.getItem('menu');
            const lastUpdateLocalStorage = localStorage.getItem('menuLastUpdate');
            if (menuLocalStorage && lastUpdateLocalStorage) {
                const lastUpdateDate = new Date(lastUpdateLocalStorage);
                const now = new Date();

                const diffInMs = now - lastUpdateDate;
                const diffInHours = diffInMs / (1000 * 60 * 60);

                if (diffInHours < 24) {
                    this.items = JSON.parse(menuLocalStorage);
                    return;
                }
            }

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
            localStorage.setItem('menu', JSON.stringify(items));
            localStorage.setItem('menuLastUpdate', new Date().toISOString());
        }
    }
})
