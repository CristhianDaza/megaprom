<script setup>
import { defineProps, onMounted, watch, ref } from 'vue'
import { useProductsStore } from '@/store/products.js'
import { useRoute } from 'vue-router'

import MpCardProduct from '@/components/UI/MpCardProduct.vue'

const products = useProductsStore()
const route = useRoute()

const props = defineProps({
  similar: {
    type: Object,
  }
})

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);

watch(() => route.params, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await products.getSimilarProduct(props.similar?.name ?? '')
  }
})

onMounted(async () => {
  await products.getSimilarProduct(props.similar?.name ?? '')
})
</script>

<template>
  <div v-if="products.similarProducts.length > 3 || !similar" class="container mx-auto grid grid-cols-1 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
    <CarouselP
      :value="products.similarProducts"
      :num-visible="products.similarProducts.length === 3 ? 3 : 5"
      :num-scroll="3"
      circular
      :autoplayInterval="4000"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps">
        <MpCardProduct class="m-2" :product="slotProps.data" />
      </template>
    </CarouselP>
  </div>
</template>

<style scoped>

</style>
