<script setup>
import { defineAsyncComponent } from 'vue'
import { useHead } from '@unhead/vue'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))

const breadcrumbItems = [
  {
    icon: 'pi pi-book',
    label: 'Catálogos'
  }
]

useHead({
  title: '📚 Catálogos | Megapromocionales',
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

</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <div class="flex justify-center mt-10 font-extrabold text-2xl">
    <h1>Catalogs</h1>
  </div>
</template>

<style scoped>

</style>
