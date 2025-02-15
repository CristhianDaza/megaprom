<script setup>
import { ref, watch, onBeforeMount, defineAsyncComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const MpProductDescription = defineAsyncComponent(/* webpackChunkName: "mpProductDescription" */() => import('@/components/product/MpProductDescription.vue'))
const MpProductImages = defineAsyncComponent(/* webpackChunkName: "mpProductImages" */() => import('@/components/product/MpProductImages.vue'))
const MpProductSimilar = defineAsyncComponent(/* webpackChunkName: "mpProductSimilar" */() => import('@/components/product/MpProductSimilar.vue'))
const MpProductTableQuantity = defineAsyncComponent(/* webpackChunkName: "mpProductTableQuantity" */() => import('@/components/product/MpProductTableQuantity.vue'))
const MpTitle = defineAsyncComponent(/* webpackChunkName: "mpTitle" */() => import('@/components/UI/MpTitle.vue'))

import { useProductsStore } from '@/store/products.js'

const productsStore = useProductsStore()
const route = useRoute()
const idPage = computed(() => route.params.id);

const breadcrumbItems = [
  {
    icon: 'pi pi-shopping-cart',
    label: 'Productos',
    name: 'products'
  },
  {
    icon: 'pi pi-tag',
    label: `${route.params.id}`
  }
]

const product = ref(null)

watch(async () => route.params.id, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await productsStore.getProductById(route.params.id)
  }
})

watch(() => productsStore.product, (newValue) => {
  product.value = newValue
  updateMeta();
})

watch(() => productsStore.isUpdatedTable, (newValue) => {
  if (!newValue) {
    productsStore.getProductById(route.params.id)
  }
})

onBeforeMount(async () => {
  await productsStore.getProductById(route.params.id)
})

const updateMeta = () => {
  useHead({
    title: `${route.params.id} ${productsStore.product?.name ? `- ${productsStore.product?.name}` : ''} | Megapromocionales`,
    meta: [
      { name: 'description', content: productsStore.product?.description },
      { property: 'og:title', content: `${productsStore.product?.name} | Megapromocionales` },
      { property: 'og:description', content: productsStore.product?.description },
      { property: 'og:image', content: productsStore.product?.mainImage },
      { property: 'og:url', content: `https://megapromocionales.com.co/productos/${route.params.id}` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${productsStore.product?.name} | Megapromocionales` },
      { name: 'twitter:description', content: productsStore.product?.description },
      { name: 'twitter:image', content: productsStore.product?.mainImage }
    ]
  });
}
watch(idPage, updateMeta);
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    :title="productsStore.product?.name"
    :image="productsStore.product?.mainImage"
  />
  <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 md:pt-5 md:mb-3 gap-3">
    <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:py-5 md:px-10 p-1">
      <template v-if="productsStore.isLoading">
        <Skeleton height="100%"/>
      </template>
      <MpProductImages
        v-else
        :images="productsStore.product?.images"
        :id="route.params.id"
        :api="productsStore.product?.api"
      />
    </div>
    <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <template v-if="productsStore.isLoading">
        <Skeleton height="25rem"/>
      </template>
      <MpProductDescription
        v-else
        :product="productsStore.product"
      />
    </div>
  </div>
  <div class="container mx-auto grid grid-cols-1 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 my-3">
    <template v-if="productsStore.isLoading || productsStore.isUpdatedTable">
      <Skeleton height="18rem"/>
    </template>
    <MpProductTableQuantity
      v-else
      :quantity="productsStore.product?.tableQuantity"
      :product="productsStore.product"
    />
  </div>
  <template v-if="productsStore.isLoading">
    <Skeleton height="28rem" class="px-9"/>
  </template>
  <MpProductSimilar
    v-else
    :similar="product"
  />
</template>

<style scoped>

</style>
