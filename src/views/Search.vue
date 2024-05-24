<script setup>
import { onMounted, watch, defineAsyncComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/store/products.js'
import { formatNumber } from '@/utils'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const MpCardProduct = defineAsyncComponent(/* webpackChunkName: "mpCardProduct" */() => import('@/components/UI/MpCardProduct.vue'))
const MpChip = defineAsyncComponent(/* webpackChunkName: "mpChip" */() => import('@/components/UI/MpChip.vue'))
const MpFilterQuantity = defineAsyncComponent(/* webpackChunkName: "mpFilterQuantity" */() => import('@/components/products/MpFilterQuantity.vue'))
const MpTitle = defineAsyncComponent(/* webpackChunkName: "mpTitle" */() => import('@/components/UI/MpTitle.vue'))

const route = useRoute()
const router = useRouter()
const products = useProductsStore()

const isCollapsed = ref(true)
const productsToView = ref([])
const inventory = ref(Number(route.query.inventario || 0))
const chips = ref([])

const breadcrumbItems = [
  {
    icon: 'pi pi-search',
    label: 'Busqueda'
  }
]

const changeCollapsed = (toggle) => {
  isCollapsed.value = toggle.value
}

const filterQuantity = (value) => {
  productsToView.value = products.filteredProducts.filter(product =>
    product.tableQuantity.some(item => item.quantity >= value)
  )
  router.push({ query: { ...route.query, inventario: value } })
}

const updateChips = () => {
  const filters = []
  if (route.query.inventario) {
    filters.push({ name: `Inventario: ${formatNumber(route.query.inventario)}`, key: 'inventario' })
  }

  chips.value = filters
}

watch(() => route.query.q, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await products.filterProductsByCategory(route.query.q)
    isCollapsed.value = true
    productsToView.value = products.filteredProducts
  }
}, { immediate: true })

watch(() => route.query.inventario, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    if (route.query.inventario) {
      inventory.value = Number(newValue)
      filterQuantity(newValue)
    } else {
      productsToView.value = products.filteredProducts
      inventory.value = 0
    }
  }
}, { immediate: true })

watch(
  () => route.query,
  () => {
    updateChips()
  },
  { immediate: true }
)

onMounted(async () => {
  await products.filterProductsByCategory(route.query.q)
  productsToView.value = products.filteredProducts
  if (route.query.inventario) {
    inventory.value = Number(route.query.inventario)
    filterQuantity(route.query.inventario)
    isCollapsed.value = false
  }
  updateChips()
})
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    :title="route.query.q ? route.query.q : 'Productos'"
    image="https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-06.jpg?alt=media&token=9215aac9-b073-4482-ae77-b1d17a3f662a"
  />
  <div v-if="products.isLoading" class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
    <template v-for="loader in 12">
      <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
        <Skeleton height="20rem" class="mb-2">{{loader}}</Skeleton>
        <Skeleton height="2rem" class="mb-2"></Skeleton>
        <Skeleton height="2rem" class="mb-2"></Skeleton>
      </div>
    </template>
  </div>
  <template v-else>
    <Fieldset
      v-if="products.filteredProducts.length > 1"
      legend="Filtros"
      :toggleable="true"
      class="container mx-auto mt-8"
      :collapsed="isCollapsed"
      @toggle="changeCollapsed"
    >
      <div class="flex flex-col">
        <MpFilterQuantity
          :products="products.filteredProducts"
          :value="inventory"
          @filterQuantity="filterQuantity"
        />
      </div>
      <div class="mt-2 flex gap-2">
        <template v-for="filter in chips" :key="filter.key">
          <MpChip :label="filter" />
        </template>
      </div>
    </Fieldset>
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      <template
        v-for="product in productsToView"
        :key="product.id"
      >
        <MpCardProduct :product="product" />
      </template>
    </div>
  </template>
</template>

<style scoped>

</style>
