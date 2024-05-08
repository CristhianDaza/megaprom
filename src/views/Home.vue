<script setup>
import MpCarousel from '@/components/home/MpCarousel.vue'
import MpServicesImg from '@/components/home/MpServicesImg.vue'

const images = [
  {
    id: 1,
    src: 'https://firebasestorage.googleapis.com/v0/b/megaprom-dev.appspot.com/o/web1-08.jpg?alt=media&token=ca703b3f-2e2b-488d-9287-b439ec7feacf',
    alt: 'Marcación promocionales',
  },
  {
    id: 2,
    src: 'https://firebasestorage.googleapis.com/v0/b/megaprom-dev.appspot.com/o/web1-02.jpg?alt=media&token=2a64a16a-1254-437f-bbc7-1d43c88c74ed',
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
