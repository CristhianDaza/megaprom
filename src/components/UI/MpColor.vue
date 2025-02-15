<script setup>
import { computed } from 'vue'
import { formatColor } from '@/helpers'
import { formatNumber } from '@/utils'

const emit = defineEmits({ clickColor: null })

const props = defineProps({
  color: {
    type: String,
    required: true
  },
  quantity: {
    type: Number
  },
  isSearch: {
    type: Boolean,
    default: false
  }
})

const message = computed(() =>{
  if (props.isSearch) {
    return `Total Productos: ${formatNumber(props.quantity)} (${props.color})`
  }

  return `${props.quantity ? `Cantidad: ${formatNumber(props.quantity)} (${props.color})` : ''}`
})
</script>

<template>
  <div
    :style="{ backgroundColor: formatColor(color) }"
    class="w-5 h-5 border dark:border-gray-700 border-gray-200 shadow-sm relative"
    v-tooltip.top="message"
    @click="$emit('clickColor', color)"
  >
  </div>
</template>

<style scoped>

</style>
