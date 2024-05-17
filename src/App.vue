<script setup>
import { onMounted } from 'vue'
import MpMainMenu from '@/components/global/MpMainMenu.vue'
import MpFooter from '@/components/global/MpFooter.vue'
import { useProductsStore } from '@/store/products.js'
import { useMenuStore } from "@/store/menu.js";

const products = useProductsStore()
const menuStore = useMenuStore()

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
  <MpFooter :menu="menuStore.menu" />
</template>

<style scoped>
</style>
