<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { formatDate, formatNumber } from '@/utils'
import { formatColor } from '@/helpers'

const isAdmin = ref(false)

const props = defineProps({
  quantity: {
    type: Array,
    required: true
  }
})

onMounted(() => {
  const isAdminStorage = localStorage.getItem('isAdmin')
  if (isAdminStorage) {
    isAdmin.value = JSON.parse(isAdminStorage)
  }

  console.log('isAdmin', isAdmin.value)
})
</script>

<template>
  <div class="container mx-auto">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="flex flex-wrap items-center justify-between gap-2 m-2">
        <span class="text-xl text-surface-900 dark:text-surface-0 font-bold"></span>
        <Button v-if="isAdmin" icon="pi pi-refresh" rounded raised />
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
          <th scope="col" class="px-6 py-3">
            En tránsito
          </th>
          <th scope="col" class="px-6 py-3">
            Estado del tránsito
          </th>
          <th scope="col" class="px-6 py-3">
            Fecha estimada
          </th>
          <th scope="col" class="px-6 py-3">
            Última actualización
          </th>
          <th v-if="isAdmin" scope="col" class="px-6 py-3">
            Precio
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="item in quantity"
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
          <td class="px-6 py-4">
            {{ formatNumber(item.inTracking, true) }}
          </td>
          <td class="px-6 py-4">
            {{ item.statusTracking }}
          </td>
          <td class="px-6 py-4">
            {{ formatDate(item.dataTracking) }}
          </td>
          <td class="px-6 py-4">
            {{ formatDate(item.lastUpdateTracking) }}
          </td>
          <td v-if="isAdmin" class="px-6 py-4">
            $ {{ formatNumber(Math.ceil(item.price), true) }} + iva
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<style scoped>

</style>
