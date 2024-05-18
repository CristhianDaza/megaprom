<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  discount: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div v-if="discount" class="flex items-center">
    <span class="bg-yellow-300 text-black py-1 px-2 rounded-md font-bold flex items-center mt-5">
      <i class="pi pi-tag mr-1"></i>{{ discount }}% OFF
    </span>
  </div>
</template>

<style scoped>

</style>
