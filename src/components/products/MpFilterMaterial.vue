<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const emit = defineEmits({ filterMaterial: null })

const props = defineProps({
  materials: {
    type: Array,
    required: true
  },
  totalProducts: {
    type: Number,
    required: true
  }
})

const route = useRoute();
const selectedMaterial = ref('')

const filterMaterial = () => {
  emit('filterMaterial', selectedMaterial.value)
}

const trimmedString = (str, maxLength = 30) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...'
  }
  return str
}

watch(() => route.query.material, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    selectedMaterial.value = newValue || ''
  }
}, { immediate: true })
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class="mr-3 text-lg font-semibold text-[#1D1D1B] dark:text-white/70">Filtrar por Material:</p>
    <hr class="mb-2"/>
    <select
      v-model="selectedMaterial"
      @change="filterMaterial"
      class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      :disabled="totalProducts === 0"
    >
      <option value="">Todos</option>
      <option v-for="material in materials" :key="material" :value="material">
        {{ trimmedString(material) }}
      </option>
    </select>
    <small class="text-[#1D1D1B] dark:text-white/70">
      Productos disponibles: {{ totalProducts }}.
    </small>
  </div>
</template>
