import { createApp } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import './style.css'
import App from './App.vue'
import Wind from '@/presets/wind'
import 'primeicons/primeicons.css'
import '@github/relative-time-element';
import { createHead } from '@vueuse/head'
const app = createApp(App)

import { useUserStore } from '@/store/user.js'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

const pinia = createPinia()
app.use(pinia)

// import 'primevue/resources/themes/saga-blue/theme.css'       // theme

const head = createHead();
app.use(head);

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
})


// PrimeVue components
import Badge from 'primevue/badge'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Chip from 'primevue/chip'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Fieldset from 'primevue/fieldset'
import IconField from 'primevue/iconfield'
import Image from 'primevue/image'
import InlineMessage from 'primevue/inlinemessage'
import InputIcon from 'primevue/inputicon'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import Password from 'primevue/password'
import ProgressSpinner from 'primevue/progressspinner'
import ScrollTop from 'primevue/scrolltop'
import Skeleton from 'primevue/skeleton'
import SplitButton from 'primevue/splitbutton'
import Toast from 'primevue/toast'
import ToggleButton from 'primevue/togglebutton'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

app.use(PrimeVue, { pt: Wind })
app.component('Badge', Badge)
app.component('Breadcrumb', Breadcrumb)
app.component('Button', Button)
app.component('Card', Card)
app.component('CarouselP', Carousel)
app.component('Chip', Chip)
app.component('Dialog', Dialog)
app.component('Divider', Divider)
app.component('Fieldset', Fieldset)
app.component('IconField', IconField)
app.component('Image', Image)
app.component('InlineMessage', InlineMessage)
app.component('InputIcon', InputIcon)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Menubar', Menubar)
app.component('Password', Password)
app.component('ProgressSpinner', ProgressSpinner)
app.component('ScrollTop', ScrollTop)
app.component('Skeleton', Skeleton)
app.component('SplitButton', SplitButton)
app.component('Toast', Toast)
app.component('ToggleButton', ToggleButton)
app.use(ToastService)
app.use(router)
app.directive('tooltip', Tooltip)
app.mount('#megaprom')
