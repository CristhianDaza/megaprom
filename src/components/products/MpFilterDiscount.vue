<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const emit = defineEmits({ filterDiscount: null });

const props = defineProps({
  totalProducts: {
    type: Number,
    required: true
  }
});

const route = useRoute();

const checked = ref(false);

const filterDiscount = () => {
  emit('filterDiscount', checked.value);
}

watch(() => route.query.descuento, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    checked.value = newValue === 'true';
  }
}, { immediate: true })
</script>

<template>
  <div class="flex flex-col gap-2">
    <label
      for="toggle"
    >Ver solo con descuentos:</label>
    <ToggleButton
      id="toggle"
      v-model="checked"
      onIcon="pi pi-check"
      offIcon="pi pi-times"
      invalid
      class="w-full md:w-[5rem]"
      aria-label="Confirmation"
      onLabel="Si"
      offLabel="No"
      :disabled="totalProducts === 0"
      @change="filterDiscount"
    />
    <small id="toggle-help">
      Productos con descuento: {{ totalProducts }}.
    </small>
  </div>
</template>

<style scoped>

</style>
