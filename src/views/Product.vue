<script setup>
import { ref, watch, onBeforeMount, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const MpProductDescription = defineAsyncComponent(/* webpackChunkName: "mpProductDescription" */() => import('@/components/product/MpProductDescription.vue'))
const MpProductImages = defineAsyncComponent(/* webpackChunkName: "mpProductImages" */() => import('@/components/product/MpProductImages.vue'))
const MpProductSimilar = defineAsyncComponent(/* webpackChunkName: "mpProductSimilar" */() => import('@/components/product/MpProductSimilar.vue'))
const MpProductTableQuantity = defineAsyncComponent(/* webpackChunkName: "mpProductTableQuantity" */() => import('@/components/product/MpProductTableQuantity.vue'))
const MpTitle = defineAsyncComponent(/* webpackChunkName: "mpTitle" */() => import('@/components/UI/MpTitle.vue'))

import { useProductsStore } from '@/store/products.js'

const productsStore = useProductsStore()
const route = useRoute()

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
})

onBeforeMount(async () => {
  await productsStore.getProductById(route.params.id)
})
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    :title="productsStore.product?.name"
    :image="productsStore.product?.mainImage"
  />
  <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 md:pt-5 md:mb-3 gap-3">
    <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <template v-if="productsStore.isLoading">
        <Skeleton height="100%"/>
      </template>
      <MpProductImages
        v-else
        :images="productsStore.product?.images"
        :id="route.params.id"
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
    <template v-if="productsStore.isLoading">
      <Skeleton height="18rem"/>
    </template>
    <MpProductTableQuantity
      v-else
      :quantity="productsStore.product?.tableQuantity"
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
