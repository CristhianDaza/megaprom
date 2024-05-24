<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { formatNumber } from '@/utils'

const emit = defineEmits({ filterQuantity: null })

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
})

const route = useRoute()

const value = ref()
const maxQuantityNumber = ref()

const getMaxQuantity = (data) => {
  let maxQuantity = 0;

  data.forEach(item => {
    if (item.tableQuantity) {
      item.tableQuantity.forEach(quantityItem => {
        if (quantityItem.quantity > maxQuantity) {
          maxQuantity = quantityItem.quantity;
        }
      });
    }
  });

  return maxQuantity;
}

const filterProduct = () => {
  emit('filterQuantity', value.value)
}

watch(() => props.products, (newValue) => {
  maxQuantityNumber.value = getMaxQuantity(newValue)
  value.value = null
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
  maxQuantityNumber.value = getMaxQuantity(props.products)
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="quantity">Cantidad por color:</label>
    <InputText
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
