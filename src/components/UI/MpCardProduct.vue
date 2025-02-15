<script setup>
import { formatNumber, formatPrice } from '@/utils'
import { defineAsyncComponent } from 'vue'

const MpBadgeDiscount = defineAsyncComponent(/* webpackChunkName: "mpBadgeDiscount" */() => import('@/components/UI/MpBadgeDiscount.vue'))
const MpColor = defineAsyncComponent(/* webpackChunkName: "mpColor" */() => import('@/components/UI/MpColor.vue'))

import { useUserStore } from '@/store/user.js'

const userStore = useUserStore()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink
    :to="{ name: 'product', params: { id: product.id } }"
    class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 hover:-translate-y-2"
  >
    <div class="bg-white">
      <img class="w-full h-[250px] object-contain rounded-t-lg" :src="product.mainImage" :alt="product.name" />
    </div>
    <div class="px-5 mt-5 pb-5">
      <div class="mb-5">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ product.name }}</h5>
      </div>
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm text-gray-900 dark:text-white mr-5">{{ product.id }}</span>
        <span class="text-sm text-gray-900 dark:text-white"><span class="font-bold">Stock:</span> {{ formatNumber(product.totalProducts) }} </span>
      </div>
      <div class="flex gap-1 flex-wrap">
        <div v-for="{ color, quantity } in product.tableQuantity" :key="color">
          <MpColor :color="color" :quantity="quantity" />
        </div>
      </div>
      <template v-if="userStore.isLogged">
        <div class="flex items-center justify-between mt-5">
          <span class="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {{ formatPrice(product?.tableQuantity?.[0]?.price, false) }}
              <InlineMessage
                v-if="product?.tableQuantity?.[0]?.type === 'Unico' || product?.tableQuantity?.[0]?.type === 'Único'"
                severity="info"
              >Único</InlineMessage>
          </span>
        </div>
      </template>
      <template v-if="product?.discount">
        <MpBadgeDiscount :discount="product?.discount"/>
      </template>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>
