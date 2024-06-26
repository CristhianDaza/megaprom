<script setup>
import { onMounted, defineAsyncComponent } from 'vue'
import { useHead } from '@unhead/vue'

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

useHead({
  title: 'Productos | Megapromocionales',
  meta: [
    { name: 'description', content: 'Explora todos los productos disponibles en Megapromocionales.' },
    { property: 'og:title', content: '🛒 Productos | Megapromocionales' },
    { property: 'og:description', content: 'Explora todos los productos disponibles en Megapromocionales.' },
    { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logoWeb.webp?alt=media&token=72bc41b4-57ed-4b55-b92f-0df6c335e685' },
    { property: 'og:url', content: 'https://megapromocionales.com.co/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '🛒 Productos | Megapromocionales' },
    { name: 'twitter:description', content: 'Explora todos los productos disponibles en Megapromocionales.' },
    { name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logoWeb.webp?alt=media&token=72bc41b4-57ed-4b55-b92f-0df6c335e685' }
  ]
});

</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    title="Productos"
    image="https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-05.jpg?alt=media&token=87301a0d-ae85-49da-b8f3-c4c6be101f59"
  />
  <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    <template v-if="products.isLoading" v-for="loader in 52" >
      <Skeleton height="4.5rem">{{loader}}</Skeleton>
    </template>
    <RouterLink
      v-for="category in products.categories"
      :key="category"
      :to="{ name: 'search', query: { q: category } }"
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-4 cursor-pointer"
    >
      <div class="flex-shrink-0">
        <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h3.28a1 1 0 01.71.29l.33.32a1 1 0 01.29.7V6a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h10.28a1 1 0 01.71.29l.33.32a1 1 0 01.29.7V12a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h7.28a1 1 0 01.71.29l.33.32a1 1 0 01.29.7V18a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"></path>
        </svg>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ category }}
        </h3>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>

</style>
