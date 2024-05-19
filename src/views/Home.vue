<script setup>
import { defineAsyncComponent } from 'vue'

const MpCarousel = defineAsyncComponent(/* webpackChunkName: "mpCarousel" */() => import('@/components/home/MpCarousel.vue'))
const MpServicesImg = defineAsyncComponent(/* webpackChunkName: "mpServicesImg" */() => import('@/components/home/MpServicesImg.vue'))
const MpHero = defineAsyncComponent(/* webpackChunkName: "mpHero" */() => import('@/components/home/MpHero.vue'))

const images = [
  {
    id: 1,
    src: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-08.jpg?alt=media&token=8ba599c0-a6ca-4f5b-b5f8-088c2738e715',
    alt: 'Marcación promocionales',
  },
  {
    id: 2,
    src: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-02.jpg?alt=media&token=43bc7305-f41f-45e2-be52-e3a065bf2cef',
    alt: 'Offset impresión 5 colores',
  },
]
</script>

<template>
  <MpHero />
  <MpCarousel />
  <MpServicesImg :images="images" />
</template>

<style scoped>

</style>
