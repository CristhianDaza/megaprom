<script setup>
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import {defineAsyncComponent} from "vue";

import { services } from '@/helpers'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const CardService = defineAsyncComponent(/* webpackChunkName: "cardService" */() => import('@/components/Services/CardService.vue'))
const route = useRoute()

const title = `${route.params.serviceId.charAt(0).toUpperCase()}${route.params.serviceId.slice(1)}`
const titleLower = title.toLowerCase()
const imageBg = 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Fpromocionales%2Fpencil.png?alt=media&token=9b9f40cd-9663-498d-afc2-c9d121c51da2'

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

const getColor = (title) => {
  switch (title.toLowerCase()) {
    case 'promocionales':
      return '[#5BC5F2]'
    case 'offset':
      return '[#FFCC00]'
    case 'digital':
      return '[#E6007D]'
    default:
      return 'black'
  }
}

const colorGradient = (title) => {
  switch (title.toLowerCase()) {
    case 'promocionales':
      return 'from-[#49C9F4] to-[#134B92]'
    case 'offset':
      return 'from-[#7A2D74] to-[#143E88]'
    case 'digital':
      return 'from-pink-500 to-pink-600'
    default:
      return 'from-gray-500 to-gray-600'
  }
}

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
  <div
    :style="{ backgroundImage: title.toLowerCase() === 'promocionales' ? `url('${imageBg}')` : '' }"
    class="bg-contain w-full h-full bg-right bg-no-repeat bg-blend-multiply"
  >
    <h1
      class="float-right text-[2.7rem] font-extrabold mt-5 mr-12"
      :class="`text-${getColor(title)}`"
    >
      {{ title.toUpperCase() }}
    </h1>
    <div class="mt-[8rem]">
      <div
        v-for="service in services[titleLower].page1"
        class="container mx-auto flex flex-row justify-center mb-3"
      >
        <CardService
          :imgBg="service.image"
          :titleService="service.title"
          :descriptionService="service.description"
          :colorGradient="colorGradient(title)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
