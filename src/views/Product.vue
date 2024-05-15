<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import MpTitle from '@/components/UI/MpTitle.vue'
import MpBreadcrumb from '@/components/UI/MpBreadcrumb.vue'
import MpProductImages from '@/components/product/MpProductImages.vue'
import MpProductDescription from '@/components/product/MpProductDescription.vue'
import MpProductSimilar from '@/components/product/MpProductSimilar.vue'

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

const product = ref(null)

watch(async () => route.params.id, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await productsStore.getProductById(route.params.id)
  }
})

watch(() => productsStore.product, (newValue) => {
  product.value = newValue
})

onBeforeMount(async () => {
  await productsStore.getProductById(route.params.id)
})
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    :title="productsStore.product?.name"
    :image="productsStore.product?.mainImage"
  />
  <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 md:pt-5 md:mb-3 gap-3">
    <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <MpProductImages :images="productsStore.product?.images" />
    </div>
    <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <MpProductDescription :product="productsStore.product" />
    </div>
  </div>
  <MpProductSimilar :similar="product" />
</template>

<style scoped>

</style>
