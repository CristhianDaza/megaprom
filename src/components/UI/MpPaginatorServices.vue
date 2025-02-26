<script setup>
import TvButton from "@todovue/tvbutton";
const emit = defineEmits(['next', 'prev'])
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  disabledButtonPrev: {
    type: Boolean,
    required: true
  },
  disabledButtonNext: {
    type: Boolean,
    required: true
  }
})

const nextPage = () => {
  emit('next')
}

const prevPage = () => {
  emit('prev')
}
</script>

<template>
  <tv-button
    type="icon"
    icon="arrow-left"
    info
    v-tooltip.bottom="`Página anterior`"
    @click="prevPage"
    :disabled="disabledButtonPrev"
  />
  <p>{{ page }}</p>
  <tv-button
    type="icon"
    icon="arrow-right"
    info
    v-tooltip.bottom="`Página siguiente`"
    @click="nextPage"
    :disabled="disabledButtonNext"
  />
</template>
