import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'

const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        name: 'home'
    },
    {
        path: '/nosotros',
        component: () => import(/* webpackChunkName: "about-us" */ '@/views/AboutUs.vue'),
        name: 'about-us'
    },
    {
        path: '/catalogos',
        component: () => import(/* webpackChunkName: "catalogs" */ '@/views/Catalogs.vue'),
        name: 'catalogs'
    },
    {
        path: '/contacto',
        component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue'),
        name: 'contact'
    },
    {
        path: '/portafolio',
        component: () => import(/* webpackChunkName: "portfolio" */ '@/views/Portfolio.vue'),
        name: 'portfolio'
    },
    {
        path: '/productos',
        component: () => import(/* webpackChunkName: "products" */ '@/views/Products.vue'),
        name: 'products'
    },
    {
        path: '/productos/:id',
        component: () => import(/* webpackChunkName: "product" */ '@/views/Product.vue'),
        name: 'product'
    },
    {
        path: '/busqueda',
        component: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue'),
        name: 'search'
    },
    {
        path: '/admin',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue'),
        name: 'admin',
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { left: 0, top: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!getAuth().currentUser) {
            next({ name: 'home' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
