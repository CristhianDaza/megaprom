<script setup>
import { onMounted, ref } from 'vue'
import MpMainMenu from '@/components/global/MpMainMenu.vue'
import MpFooter from '@/components/global/MpFooter.vue'
import MpModalLogin from '@/components/global/MpModalLogin.vue'
import { useProductsStore } from '@/store/products.js'
import { useMenuStore } from "@/store/menu.js";

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
</template>

<style scoped>
</style>
