<script setup>
import { onMounted, ref, defineAsyncComponent, watch } from 'vue'
import { useProductsStore } from '@/store/products.js'
import { useMenuStore } from '@/store/menu.js'
import { useUserStore } from '@/store/user.js'
import { useFeatureFlagsStore } from '@/store/featureFlags.js'
import { useToast } from 'primevue/usetoast'

const MpFooter = defineAsyncComponent(/* webpackChunkName: "mpFooter" */() => import('@/components/global/MpFooter.vue'))
const MpMainMenu = defineAsyncComponent(/* webpackChunkName: "mpMainMenu" */() => import('@/components/global/MpMainMenu.vue'))
const MpModalLogin = defineAsyncComponent(/* webpackChunkName: "mpModalLogin" */() => import('@/components/global/MpModalLogin.vue'))
const MpWhatsApp = defineAsyncComponent(/* webpackChunkName: "mpWhatsApp" */() => import('@/components/global/MpWhatsApp.vue'))
const MpModalLoading = defineAsyncComponent(/* webpackChunkName: "mpModalLoading" */() => import('@/components/global/MpModalLoading.vue'))

const products = useProductsStore()
const menuStore = useMenuStore()
const userStore = useUserStore()
const featureFlags = useFeatureFlagsStore()

const isOpen = ref(false)

const manageValueModal = (value) => {
  isOpen.value = value
}

const toast = useToast()

const showToast = (severity, summary, detail) => {
  toast.add({ severity, summary, detail, life: 5000 })
}

watch(
  () => userStore.loginStatus,
  (newStatus) => {
    if (newStatus === 'success') {
      showToast('success', 'Inicio de sesión exitoso', 'Has iniciado sesión correctamente.')
    } else if (newStatus === 'error') {
      showToast('error', 'Error de inicio de sesión', 'Por favor verifique sus credenciales e inténtelo nuevamente.')
    } else if (newStatus === 'logout') {
      showToast('info', 'Cerrado de sesión exitoso', 'Se ha cerrado la sesión correctamente.')
    }

    setTimeout(() => {
      userStore.resetLoginStatus()
    }, 5000)
  }
)

onMounted(async () => {
  await products.initProducts()
  await menuStore.getMenu()
  await featureFlags.getFeatureFlags()
})
</script>

<template>
  <MpMainMenu :menu="menuStore.menu" @openModal="manageValueModal"/>
  <div class="dark:bg-dark-mp min-h-screen-60 pb-10">
    <RouterView />
  </div>
  <MpFooter />
  <MpModalLogin
    :visible="isOpen"
    @manageModal="manageValueModal"
  />
  <MpModalLoading />
  <ScrollTop />
  <MpWhatsApp v-if="!userStore.isLogged" />
  <Toast position="top-left"/>
</template>

<style scoped>
</style>
