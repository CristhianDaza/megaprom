<script setup>
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
    <p>Cantidad por color:</p>
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
    <Button
      label="Filtrar"
      @click="filterProduct"
    />
    <small id="quantity-help">
      Hasta {{ formatNumber(maxQuantityNumber) }}
    </small>
  </div>
</template>

<style scoped>

</style>
