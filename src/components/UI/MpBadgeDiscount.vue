<script setup>
const props = defineProps({
  discount: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div v-if="discount" class="flex items-center">
    <span class="bg-yellow-300 text-black py-1 px-2 rounded-md font-bold flex items-center mt-5 text-sm">
      <i class="pi pi-tag mr-1"></i>{{ discount }}% OFF
    </span>
  </div>
</template>

<style scoped>

</style>
