import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: defineAsyncComponent(/* webpackChunkName: "home" */() => import('@/views/Home.vue')),
        name: 'home',
        key: 'home',
    },
    {
        path: '/nosotros',
        component: defineAsyncComponent(/* webpackChunkName: "about-us" */() => import('@/views/AboutUs.vue')),
        name: 'about-us',
        key: 'about-us',
    },
    {
        path: '/catalogos',
        component: defineAsyncComponent(/* webpackChunkName: "catalogs" */() => import('@/views/Catalogs.vue')),
        name: 'catalogs',
        key: 'catalogs',
    },
    {
        path: '/contacto',
        component: defineAsyncComponent(/* webpackChunkName: "contact" */() => import('@/views/Contact.vue')),
        name: 'contact',
        key: 'contact',
    },
    {
        path: '/portafolio',
        component: defineAsyncComponent(/* webpackChunkName: "portfolio" */() => import('@/views/Portfolio.vue')),
        name: 'portfolio',
        key: 'portfolio',
    },
    {
        path: '/productos',
        component: defineAsyncComponent(/* webpackChunkName: "products" */() => import('@/views/Products.vue')),
        name: 'products',
        key: 'products',
    },
    {
        path: '/productos/:id',
        component: defineAsyncComponent(/* webpackChunkName: "product" */() => import('@/views/Product.vue')),
        name: 'product',
        key: 'product',
    },
    {
        path: '/busqueda',
        component: defineAsyncComponent(/* webpackChunkName: "search" */() => import('@/views/Search.vue')),
        name: 'search',
        key: 'search',
        params: true,
    }
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
