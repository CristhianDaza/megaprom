<script setup>
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import {defineAsyncComponent} from "vue";

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const route = useRoute()

const title = `${route.params.serviceId.charAt(0).toUpperCase()}${route.params.serviceId.slice(1)}`

const breadcrumbItems = [
  {
    icon: 'pi pi-book',
    label: 'Servicios',
    name: 'services'
  },
  {
    icon: 'pi pi-book',
    label: title
  }
]

useHead({
  title: `${title} | Megapromocionales`,
  meta: [
    { name: 'description', content: `Conoce los servicios que ofrecemos en Megapromocionales para ${route.params.serviceId}.` },
    { property: 'og:title', content: `${title} | Megapromocionales` },
    { property: 'og:description', content: `Conoce los servicios que ofrecemos en Megapromocionales para ${route.params.serviceId}.` },
    { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-06.jpg?alt=media&token=9215aac9-b073-4482-ae77-b1d17a3f662a' },
    { property: 'og:url', content: 'https://megapromocionales.com.co/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${title} | Megapromocionales` },
    { name: 'twitter:description', content: `Conoce los servicios que ofrecemos en Megapromocionales para ${route.params.serviceId}.` },
    { name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-06.jpg?alt=media&token=9215aac9-b073-4482-ae77-b1d17a3f662a' }
  ]
});
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <div>
    <h1>Service {{ route.params.serviceId }}</h1>
  </div>
</template>

<style scoped>

</style>
