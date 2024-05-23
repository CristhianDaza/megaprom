<script setup>
import { ref } from 'vue'

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})

const currentSlide = ref(0)

const slideTo = (index) => {
  currentSlide.value = index
}

const handleError = (e) => {
  e.target.src = 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/Default%20Image.webp?alt=media&token=33275052-af6f-47ab-8826-394691b96484'
}
</script>

<template>
  <Carousel id="gallery" :items-to-show="1.5" :wrap-around="true" v-model="currentSlide">
    <Slide v-for="slide in images" :key="slide">
      <div class="carousel__item">
        <Image alt="Image" preview>
          <template #indicatoricon>
            <i class="pi pi-eye" style="color: #fff"></i>
          </template>
          <template #image>
            <img :src="slide" :alt="`producto ${id}`" @error="handleError"/>
          </template>
          <template #preview="slotProps">
            <img
              :src="slide"
              :alt="`producto ${id}`"
              :style="{ ...slotProps.style, maxWidth: '750px' }"
              @click="slotProps.onClick"
              class="custom-preview-image"
              @error="handleError"
            />
          </template>
        </Image>
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
        <img :src="slide" :alt="`producto ${id}`" @error="handleError">
      </div>
    </Slide>
    <template #addons>
      <navigation />
    </template>
  </Carousel>
</template>

<style scoped>

</style>
