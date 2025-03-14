<script setup>
import TvButton from "@todovue/tvbutton";
import { computed, ref, defineAsyncComponent } from 'vue'
import { formatNumber, formatPrice } from '@/utils'

const MpColor = defineAsyncComponent(/* webpackChunkName: "mpColor" */() => import('@/components/UI/MpColor.vue'))

import { useUserStore } from '@/store/user.js'
import { useProductsStore } from '@/store/products.js'

const userStore = useUserStore()
const products = useProductsStore()

const props = defineProps({
  quantity: {
    type: Array,
    required: true
  },
  product: {
    type: Object,
    required: true
  }
})

const priceLocalStorage = localStorage.getItem('includeIva')
const includeIva = ref(priceLocalStorage ? JSON.parse(priceLocalStorage) : false)

const toggleIva = () => {
  includeIva.value = !includeIva.value
  localStorage.setItem('includeIva', includeIva.value)
}

const updateInventory = () => {
  const { id, api } = props?.product
  products.updateProduct(api, id, props?.product)
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
      <div v-if="userStore.isLogged" class="flex flex-wrap items-center justify-between gap-2 m-2 pb-2">
        <tv-button
          type="icon"
          icon="update"
          info
          v-tooltip.bottom="`Actualizar inventario`"
          @click="updateInventory"
        />
        <span></span>
        <tv-button
          rounded
          info
          outlined
          @click="toggleIva"
        >
          {{ `Ver precios ${includeIva ? 'sin iva' : 'con iva'}` }}
        </tv-button>
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
            <MpColor :color="item.color" />
          </th>
          <td class="px-6 py-4">
            {{ item.colorName }}
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
            <relative-time :datetime="item.dataTracking" tense="future" formatStyle="long"></relative-time>
          </td>
          <td v-if="hasLastUpdateTracking" class="px-6 py-4">
            <relative-time :datetime="item.lastUpdateTracking" tense="auto"></relative-time>
          </td>
          <td v-if="userStore.isLogged" class="px-6 py-4 flex items-center gap-2">
            {{ formatPrice(Math.ceil(item.price), includeIva) }}
            <InlineMessage
              v-if="item?.type === 'Unico' || item?.type === 'Único'"
              severity="info"
            >Único</InlineMessage>
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
    <div class="float-right mt-5 text-gray-900 whitespace-nowrap dark:text-white">
      Inventario actualizado: <span class="font-bold"><relative-time :datetime="product?.lastUpdate ?? products.lastUpdateProducts"></relative-time></span>.
    </div>
  </div>
</template>
