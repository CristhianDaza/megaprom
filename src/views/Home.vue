<script setup>
import { defineAsyncComponent } from 'vue'
import { useHead } from '@unhead/vue'

const MpServicesImg = defineAsyncComponent(/* webpackChunkName: "mpServicesImg" */() => import('@/components/home/MpServicesImg.vue'))
const MpHero = defineAsyncComponent(/* webpackChunkName: "mpHero" */() => import('@/components/home/MpHero.vue'))
const MpAbout = defineAsyncComponent(/* webpackChunkName: "mpAbout" */() => import('@/components/home/MpAbout.vue'))

useHead({
  title: 'Inicio | Megapromocionales',
  meta: [
    { name: 'description', content: 'Bienvenido a Megapromocionales, tu tienda de productos promocionales de calidad.' },
    { property: 'og:title', content: '🏠 Inicio | Megapromocionales' },
    { property: 'og:description', content: 'Somos una empresa dedicada a la venta de artículos promocionales, comprometidos con nuestro equipo de trabajo a tener la mejor calidad de servicio y productos.' },
    { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logoWeb.webp?alt=media&token=72bc41b4-57ed-4b55-b92f-0df6c335e685' },
    { property: 'og:url', content: 'https://megapromocionales.com.co/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '🏠 Inicio | Megapromocionales' },
    { name: 'twitter:description', content: 'Bienvenido a Megapromocionales, tu tienda de productos promocionales de calidad.' },
    { name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logoWeb.webp?alt=media&token=72bc41b4-57ed-4b55-b92f-0df6c335e685' }
  ]
});

</script>

<template>
  <MpHero />
  <MpAbout />
  <MpServicesImg />
</template>

<style scoped>

</style>
