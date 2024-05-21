<script setup>
import { formatColor } from '@/helpers'
import { formatNumber } from '@/utils'

const props = defineProps({
  color: {
    type: String,
    required: true
  },
  quantity: {
    type: Number
  }
})
</script>

<template>
  <div
    :style="{ backgroundColor: formatColor(color) }"
    class="w-5 h-5 border dark:border-gray-700 border-gray-200 shadow-sm relative"
    v-tooltip.top="`${quantity ? `Cantidad: ${formatNumber(quantity)}` : ''}`"
  >
  </div>
</template>

<style scoped>

</style>
