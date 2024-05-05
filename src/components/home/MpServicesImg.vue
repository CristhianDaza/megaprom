<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="flex gap-5 mt-5">
    <template
      v-for="{ id, src, alt } in images"
      :key="id"
    >
      <Image
        :src="src"
        :alt="alt"
        width="100%"
        height="100%"
      />
    </template>
  </div>
</template>

<style scoped>

</style>
