<script setup>
import { ref } from 'vue'

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const currentSlide = ref(0)

const slideTo = (index) => {
  currentSlide.value = index
}

</script>

<template>
  <Carousel id="gallery" :items-to-show="1.5" :wrap-around="true" v-model="currentSlide">
    <Slide v-for="slide in images" :key="slide">
      <div class="carousel__item">
        <img :src="slide" alt="">
      </div>
    </Slide>
    <template #addons>
      <navigation />
    </template>
  </Carousel>
  <Carousel
      id="thumbnails"
      :items-to-show="5"
      :wrap-around="true"
      v-model="currentSlide"
      ref="carousel"
  >
    <Slide v-for="(slide, i) in images" :key="i">
      <div class="carousel__item p-2" @click="slideTo(i)">
        <img :src="slide" alt="">
      </div>
    </Slide>
    <template #addons>
      <navigation />
    </template>
  </Carousel>
</template>

<style scoped>

</style>
