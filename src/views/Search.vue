<script setup>
import {onMounted, watch} from 'vue'

import MpBreadcrumb from '@/components/UI/MpBreadcrumb.vue'
import MpTitle from '@/components/UI/MpTitle.vue'

import { useRoute } from 'vue-router'

import { useProductsStore } from '@/store/products.js'
import MpCardProduct from '@/components/UI/MpCardProduct.vue'

const route = useRoute()

const products = useProductsStore()

const breadcrumbItems = [
  {
    icon: 'pi pi-search',
    label: 'Busqueda'
  }
]

watch(() => route.query.q, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await products.filterProductsByCategory(route.query.q)
  }
})

onMounted(async () => {
  await products.filterProductsByCategory(route.query.q)
})
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    :title="route.query.q"
    image="https://firebasestorage.googleapis.com/v0/b/megaprom-dev.appspot.com/o/web1-06.jpg?alt=media&token=1522ffd6-f6d8-4151-b287-1b905fa58a2c"
  />

  <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
    <template
      v-for="product in products.filteredProducts"
      :key="product.id"
    >
      <MpCardProduct :product="product" />
    </template>
  </div>
</template>

<style scoped>

</style>
