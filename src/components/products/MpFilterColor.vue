<script setup>
import { defineAsyncComponent } from 'vue'

const MpColor = defineAsyncComponent(/* webpackChunkName: "mpColor" */() => import('@/components/UI/MpColor.vue'))

const emit = defineEmits({ filterByColor: null });
const props = defineProps({
  totalColor: {
    required: true,
  }
});

const filterColor = (color) => {
  emit('filterByColor', color);
}
</script>

<template>
  <div>
    <p class="mb-2 mr-3 text-lg font-semibold text-[#1D1D1B] dark:text-white/70">Filtrar por Colores:</p>
    <hr class="mb-3" />
    <div class="flex flex-row gap-1 flex-wrap">
      <div v-for="{ color, quantity } in totalColor" :key="color">
        <MpColor
          class="cursor-pointer"
          :color="color"
          @click-color="filterColor"
          :quantity="quantity"
          is-search
        />
      </div>
    </div>
  </div>
</template>

