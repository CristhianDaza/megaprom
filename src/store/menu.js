import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
    id: 'menu',
    state: () => ({
        items: [
            {
                label: 'Inicio',
                icon: 'pi pi-home',
                name: 'home',
            },
            {
                label: 'Productos',
                icon: 'pi pi-shopping-cart',
                name: 'products',
            },
            {
                label: 'Catálogos',
                icon: 'pi pi-book',
                name: 'catalogs',
            },
            {
                label: 'Contacto',
                icon: 'pi pi-envelope',
                name: 'contact',
            },
            {
                label: 'Nosotros',
                icon: 'pi pi-info-circle',
                name: 'about-us',
            }
        ],
    }),
})
