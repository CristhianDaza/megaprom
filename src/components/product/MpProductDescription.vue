<script setup>
import { defineProps } from 'vue'
import { formatNumber } from '@/utils'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <h2 class="mb-4 text-3xl font-extrabold text-gray-800 dark:text-white md:text-5xl lg:text-6xl md:mt-5"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{{ product?.id }}</span> - {{ product?.name }}</h2>
  <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
    {{ product?.description }}
  </p>
  <p>
    <span class="text-lg font-bold text-gray-900 dark:text-white">Material: </span>
    <span class="text-lg font-normal text-gray-500 dark:text-gray-400">{{ product?.material }}</span>
  </p>
  <p>
    <span class="text-lg font-bold text-gray-900 dark:text-white">Medidas: </span>
    <span class="text-lg font-normal text-gray-500 dark:text-gray-400">{{ product?.size }}</span>
  </p>
  <p>
    <span class="text-lg font-bold text-gray-900 dark:text-white">Técnica de marca: </span>
    <span class="text-lg font-normal text-gray-500 dark:text-gray-400">{{ product?.printing }}</span>
  </p>
  <p>
    <span class="text-lg font-bold text-gray-900 dark:text-white">Área de impresión: </span>
    <span class="text-lg font-normal text-gray-500 dark:text-gray-400">{{ product?.areaPrinting }}</span>
  </p>
  <p>
    <span class="text-lg font-bold text-gray-900 dark:text-white">Empaque: </span>
    <span class="text-lg font-normal text-gray-500 dark:text-gray-400">{{ product?.packaging }}</span>
  </p>
  <p>
    <span class="text-lg font-bold text-gray-900 dark:text-white">Stock: </span>
    <span class="text-lg font-normal text-gray-500 dark:text-gray-400">{{ formatNumber(product?.totalProducts) }}</span>
  </p>
  <p v-if="product?.category">
    <span class="text-lg font-bold text-gray-900 dark:text-white">Categoria: </span>
    <span class="text-lg font-normal text-gray-500 dark:text-gray-400">
      <RouterLink :to="{ name: 'search', query: { q: product?.category } }" class="text-emerald-600 dark:text-sky-400">{{ product?.category }}</RouterLink>
    </span>
  </p>
</template>

<style scoped>

</style>
