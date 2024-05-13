<script setup>
import { onMounted } from 'vue'
import MpBreadcrumb from '@/components/UI/MpBreadcrumb.vue'
import MpTitle from '@/components/UI/MpTitle.vue'
import { useProductsStore } from '@/store/products.js'

const products = useProductsStore()

const breadcrumbItems = [
  {
    icon: 'pi pi-shopping-cart',
    label: 'Productos'
  }
]

onMounted(async () => {
  await products.getCategories()
})
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    title="Productos"
    image="https://firebasestorage.googleapis.com/v0/b/megaprom-dev.appspot.com/o/web1-05.jpg?alt=media&token=33737c86-ee5f-4931-9f15-9be8e028f006"
  />
  <div class="container mx-auto justify-center md:justify-between flex flex-wrap text-gray-900 dark:text-white gap-2 mt-10">
    <RouterLink
      :to="{ name: 'search', query: { category } }"
      v-for="category in products.categories"
    >
      <Chip :label="category" v-if="category" />
    </RouterLink>
  </div>
</template>

<style scoped>

</style>
