<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { ref, defineAsyncComponent, computed, watch } from "vue";

import { services } from '@/helpers'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const CardService = defineAsyncComponent(/* webpackChunkName: "cardService" */() => import('@/components/Services/CardService.vue'))
const MpPaginatorServices = defineAsyncComponent(/* webpackChunkName: "mpPaginatorServices" */() => import('@/components/UI/MpPaginatorServices.vue'))

const route = useRoute()
const router = useRouter()

const currentPage = ref(Number(route.query.page || 1))
const titlePage = `${route.params.serviceId.charAt(0).toUpperCase()}${route.params.serviceId.slice(1)}`
const titleLower = titlePage.toLowerCase()
const imageBg = 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Fpromocionales%2Fbg-pormoopcionales.png?alt=media&token=b4236728-d78d-447d-8338-b2fee2b79c0b'

const breadcrumbItems = [
  {
    icon: 'pi pi-book',
    label: 'Servicios',
    name: 'services'
  },
  {
    icon: 'pi pi-book',
    label: titlePage
  }
]

const setPage = computed(() => {
  switch (Number(currentPage.value)) {
    case 1:
      return 'page1'
    case 2:
      return 'page2'
    default:
      return 'page1'
  }
})

const disabledButtonPrev = computed(() => currentPage.value === 1)

const disabledButtonNext = ({ pages }) => {
  return currentPage.value === pages
}

const prevPage = () => {
  currentPage.value--
  router.push({ query: { page: currentPage.value } })
}

const nextPage = () => {
  currentPage.value++
  router.push({ query: { page: currentPage.value } })
}

watch(() => route.query.page, () => {
  currentPage.value = Number(route.query.page || 1)
}, { immediate: true })

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
  title: `${titlePage} | Megapromocionales`,
  meta: [
    { name: 'description', content: `Conoce los servicios que ofrecemos en Megapromocionales para ${route.params.serviceId}.` },
    { property: 'og:title', content: `${titlePage} | Megapromocionales` },
    { property: 'og:description', content: `Conoce los servicios que ofrecemos en Megapromocionales para ${route.params.serviceId}.` },
    { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-06.jpg?alt=media&token=9215aac9-b073-4482-ae77-b1d17a3f662a' },
    { property: 'og:url', content: 'https://megapromocionales.com.co/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${titlePage} | Megapromocionales` },
    { name: 'twitter:description', content: `Conoce los servicios que ofrecemos en Megapromocionales para ${route.params.serviceId}.` },
    { name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-06.jpg?alt=media&token=9215aac9-b073-4482-ae77-b1d17a3f662a' }
  ]
});
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <div
    :style="{ backgroundImage: titlePage.toLowerCase() === 'promocionales' ? `url('${imageBg}')` : '' }"
    class="bg-contain w-full h-full bg-right bg-no-repeat bg-blend-multiply"
  >
    <img
      src="https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Fpromocionales%2Fheader.png?alt=media&token=a8ae8f4f-390b-4eab-81cb-2974093892f3"
      :alt="`header-${titlePage.toLowerCase()}`"
    >
    <h1
      class="float-right text-[2.7rem] font-extrabold mt-5 mr-12"
      :class="`text-${getColor(titlePage)}`"
    >
      {{ titlePage.toUpperCase() }}
    </h1>
    <div class="mt-[8rem]">
      <div
        v-for="{ image, title, description } in services[titleLower][setPage]"
        :key="title"
        class="container mx-auto flex flex-row justify-center mb-3"
      >
        <CardService
          :imgBg="image"
          :titleService="title"
          :descriptionService="description"
          :colorGradient="colorGradient(titlePage)"
        />
      </div>
      <div class="flex justify-center mt-10 gap-2">
        <MpPaginatorServices
          :page="currentPage"
          @next="nextPage"
          @prev="prevPage"
          :disabledButtonPrev="disabledButtonPrev"
          :disabledButtonNext="disabledButtonNext(services[titleLower])"
        />
      </div>
    </div>
  </div>
</template>
