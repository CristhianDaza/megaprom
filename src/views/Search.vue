<script setup>
import {onMounted, watch, defineAsyncComponent} from 'vue'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const MpTitle = defineAsyncComponent(/* webpackChunkName: "mpTitle" */() => import('@/components/UI/MpTitle.vue'))

import { useRoute } from 'vue-router'

import { useProductsStore } from '@/store/products.js'
import MpCardProduct from '@/components/UI/MpCardProduct.vue'

const route = useRoute()

const products = useProductsStore()

const input = document.querySelector('#searchInput')

const breadcrumbItems = [
  {
    icon: 'pi pi-search',
    label: 'Busqueda'
  }
]

watch(() => route.query.q, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    input.blur()
    await products.filterProductsByCategory(route.query.q)
  }
})

onMounted(async () => {
  await products.filterProductsByCategory(route.query.q)
})
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    :title="route.query.q ? route.query.q : 'Productos'"
    image="https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-06.jpg?alt=media&token=9215aac9-b073-4482-ae77-b1d17a3f662a"
  />
  <div v-if="products.isLoading" class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
    <template v-for="loader in 12">
      <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
        <Skeleton height="20rem" class="mb-2">{{loader}}</Skeleton>
        <Skeleton height="2rem" class="mb-2"></Skeleton>
        <Skeleton height="2rem" class="mb-2"></Skeleton>
      </div>
    </template>
  </div>
  <div
    v-else
    class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10"
  >
    <template
      v-for="product in products.filteredProducts"
      :key="product.id"
    >
      <MpCardProduct :product="product" />
    </template>
  </div>
</template>

<style scoped>

</style>
