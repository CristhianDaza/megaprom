<script setup>
// import { useFeatureFlagsStore } from '@/store/featureFlags.js'

const props = defineProps({
  title: String,
  description: String,
  src: String,
  alt: String,
  color: String,
  viewFirstButton: Boolean,
  serviceId: String
})

// const featureFlag = useFeatureFlagsStore()
// const isActiveServices = featureFlag.getFlagValue('isActiveServices')
const isActiveServices = false
</script>

<template>
  <div
    class="bg-white p-5 rounded-3xl drop-shadow-xl flex flex-col justify-between dark:bg-gray-800"
    :class="`${isActiveServices ? '' : 'cursor-pointer hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105'}`"
  >
    <div>
      <h3 class="text-2xl font-bold pt-3 pb-5" :class="`${color}`">{{ title }}</h3>
      <p class="text-[#0E2050] text-[1rem] text-justify pb-5 dark:text-white">{{ description }}</p>
      <div class="flex justify-center items-center text-center pt-3">
        <img
          :src="src"
          :alt="alt"
          class="w-[18rem]"
          height="100%"
          width="100%"
        />
      </div>
    </div>
    <div class="flex gap-[4rem] mt-5 justify-center">
      <RouterLink
        :to="{ name: 'products' }"
        v-if="isActiveServices"
      >
        <Chip label="Productos" />
      </RouterLink>
      <RouterLink
        :to="{ name: 'service', params: { serviceId } }"
        v-if="isActiveServices"
      >
        <Chip label="Servicios" />
      </RouterLink>
    </div>
  </div>
</template>
