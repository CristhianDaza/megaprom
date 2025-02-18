<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useHead } from '@unhead/vue'

import { useCatalogsStore} from '@/store/catalogs.js'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const MpTitle = defineAsyncComponent(/* webpackChunkName: "mpTitle" */() => import('@/components/UI/MpTitle.vue'))

const catalogsStore = useCatalogsStore()

const breadcrumbItems = [
  {
    icon: 'pi pi-book',
    label: 'Catálogos'
  }
]

useHead({
  title: 'Catálogos | Megapromocionales',
  meta: [
    { name: 'description', content: 'Explora los catálogos de Megapromocionales y descubre nuestra amplia gama de productos.' },
    { property: 'og:title', content: '📚 Catálogos | Megapromocionales' },
    { property: 'og:description', content: 'Explora los catálogos de Megapromocionales y descubre nuestra amplia gama de productos.' },
    { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logoWeb.webp?alt=media&token=72bc41b4-57ed-4b55-b92f-0df6c335e685' },
    { property: 'og:url', content: 'https://megapromocionales.com.co/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '📚 Catálogos | Megapromocionales' },
    { name: 'twitter:description', content: 'Explora los catálogos de Megapromocionales y descubre nuestra amplia gama de productos.' },
    { name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logoWeb.webp?alt=media&token=72bc41b4-57ed-4b55-b92f-0df6c335e685' }
  ]
});

onMounted(() => {
  catalogsStore.getCatalogs()
})
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    title="Catálogos"
    image="https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-04.jpg?alt=media&token=04ffc52a-da42-4597-884b-7f4f18ee09d4"
  />
  <div v-if="catalogsStore.isLoading" class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
    <div v-for="loader in 12" :key="loader">
      <Skeleton height="15rem" class="mb-2">{{loader}}</Skeleton>
    </div>
  </div>
  <div v-else class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
    <div v-for="catalog in catalogsStore.catalogs" :key="catalog.id" class="border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      <a :href="catalog.link" target="_blank">
        <img :src="catalog.image" alt="Producto" class="w-full h-[16rem] bg-cover">
      </a>
    </div>
  </div>
</template>
