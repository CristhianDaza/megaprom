<script setup>
import MpCarousel from '@/components/home/MpCarousel.vue'
import MpServicesImg from '@/components/home/MpServicesImg.vue'

const images = [
  {
    id: 1,
    src: 'https://firebasestorage.googleapis.com/v0/b/megaprom-dev.appspot.com/o/web1-08.png?alt=media&token=13e32148-f192-4d59-b127-f506ff405e46',
    alt: 'Marcación promocionales',
  },
  {
    id: 2,
    src: 'https://firebasestorage.googleapis.com/v0/b/megaprom-dev.appspot.com/o/web1-02.png?alt=media&token=202f7c3a-6eb2-4e3d-99fe-094e6b00825c',
    alt: 'Offset impresión 5 colores',
  },
]
</script>

<template>
  <MpCarousel />
  <MpServicesImg :images="images" />
</template>

<style scoped>

</style>
