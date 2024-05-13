<script setup>
import { onMounted } from 'vue'

import MpBreadcrumb from '@/components/UI/MpBreadcrumb.vue'
import MpTitle from '@/components/UI/MpTitle.vue'

import { useRoute } from 'vue-router'

import { useProductsStore } from '@/store/products.js'
import MpCardProduct from '@/components/UI/MpCardProduct.vue'

const { query: { category } } = useRoute()

const products = useProductsStore()

const breadcrumbItems = [
  {
    icon: 'pi pi-search',
    label: 'Busqueda'
  }
]

onMounted(async () => {
  await products.filterProductsByCategory(category)
})
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    :title="category"
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
