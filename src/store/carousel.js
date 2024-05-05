import { defineStore } from 'pinia'
import { db } from '../../firebase.js'
import { collection, getDocs } from 'firebase/firestore'

export const useCarouselStore = defineStore('carousel', {
    id: 'carousel',
    state: () => ({
        carousel: [],
        isLoading: true,
    }),
    actions: {
        async getCarousel() {
            this.isLoading = true;
            const carouselLocalStorage = localStorage.getItem('carousel');
            const lastUpdateLocalStorage = localStorage.getItem('carouselLastUpdate');
            if (carouselLocalStorage && lastUpdateLocalStorage) {
                const lastUpdateDate = new Date(lastUpdateLocalStorage);
                const now = new Date();

                const diffInMs = now - lastUpdateDate;
                const diffInHours = diffInMs / (1000 * 60 * 60);

                if (diffInHours < 24) {
                    this.carousel = JSON.parse(carouselLocalStorage);
                    this.isLoading = false;
                    return;
                }
            }

            const querySnapshot = await getDocs(collection(db, 'carousel'));
            const items = [];

            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });

            this.carousel = items;
            localStorage.setItem('carousel', JSON.stringify(items));
            localStorage.setItem('carouselLastUpdate', new Date().toISOString());
            this.isLoading = false;
        }
    }
})
