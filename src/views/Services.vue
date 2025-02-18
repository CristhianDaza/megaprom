<script setup>
import { defineAsyncComponent } from "vue";
import { useHead } from '@unhead/vue'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const MpServicesImg = defineAsyncComponent(/* webpackChunkName: "mpServicesImg" */() => import('@/components/home/MpServicesImg.vue'))
const MpTitle = defineAsyncComponent(/* webpackChunkName: "mpTitle" */() => import('@/components/UI/MpTitle.vue'))

const breadcrumbItems = [
  {
    icon: 'pi pi-book',
    label: 'Servicios'
  }
]

useHead({
  title: 'Servicios | Megapromocionales',
  meta: [
    { name: 'description', content: 'Conoce los servicios que ofrecemos en Megapromocionales.' },
    { property: 'og:title', content: '🛠 Servicios | Megapromocionales' },
    { property: 'og:description', content: 'Conoce los servicios que ofrecemos en Megapromocionales.' },
    { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-06.jpg?alt=media&token=9215aac9-b073-4482-ae77-b1d17a3f662a' },
    { property: 'og:url', content: 'https://megapromocionales.com.co/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '🛠 Servicios | Megapromocionales' },
    { name: 'twitter:description', content: 'Conoce los servicios que ofrecemos en Megapromocionales.' },
    { name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-06.jpg?alt=media&token=9215aac9-b073-4482-ae77-b1d17a3f662a' }
  ]
});
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    title="Servicios"
    image="https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-02.jpg?alt=media&token=43bc7305-f41f-45e2-be52-e3a065bf2cef"
  />
  <div class="container mx-auto py-10">
    <MpServicesImg />
  </div>
</template>