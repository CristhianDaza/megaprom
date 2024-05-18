import { createApp } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import './style.css'
import App from './App.vue'
import Wind from '@/presets/wind'
import 'primeicons/primeicons.css';
const app = createApp(App)

import { useUserStore } from '@/store/user.js'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

const pinia = createPinia()
app.use(pinia)

// import 'primevue/resources/themes/saga-blue/theme.css'       // theme


const userStore = useUserStore()
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = {
      uid: user.uid,
      email: user.email
    }
    userStore.hasUser(uid)
  } else {
    userStore.hasUser(null)
  }
});


// PrimeVue components
import Badge from 'primevue/badge'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Chip from 'primevue/chip'
import Dialog from 'primevue/dialog'
import IconField from 'primevue/iconfield'
import Image from 'primevue/image'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import Skeleton from 'primevue/skeleton'

app.use(PrimeVue, { pt: Wind })
app.component('Badge', Badge)
app.component('Breadcrumb', Breadcrumb)
app.component('Button', Button)
app.component('Card', Card)
app.component('Chip', Chip)
app.component('CarouselP', Carousel)
app.component('Dialog', Dialog)
app.component('IconField', IconField)
app.component('Image', Image)
app.component('InputIcon', InputIcon)
app.component('InputText', InputText)
app.component('Menubar', Menubar)
app.component('Skeleton', Skeleton)
app.use(router)
app.mount('#megaprom')
