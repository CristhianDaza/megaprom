<script setup>
import TvButton from "@todovue/tvbutton";
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { formatNumber } from '@/utils'

import { useToast } from 'primevue/usetoast'

const emit = defineEmits({ filterQuantity: null })

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  totalProducts: {
    type: Number,
    required: true
  }
})

const route = useRoute()
const toast = useToast()

const value = ref()
const maxQuantityNumber = ref()

const filterProduct = () => {
  if (value.value === null) {
    showToastSearch('warn', 'Campo vacío', 'Por favor ingrese un valor para filtrar.')
    return
  }
  emit('filterQuantity', value.value)
}

const showToastSearch = (severity, summary, detail) => {
  toast.add({ severity, summary, detail, life: 3000 })
}

watch(() => props.totalProducts, (newValue) => {
  maxQuantityNumber.value = newValue
})

watch(() => route.query.inventario, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    if (route.query.inventario) {
      value.value = Number(newValue)
    } else {
      value.value = null
    }
  }
}, { immediate: true })

onMounted(() => {
  maxQuantityNumber.value = props.totalProducts
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class="mr-3 text-lg font-semibold  text-[#1D1D1B] dark:text-white/70">Cantidad por color:</p>
    <hr class="mb-2" />
    <InputNumber
      id="quantity"
      v-model="value"
      aria-describedby="quantity-filter"
      type="number"
      autocomplete="off"
      :max="maxQuantityNumber"
      name="quantity"
      aria-label="Cantidad"
    />
    <tv-button
      full
      small
      info
      rounded
      @click="filterProduct"
    >Filtrar</tv-button>
    <small id="quantity-help" class="text-[#1D1D1B] dark:text-white/70">
      Hasta {{ formatNumber(maxQuantityNumber) }}
    </small>
  </div>
</template>
