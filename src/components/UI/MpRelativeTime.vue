<script setup>
import { computed } from 'vue'
import { getRelativeTime } from '@/helpers/index.js'

const props = defineProps({
  dateString: {
    type: [String, null, Number],
    required: true
  },
  isTableQuantity: {
    type: Boolean,
    default: false
  }
})

const timeInfo = computed(() => {
  const result = getRelativeTime(props.dateString, props.isTableQuantity);

  if (typeof result === 'object' && result !== null && 'text' in result && 'tooltip' in result) {
    return result;
  } else {
    console.warn('getRelativeTime no devolvió el objeto esperado para:', props.dateString);
    const fallbackText = props.isTableQuantity ? '-' : 'Error fecha';
    return { text: fallbackText, tooltip: 'No se pudo procesar la fecha' };
  }
})
</script>

<template>
  <span v-tooltip.top="timeInfo.tooltip">
    {{ timeInfo.text }}
  </span>
</template>

<style scoped>
span {
  cursor: help;
}
</style>
