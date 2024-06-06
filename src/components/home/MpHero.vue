<script setup>
import { defineAsyncComponent } from 'vue'

const MpCarousel = defineAsyncComponent(/* webpackChunkName: "mpCarousel" */() => import('@/components/home/MpCarousel.vue'))
</script>

<template>
  <div class="relative mb-[1rem]">
    <section class="bg-cover relative bg-center bg-auto bg-no-repeat bg-[url('https://firebasestorage.googleapis.com/v0/b/megaprom-dev.appspot.com/o/background.jpg?alt=media&token=7818911f-e4aa-4da7-9500-d56476838513')]">
      <div class="absolute inset-0 bg-gradient-to-b from-[#0E2050] to-[#000] opacity-80"></div>
      <div class="relative py-[2rem] md:min-h-[60vh] lg:min-h-[90vh] xl:min-h-[100vh] lg:pt-[5rem] xl:pt-[4rem] px-2 md:px-16 xl:px-24 mx-auto max-w-screen-xl text-center flex justify-between items-start">
        <div class="flex items-center flex-col md:flex-row justify-between w-full md:pt-[2rem]">
          <img alt="Logo" class="size-32 lg:size-40" src="https://megapromocionales.com.co/favicon.ico" />
          <div>
            <h1 class="text-3xl md:text-[3.2rem] lg:text-[5rem] font-bold text-white">¡TODO AQUÍ!</h1>
            <div class="font-bold text-xl tracking-wide lg:mt-3">
              <span class="text-sm lg:text-xl text-[#5BC5F2] mr-2">PROMOCIONALES</span>
              <span class="text-sm lg:text-xl text-[#FFCC00] mr-2">OFFSET</span>
              <span class="text-sm lg:text-xl text-[#E6007D]">DIGITAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="relative md:absolute md:bottom-[-2rem] lg:bottom-[-3rem] xl:bottom-[-4rem]">
      <MpCarousel />
    </div>
  </div>
</template>

<style scoped>

</style>
