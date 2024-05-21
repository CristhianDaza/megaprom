<script setup>
import { ref } from 'vue'

const seeWp = () => {
  const phoneNumbers = [
    '573159274144',
    '573159275144',
    '573205855531'
  ]
  const randomIndex = Math.floor(Math.random() * phoneNumbers.length)
  const number = phoneNumbers[randomIndex]
  const message = 'Hola, vengo de la página web y me gustaría saber más sobre sus productos.'
  const url = `https://api.whatsapp.com/send?phone=${number}&text=${message}`
  window.open ? window.open(url, '_blank') : window.location.assign(url)
}

const showTooltip = ref(false)
</script>

<template>
  <div class="relative">
    <button
      @click="seeWp"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      class="fixed bottom-8 left-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#128C7E]"
    >
      <i class="text-3xl pi pi-whatsapp"></i>
      <span
        v-if="showTooltip"
        class="absolute bottom-[10px] w-[10rem] left-[1px] transform translate-x-1/2 px-3 py-2 bg-black text-white text-sm rounded-lg"
      >
        ¡Chatea con nosotros en WhatsApp!
      </span>
    </button>
  </div>
</template>

<style scoped>

</style>
