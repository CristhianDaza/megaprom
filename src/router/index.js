import AboutUs from '@/views/AboutUs.vue'
import Catalogs from '@/views/Catalogs.vue'
import Contact from '@/views/Contact.vue'
import Home from '@/views/Home.vue'
import Portfolio from '@/views/Portfolio.vue'
import Products from '@/views/Products.vue'

export const routes = [
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
