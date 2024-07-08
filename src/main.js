import { createApp } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import './style.css'
import App from './App.vue'
import Wind from '@/presets/wind'
import 'primeicons/primeicons.css'
import '@github/relative-time-element';
import { VueHeadMixin, createHead } from '@unhead/vue'
const app = createApp(App)

import { useUserStore } from '@/store/user.js'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

const pinia = createPinia()
app.use(pinia)

// import 'primevue/resources/themes/saga-blue/theme.css'       // theme

const head = createHead();
app.use(head);
app.mixin(VueHeadMixin)

const userStore = useUserStore()
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = {
      uid: user.uid,
      email: user.email
    }
    userStore.hasUser(uid)
    localStorage.setItem('isLogin', 'true')
  } else {
    userStore.hasUser(null)
    localStorage.setItem('isLogin', 'false')
  }
})


// PrimeVue components
import Badge from 'primevue/badge'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import IconField from 'primevue/iconfield'
import Image from 'primevue/image'
import InlineMessage from 'primevue/inlinemessage'
import InputIcon from 'primevue/inputicon'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import Password from 'primevue/password'
import ProgressBar from 'primevue/Progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import ScrollTop from 'primevue/scrolltop'
import Skeleton from 'primevue/skeleton'
import SplitButton from 'primevue/splitbutton'
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ToggleButton from 'primevue/togglebutton'
import Tooltip from 'primevue/tooltip'

app.use(PrimeVue, { pt: Wind })
app.component('Badge', Badge)
app.component('Breadcrumb', Breadcrumb)
app.component('Button', Button)
app.component('Card', Card)
app.component('CarouselP', Carousel)
app.component('Checkbox', Checkbox)
app.component('Chip', Chip)
app.component('Column', Column)
app.component('ConfirmDialog', ConfirmDialog)
app.component('DataTable', DataTable)
app.component('Dialog', Dialog)
app.component('Divider', Divider)
app.component('Fieldset', Fieldset)
app.component('FileUpload', FileUpload)
app.component('IconField', IconField)
app.component('Image', Image)
app.component('InlineMessage', InlineMessage)
app.component('InputIcon', InputIcon)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Menubar', Menubar)
app.component('Password', Password)
app.component('ProgressBar', ProgressBar)
app.component('ProgressSpinner', ProgressSpinner)
app.component('ScrollTop', ScrollTop)
app.component('Skeleton', Skeleton)
app.component('SplitButton', SplitButton)
app.component('TabPanel', TabPanel)
app.component('TabView', TabView)
app.component('Toast', Toast)
app.component('ToggleButton', ToggleButton)
app.use(ConfirmationService);
app.use(ToastService)
app.use(router)
app.directive('tooltip', Tooltip)
app.mount('#megaprom')
