import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import { routes } from '@/router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import './style.css'
import App from './App.vue'
import Wind from '@/presets/wind'
import 'primeicons/primeicons.css';
const app = createApp(App)

// import 'primevue/resources/themes/saga-blue/theme.css'       // theme

// PrimeVue components
import Badge from 'primevue/badge'
import Galleria  from 'primevue/galleria'
import IconField from 'primevue/iconfield'
import Image from 'primevue/image'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import Skeleton from 'primevue/skeleton'

const router = createRouter({
    history: createWebHistory(),
    routes,
})
const pinia = createPinia()

app.use(PrimeVue, { pt: Wind })
app.component('Badge', Badge)
app.component('Galleria', Galleria)
app.component('IconField', IconField)
app.component('Image', Image)
app.component('InputIcon', InputIcon)
app.component('InputText', InputText)
app.component('Menubar', Menubar)
app.component('Skeleton', Skeleton)
app.use(router)
app.use(pinia)
app.mount('#megaprom')
