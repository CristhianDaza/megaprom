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
  <div class="flex sm:gap-2 md:gap-4 sm:mt-2 md:mt-4 container mx-auto">
    <template
      v-for="{ id, src, alt } in images"
      :key="id"
    >
      <Image
        :src="src"
        :alt="alt"
        width="1250"
      />
    </template>
  </div>
</template>

<style scoped>

</style>
