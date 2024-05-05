import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import './style.css'
import App from './App.vue'
import Wind from '@/presets/wind'
import 'primeicons/primeicons.css';
const app = createApp(App)


app.use(PrimeVue, {
    pt: Wind
})
app.mount('#megaprom')
