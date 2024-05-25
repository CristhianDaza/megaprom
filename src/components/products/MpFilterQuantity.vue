<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { formatNumber } from '@/utils'

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

const value = ref()
const maxQuantityNumber = ref()

const filterProduct = () => {
  emit('filterQuantity', value.value)
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
    <label for="quantity">Cantidad por color:</label>
    <InputNumber
      id="quantity"
      v-model="value"
      aria-describedby="quantity-filter"
      type="number"
      autocomplete="off"
      :max="maxQuantityNumber"
    />
    <Button
      label="Filtrar"
      :disabled="value > maxQuantityNumber || !value"
      @click="filterProduct"
    />
    <small id="quantity-help">
      Hasta {{ formatNumber(maxQuantityNumber) }}
    </small>
  </div>
</template>

<style scoped>

</style>
