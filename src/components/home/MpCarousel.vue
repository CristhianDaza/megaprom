<script setup>
import { onMounted } from 'vue'
import { useCarouselStore } from '@/store/carousel.js'

const carouselStore = useCarouselStore()

onMounted(() => {
  carouselStore.getCarousel()
})
</script>

<template>
  <Galleria
    v-if="!carouselStore.isLoading"
    :value="carouselStore.carousel"
    :circular="true"
    :showItemNavigators="true"
    :showThumbnails="false"
    :autoPlay="true"
  >
    <template #item="{ item : { itemImageSrc, alt }}">
      <img :src="itemImageSrc" :alt="alt" style="width: 100%; display: block; max-height: 580px" />
    </template>
  </Galleria>
  <Skeleton v-else width="100%" height="580px"></Skeleton>
</template>

<style scoped>

</style>
