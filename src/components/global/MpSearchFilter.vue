<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/store/products.js'

const inputSearch = ref('')

const router = useRouter()
const route = useRoute()
const products = useProductsStore()

const searchProduct = () => {
  router.push({
    name: 'search',
    query: { q: inputSearch.value }
  })

  reset()
}

const searchToView = () => {
  products.searchProductsInput(inputSearch.value)
}

const reset = () => {
  inputSearch.value = ''
  products.resetProductsInput()
}

watch(() => route.path, async () => {
  reset()
})

</script>

<template>
  <div class="flex align-items-center gap-2">
    <IconField iconPosition="left">
      <InputIcon>
        <i class="pi pi-search" />
      </InputIcon>
      <InputText
          v-model="inputSearch"
          placeholder="Buscar..."
          v-on:keyup.enter="searchProduct"
          id="searchInput"
          @input="searchToView"
          autocomplete="off"
      />
    </IconField>
    <ul
        v-if="products.productsInput.length > 0 && inputSearch !== ''"
        class="w-[14.8rem] md:w-[13.2rem] absolute text-sm mt-9 md:mt-8 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <li v-for="(item, index) in products.productsInput" :key="index"
          :class="[
          'block w-full px-2 py-1 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white',
          index === products.productsInput.length - 1 ? 'rounded-b-lg' : 'border-b border-gray-200'
          ]">
        <RouterLink :to="{ name: 'product', params: { id: item.id } }">
          <div class="flex justify-between items-center">
            {{ item.name }}
            <img :src="item.mainImage" :alt="item.name" class="size-7">
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
