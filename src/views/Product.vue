<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import MpTitle from '@/components/UI/MpTitle.vue'
import MpBreadcrumb from '@/components/UI/MpBreadcrumb.vue'
import MpProductImages from '@/components/product/MpProductImages.vue'

import { useProductsStore } from '@/store/products.js'

const productsStore = useProductsStore()
const route = useRoute()

const breadcrumbItems = [
  {
    icon: 'pi pi-shopping-cart',
    label: 'Productos',
    name: 'products'
  },
  {
    icon: 'pi pi-tag',
    label: `${route.params.id}`
  }
]

watch(() => route.params.id, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await productsStore.getProductById(route.params.id)
  }
})

onMounted(async () => {
  await productsStore.getProductById(route.params.id)
})
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    :title="productsStore.product?.name"
    :image="productsStore.product?.mainImage"
  />
  <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 md:py-10 gap-3">
    <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <MpProductImages :images="productsStore.product?.images" />
    </div>
    <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <h1>Producto</h1>
    </div>
  </div>
</template>

<style scoped>

</style>
