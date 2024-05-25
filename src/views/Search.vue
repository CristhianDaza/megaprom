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
const MpFilterDiscount = defineAsyncComponent(/* webpackChunkName: "mpFilterDiscount" */() => import('@/components/products/MpFilterDiscount.vue'))

const route = useRoute()
const router = useRouter()
const products = useProductsStore()

const isCollapsed = ref(true)
const inventory = ref(Number(route.query.inventario || 0))
const discount = ref(route.query.descuento || null)
const chips = ref([])

const productsToView = ref([])

const breadcrumbItems = [
  {
    icon: 'pi pi-search',
    label: 'Busqueda'
  }
]

const changeCollapsed = (toggle) => {
  isCollapsed.value = toggle.value
}

const applyFilters = () => {
  productsToView.value = products.filteredProducts.filter(product => {
    const matchesQuantity = inventory.value ? product.tableQuantity.some(item => item.quantity >= inventory.value) : true
    const matchesDiscount = discount.value ? product.discount !== null : true
    return matchesQuantity && matchesDiscount
  })
  if (
    route.query.inventario ||
    route.query.descuento
  ) {
    isCollapsed.value = false
  }
}

const filterQuantity = (value) => {
  inventory.value = value
  router.push({ query: { ...route.query, inventario: value } })
}

const filterDiscount = (value) => {
  discount.value = value ? value : null
  const query = { ...route.query }
  if (value) {
    query.descuento = value
  } else {
    delete query.descuento
  }
  router.push({ query })
}


const updateChips = () => {
  const filters = []
  if (route.query.inventario) {
    filters.push({ name: `Inventario: hasta ${formatNumber(route.query.inventario)}`, key: 'inventario' })
  }
  if (route.query.descuento) {
    filters.push({ name: 'Con descuento', key: 'descuento' })
  }
  chips.value = filters
}

watch(() => route.query.q, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await products.filterProductsByCategory(route.query.q)
    isCollapsed.value = true
    applyFilters()
  }
}, { immediate: true })

watch(() => [route.query.inventario, route.query.descuento], async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    inventory.value = Number(route.query.inventario || 0)
    discount.value = route.query.descuento || null
    applyFilters()
  }
}, { immediate: true })

watch(() => route.query, updateChips, { immediate: true })

onMounted(async () => {
  await products.filterProductsByCategory(route.query.q)
  applyFilters()
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
      <div class="flex w-full gap-2">
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
          <MpFilterQuantity
            :products="productsToView"
            :value="inventory"
            @filterQuantity="filterQuantity"
          />
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
          <MpFilterDiscount
            :products="productsToView"
            @filterDiscount="filterDiscount"
          />
        </div>
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
