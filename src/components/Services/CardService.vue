<script setup>
const props = defineProps({
  imgBg: {
    type: String,
    required: true
  },
  titleService: {
    type: String,
    required: true
  },
  descriptionService: {
    type: String,
  },
  colorGradient: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex group overflow-hidden">
    <div
      class="w-[600px] h-[280px] bg-cover bg-center bg-no-repeat bg-gray-400 bg-blend-multiply rounded-3xl text-white p-2 z-20"
      :style="{ backgroundImage: `url('${imgBg}')` }"
    >
      <div class="flex justify-center items-center w-full h-full">
        <h2 class="text-[3.2rem] font-extrabold text-center group-hover:translate-x-[5000px] transition-all duration-500">{{ titleService.toUpperCase() }}</h2>
      </div>
    </div>
    <div class="w-[20px] max-h-[280px] ml-[-20px] bg-white bg-opacity-80 rounded-br-3xl rounded-tr-3xl translate-x-[-20px] group-hover:translate-x-[0] group-hover:w-[680px] transition-all duration-500">
      <div class="w-full p-2 text-white group-hover:pl-10 bg-gradient-to-r rounded-tr-2xl transition-all duration-500" :class="colorGradient">
        <h2 class="text-[1.8rem] font-extrabold translate-x-[-5000px] group-hover:translate-x-[1px]  transition-all duration-500">{{ titleService.toUpperCase() }}</h2>
      </div>
      <div class="pt-8 pl-10 pr-5 max-h-[195px] overflow-y-auto">
        <p v-html="descriptionService"></p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
