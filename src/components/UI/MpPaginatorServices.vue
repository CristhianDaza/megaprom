<script setup>
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
  <Button
    icon="pi pi-angle-left"
    text
    rounded
    aria-label="Left"
    severity="info"
    @click="prevPage"
    :disabled="disabledButtonPrev"
  />
  <Button
    aria-label="Page"
    :label="`${page}`"
    severity="info"
  />
  <Button
    icon="pi pi-angle-right"
    text
    rounded
    aria-label="Right"
    severity="info"
    @click="nextPage"
    :disabled="disabledButtonNext"
  />
</template>
