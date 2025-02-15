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
  <div class="container mx-auto p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <template v-if="products.isLoading">
        <div v-for="loader in 52" :key="loader" class="w-full">
          <Skeleton class="h-[5rem] rounded-lg shadow-sm" />
        </div>
      </template>
      <router-link
        v-for="category in products.categories"
        :key="category"
        :to="{ name: 'search', query: { q: category } }"
        class="relative flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 p-5 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-md"
      >
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white tracking-wide">
            {{ category }}
          </h3>
        </div>
        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-b-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </router-link>
    </div>
  </div>

</template>

<style scoped>

</style>
