<script setup>
import { onMounted, watch, ref, defineAsyncComponent } from 'vue'
import { useProductsStore } from '@/store/products.js'
import { useRoute } from 'vue-router'

const MpCardProduct = defineAsyncComponent(/* webpackChunkName: "mpCardProduct" */() => import('@/components/UI/MpCardProduct.vue'))
const products = useProductsStore()
const route = useRoute()

const props = defineProps({
  similar: {
    type: Object
  }
})

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 4,
    numScroll: 4
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 3
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 2
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
])

watch(() => route.params, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await products.getSimilarProduct(props.similar ?? '')
  }
})

onMounted(async () => {
  await products.getSimilarProduct(props.similar ?? '')
})
</script>

<template>
  <div v-if="products.similarProducts || products.similarProducts.length > 3 || similar" class="container mx-auto grid grid-cols-1 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
    <CarouselP
      :value="products.similarProducts"
      :num-visible="products.similarProducts.length === 3 ? 3 : 4"
      :num-scroll="4"
      circular
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps">
        <MpCardProduct class="m-2" :product="slotProps.data" />
      </template>
    </CarouselP>
  </div>
</template>
