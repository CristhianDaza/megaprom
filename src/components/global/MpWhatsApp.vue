<script setup>
import { useWhatsApp } from '@/composables/useWhatsApp.js'

const { seeWp, showTooltip } = useWhatsApp()
</script>

<template>
  <div class="relative">
    <button
      @click="seeWp"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      class="fixed bottom-4 left-4 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#128C7E]"
    >
      <i class="text-3xl pi pi-whatsapp"></i>
      <span
        v-if="showTooltip"
        class="absolute bottom-[3px] w-[10rem] left-[-15px] transform translate-x-1/2 px-3 py-2 bg-black text-white text-sm rounded-lg"
      >
        ¡Chatea con nosotros en WhatsApp!
      </span>
    </button>
  </div>
</template>
