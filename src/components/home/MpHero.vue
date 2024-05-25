<script setup>
import { useWhatsApp } from '@/composables/useWhatsApp.js'

const { seeWp } = useWhatsApp()
</script>

<template>
  <section class="bg-center bg-auto md:bg-cover bg-no-repeat bg-[url('https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/header.webp?alt=media&token=89fd25d1-5416-4922-a8f0-289e25a3b7c7')] bg-gray-800 bg-blend-multiply">
    <div class="py-12 px-4 mx-auto max-w-screen-xl text-center lg:py-28">
      <h1 class="mb-6 md:mb-10 text-4xl font-extrabold tracking-tight leading-none md:text-3xl lg:text-6xl text-white"> <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Megapromocionales</span></h1>
      <p class="mb-8 text-lg font-normal lg:text-2xl sm:px-16 lg:px-38 text-gray-400">Somos una empresa dedicada a la venta de artículos
        promocionales, comprometidos con nuestro equipo
        de trabajo a tener la mejor calidad de servicio y productos.</p>
      <div class="flex flex-row gap-5 justify-center">
        <RouterLink :to="{ name: 'products' }">
          <Button label="Ver productos" size="large" icon="pi pi-arrow-right" iconPos="right" severity="info" raised />
        </RouterLink>
<!--        <RouterLink :to="{ name: 'contact' }">-->
<!--          <Button label="Contacto" size="large" outlined severity="info" raised />-->
<!--        </RouterLink>-->
        <Button label="Contacto" size="large" outlined severity="info" raised @click="seeWp" />
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>
