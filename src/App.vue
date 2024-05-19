<script setup>
import { onMounted, ref, defineAsyncComponent } from 'vue'
import { useProductsStore } from '@/store/products.js'
import { useMenuStore } from "@/store/menu.js";

const MpFooter = defineAsyncComponent(/* webpackChunkName: "mpFooter" */() => import('@/components/global/MpFooter.vue'))
const MpMainMenu = defineAsyncComponent(/* webpackChunkName: "mpMainMenu" */() => import('@/components/global/MpMainMenu.vue'))
const MpModalLogin = defineAsyncComponent(/* webpackChunkName: "mpModalLogin" */() => import('@/components/global/MpModalLogin.vue'))
const MpSpeedDial = defineAsyncComponent(/* webpackChunkName: "mpSpeedDial" */() => import('@/components/global/MpSpeedDial.vue'))

const products = useProductsStore()
const menuStore = useMenuStore()

const isOpen = ref(false)

const manageValueModal = (value) => {
  isOpen.value = value
}

onMounted(async () => {
  await products.initProducts()
  await menuStore.getMenu()
})
</script>

<template>
  <MpMainMenu :menu="menuStore.menu" />
  <div class="dark:bg-dark-mp min-h-screen-60 pb-10">
    <RouterView />
  </div>
  <MpFooter
    :menu="menuStore.menu"
    @openModal="manageValueModal"
  />
  <MpModalLogin
    :visible="isOpen"
    @manageModal="manageValueModal"
  />
  <MpSpeedDial />
</template>

<style scoped>
</style>
