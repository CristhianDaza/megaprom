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
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'

const router = createRouter({
    history: createWebHistory(),
    routes,
})
const pinia = createPinia()

app.use(PrimeVue, { pt: Wind })
app.component('Badge', Badge)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('InputText', InputText)
app.component('Menubar', Menubar)
app.use(router)
app.use(pinia)
app.mount('#megaprom')
