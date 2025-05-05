<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getRelativeTime } from '@/helpers/index.js'

const props = defineProps({
  dateString: {
    type: [String, Number, null],
    required: true,
    default: null
  },
  isTableQuantity: {
    type: Boolean,
    default: false
  },
  intervalMs: {
    type: Number,
    default: 60000 // actualiza cada 60 segundos
  }
})

const timeInfo = ref({
  text: '-',
  tooltip: 'Fecha no disponible'
})

let intervalId = null

const updateTime = () => {
  if (props.dateString == null) {
    timeInfo.value = { text: '-', tooltip: 'Fecha no disponible' }
    return
  }

  const result = getRelativeTime(props.dateString, props.isTableQuantity)

  if (typeof result === 'object' && result !== null && 'text' in result && 'tooltip' in result) {
    timeInfo.value = result
  } else {
    console.warn('getRelativeTime no devolvió el objeto esperado para:', props.dateString)
    const fallbackText = props.isTableQuantity ? '-' : 'Error fecha'
    timeInfo.value = { text: fallbackText, tooltip: 'No se pudo procesar la fecha' }
  }
}

onMounted(() => {
  updateTime()
  intervalId = setInterval(updateTime, props.intervalMs)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
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
