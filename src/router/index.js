import { createRouter, createWebHistory } from 'vue-router';

import AboutUs from '@/views/AboutUs.vue'
import Catalogs from '@/views/Catalogs.vue'
import Contact from '@/views/Contact.vue'
import Home from '@/views/Home.vue'
import Portfolio from '@/views/Portfolio.vue'
import Products from '@/views/Products.vue'

const routes = [
    {
        path: '/',
        component: Home,
        name: 'home',
        key: 'home',
    },
    {
        path: '/nosotros',
        component: AboutUs,
        name: 'about-us',
        key: 'about-us',
    },
    {
        path: '/catalogos',
        component: Catalogs,
        name: 'catalogs',
        key: 'catalogs',
    },
    {
        path: '/contacto',
        component: Contact,
        name: 'contact',
        key: 'contact',
    },
    {
        path: '/portafolio',
        component: Portfolio,
        name: 'portfolio',
        key: 'portfolio',
    },
    {
        path: '/productos',
        component: Products,
        name: 'products',
        key: 'products',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

export default router;
