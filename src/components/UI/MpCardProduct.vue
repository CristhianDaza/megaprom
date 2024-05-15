<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
})

const formatNumber = (value) => {
  if (value == null) return '';
  if (value < 0) return '0';
  if (value > 10) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' unds.';
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
</script>

<template>
  <RouterLink
    :to="{ name: 'product', params: { id: product.id } }"
    class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 hover:-translate-y-2"
  >
    <img class="rounded-t-lg" :src="product.mainImage" :alt="product.name" />
    <div class="px-5 mt-5 pb-5">
      <div class="mb-5">
        <h5 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ product.name }}</h5>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-md text-gray-900 dark:text-white mr-5">{{ product.id }}</span>
        <span class="text-md text-gray-900 dark:text-white"><span class="font-bold ">Stock:</span> {{ formatNumber(product.totalProducts) }} </span>
      </div>
    </div>
  </RouterLink>

</template>

<style scoped>

</style>
