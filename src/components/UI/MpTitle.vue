<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  }
})

const mainTitle = computed(() => {
  if (!props.title) return 'Productos'
  return props.title
})
</script>

<template>
  <div
    class="bg-center bg-auto md:bg-cover bg-no-repeat bg-gray-700 md:bg-gray-800 bg-blend-multiply"
    :style="{ backgroundImage: `url('${image}')` }"
  >
    <h1
      class="flex justify-center font-extrabold text-3xl md:text-5xl text-white underline underline-offset-3 decoration-blue-600 py-20 px-5">
      {{ mainTitle }}
    </h1>
  </div>
</template>

