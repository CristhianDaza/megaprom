<script setup>
import { defineAsyncComponent } from 'vue'

const MpCarousel = defineAsyncComponent(/* webpackChunkName: "mpCarousel" */() => import('@/components/home/MpCarousel.vue'))
</script>

<template>
  <div class="relative mb-[3rem]">
    <section class="relative bg-center bg-auto md:bg-cover bg-no-repeat bg-[url('https://firebasestorage.googleapis.com/v0/b/megaprom-dev.appspot.com/o/background.jpg?alt=media&token=7818911f-e4aa-4da7-9500-d56476838513')]">
      <div class="absolute inset-0 bg-gradient-to-b from-[#0E2050] to-[#000] opacity-80"></div>
      <div class="relative h-full pt-[5rem] min-h-[100vh] px-16 mx-auto max-w-screen-xl text-center flex justify-between items-start">
        <div class="flex items-center justify-between w-full">
          <img alt="Logo" src="https://megapromocionales.com.co/favicon.ico" />
          <div>
            <h1 class="text-5xl md:text-[4rem] font-bold text-white">¡TODO AQUÍ!</h1>
            <div class="font-bold text-xl md:text-[20px] tracking-wide">
              <span class="text-[#5BC5F2] mr-2">PROMOCIONALES</span>
              <span class="text-[#FFCC00] mr-2">OFFSET</span>
              <span class="text-[#E6007D]">DIGITAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="absolute bottom-[-2rem]">
      <MpCarousel />
    </div>
  </div>
</template>

<style scoped>

</style>
