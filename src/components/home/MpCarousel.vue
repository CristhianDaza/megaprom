<script setup>
import { onMounted } from 'vue'
import { useCarouselStore } from '@/store/carousel.js'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const carouselStore = useCarouselStore()

onMounted(() => {
  carouselStore.getCarousel()
})
</script>

<template>
  <carousel
    v-if="!carouselStore.isLoading"
    :items-to-show="1"
    wrapAround
    :autoplay="3000"
  >
    <slide v-for="slide in carouselStore.carousel" :key="slide">
      <img :src="slide.itemImageSrc" :alt="slide.title" style="width: 100%; display: block; max-height: 580px" />
    </slide>
    <template #addons>
      <navigation />
    </template>
  </carousel>
  <Skeleton v-else width="100%" height="469px"></Skeleton>
</template>

<style scoped>

</style>
