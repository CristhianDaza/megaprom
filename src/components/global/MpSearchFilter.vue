<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/store/products.js'
import { useToast } from 'primevue/usetoast'

const inputSearch = ref('')
const isMac = ref(false)

const router = useRouter()
const route = useRoute()
const products = useProductsStore()
const toast = useToast()

const searchProduct = () => {
  if (inputSearch.value.trim() === '') {
    showToastSearch('warn', 'Campo vacío', 'Por favor ingrese un valor para buscar.')
    return
  }
  if (inputSearch.value.trim().length < 3) {
    showToastSearch('warn', 'Valor muy corto', 'Por favor ingrese al menos 3 caracteres para buscar.')
    return
  }
  router.push({
    name: 'search',
    query: { q: inputSearch.value }
  })

  reset()
  document.getElementById('searchInput').blur()
}

const searchToView = () => {
  products.searchProductsInput(inputSearch.value)
}

const reset = () => {
  inputSearch.value = ''
  products.resetProductsInput()
}

const showToastSearch = (severity, summary, detail) => {
  toast.add({ severity, summary, detail, life: 3000 })
}

watch(() => route.path, async () => {
  reset()
})

onMounted(() => {
  isMac.value = navigator?.userAgentData ? navigator.userAgentData.platform.includes('Mac') : /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

  const handleKeydown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault()
      document.getElementById('searchInput').focus()
    }
  }
  window.addEventListener('keydown', handleKeydown)
  return () => {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <div class="relative flex align-items-center gap-2">
    <IconField iconPosition="left" class="md:w-[20rem]">
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
        class="pl-9"
      />
      <span v-if="inputSearch === ''" class="hidden md:inline-flex placeholder-key">
        {{ isMac ? '⌘K' : 'Ctrl K' }}
      </span>
    </IconField>
    <ul
      v-if="products.productsInput.length > 0 && inputSearch !== ''"
      class="w-[14.8rem] md:w-[20rem] absolute text-sm mt-9 md:mt-8 -right-1 md:left-0 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white max-h-[14rem] overflow-y-auto z-10 shadow-lg"
    >
      <li
        v-for="(item, index) in products.productsInput"
        :key="index"
        :class="[
        'block w-full px-2 py-1 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white',
        index === products.productsInput.length - 1 ? 'rounded-b-lg' : 'border-b border-gray-200'
      ]">
        <RouterLink :to="{ name: 'product', params: { id: item.id } }">
          <div class="flex justify-between items-center">
            {{ item.id }} - {{ item.name }}
            <img :src="item.mainImage" :alt="item.name" class="size-7">
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.placeholder-key {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
</style>
