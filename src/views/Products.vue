<script setup>
import { onMounted, defineAsyncComponent } from 'vue'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const MpTitle = defineAsyncComponent(/* webpackChunkName: "mpTitle" */() => import('@/components/UI/MpTitle.vue'))

import { useProductsStore } from '@/store/products.js'

const products = useProductsStore()

const breadcrumbItems = [
  {
    icon: 'pi pi-shopping-cart',
    label: 'Productos'
  }
]

onMounted(async () => {
  await products.getCategories()
})
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    title="Productos"
    image="https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-05.jpg?alt=media&token=87301a0d-ae85-49da-b8f3-c4c6be101f59"
  />
  <div class="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
    <template v-if="products.isLoading" v-for="loader in 52" >
      <Skeleton height="4.5rem">{{loader}}</Skeleton>
    </template>
    <template v-else>
      <RouterLink
        v-for="category in products.categories"
        :key="category"
        :to="{ name: 'search', query: { q: category } }"
        class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded shadow flex items-center space-x-4 cursor-pointer"
      >
        <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.05 4.05a7 7 0 019.9 0 7 7 0 010 9.9 7 7 0 01-9.9 0 7 7 0 010-9.9zM4 8l1.49 1.49L9 6.97l1.5 1.5 4-4-1.49-1.49L9 4.53 7.5 3.03 4 6.03z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ category }}
        </h3>
      </RouterLink>
    </template>
  </div>
</template>

<style scoped>

</style>
