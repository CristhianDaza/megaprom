<script setup>
import { computed, ref } from 'vue'
import { formatDate, formatNumber, formatPrice } from '@/utils'
import { formatColor } from '@/helpers'

import { useUserStore } from '@/store/user.js'

const userStore = useUserStore()

const props = defineProps({
  quantity: {
    type: Array,
    required: true
  }
})

const priceLocalStorage = localStorage.getItem('includeIva')
const includeIva = ref(priceLocalStorage ? JSON.parse(priceLocalStorage) : false)

const toggleIva = () => {
  includeIva.value = !includeIva.value
  localStorage.setItem('includeIva', includeIva.value)
}

const hasInTracking = computed(() => {
  if (!props.quantity) return false
  return props.quantity.some(item => item.inTracking != null)
})

const hasStatusTracking = computed(() => {
  if (!props.quantity) return false
  return props.quantity.some(item => item.statusTracking != null)
})

const hasDataTracking = computed(() => {
  if (!props.quantity) return false
  return props.quantity.some(item => item.dataTracking != null)
})

const hasLastUpdateTracking = computed(() => {
  if (!props.quantity) return false
  return props.quantity.some(item => item.lastUpdateTracking != null)
})
</script>

<template>
  <div class="container mx-auto">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div v-if="userStore.isLogged" class="flex flex-wrap items-center justify-between gap-2 m-2">
<!--        <Button icon="pi pi-refresh" rounded raised />-->
        <span></span>
        <Button :label="`${includeIva ? '+ iva' : 'Con iva'}`" @click="toggleIva" raised />
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Color
          </th>
          <th scope="col" class="px-6 py-3">
            Nombre
          </th>
          <th scope="col" class="px-6 py-3">
            Cantidad
          </th>
          <th v-if="hasInTracking" scope="col" class="px-6 py-3">
            En tránsito
          </th>
          <th v-if="hasStatusTracking" scope="col" class="px-6 py-3">
            Estado del tránsito
          </th>
          <th v-if="hasDataTracking" scope="col" class="px-6 py-3">
            Fecha estimada
          </th>
          <th v-if="hasLastUpdateTracking" scope="col" class="px-6 py-3">
            Última actualización
          </th>
          <th v-if="userStore.isLogged" scope="col" class="px-6 py-3">
            Precio
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="item in props.quantity"
            :key="item.id"
        >
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <div
              :style="{ backgroundColor: formatColor(item.color) }"
              class="w-5 h-5 rounded-full border dark:border-gray-700 border-gray-200 shadow-sm"
            ></div>
          </th>
          <td class="px-6 py-4">
            {{ item.color }}
          </td>
          <td class="px-6 py-4">
            {{ formatNumber(item.quantity, true) }}
          </td>
          <td v-if="hasInTracking" class="px-6 py-4">
            {{ formatNumber(item.inTracking, true) }}
          </td>
          <td v-if="hasStatusTracking" class="px-6 py-4">
            {{ item.statusTracking }}
          </td>
          <td v-if="hasDataTracking" class="px-6 py-4">
            {{ formatDate(item.dataTracking) }}
          </td>
          <td v-if="hasLastUpdateTracking" class="px-6 py-4">
            {{ formatDate(item.lastUpdateTracking) }}
          </td>
          <td v-if="userStore.isLogged" class="px-6 py-4">
            {{ formatPrice(Math.ceil(item.price), includeIva) }}
          </td>
        </tr>
        <tr v-if="props?.quantity?.length === 0">
          <td colspan="8" class="px-6 py-4 text-center text-gray-500">
            Sin información.
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
