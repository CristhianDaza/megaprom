<script setup>
import { onMounted } from 'vue'
import MpMainMenu from '@/components/global/MpMainMenu.vue'
import { useProductsStore } from '@/store/products.js'

const products = useProductsStore()

onMounted(async () => {
  await products.initProducts()
})
</script>

<template>
  <MpMainMenu />
  <div class="dark:bg-dark-mp min-h-screen-60">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
