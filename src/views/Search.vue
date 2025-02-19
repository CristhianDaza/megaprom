<script setup>
import { computed, defineAsyncComponent, watch } from 'vue'
import { useFilters } from '@/composables/useFilters'
import { useHead } from '@unhead/vue'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const MpCardProduct = defineAsyncComponent(/* webpackChunkName: "mpCardProduct" */() => import('@/components/UI/MpCardProduct.vue'))
const MpChip = defineAsyncComponent(/* webpackChunkName: "mpChip" */() => import('@/components/UI/MpChip.vue'))
const MpFilterDiscount = defineAsyncComponent(/* webpackChunkName: "mpFilterDiscount" */() => import('@/components/products/MpFilterDiscount.vue'))
const MpFilterQuantity = defineAsyncComponent(/* webpackChunkName: "mpFilterQuantity" */() => import('@/components/products/MpFilterQuantity.vue'))
const MpFilterColor = defineAsyncComponent(/* webpackChunkName: "mpFilterColor" */() => import('@/components/products/MpFilterColor.vue'))
const MpTitle = defineAsyncComponent(/* webpackChunkName: "mpTitle" */() => import('@/components/UI/MpTitle.vue'))

const paramSearch = computed(() => route.query.q)
const paramLabel = computed(() => route.query.label)
const isCategory = computed(() => route.query.isCategory)
const pageName = computed(() => route.query.pageName)

const breadcrumbItems = [
  {
    icon: 'pi pi-search',
    label: 'Busqueda'
  }
]

const {
  changeCollapsed,
  chips,
  countDiscountedProducts,
  filterByColor,
  filterDiscount,
  filterQuantity,
  getColors,
  getMaxQuantity,
  inventory,
  isCollapsed,
  isEmptyFilters,
  products,
  productsToView,
  route,
} = useFilters()

const updateMeta = () => {
  useHead({
    title: `${route.query.q ? route.query.q : route.query.pageName} | Megapromocionales`,
    meta: [
      { name: 'description', content: `Resultados de la búsqueda de ${route.query.q ? route.query.q : route.query.pageName} en Megapromocionales.` },
      { property: 'og:title', content: `${route.query.q ? route.query.q : route.query.pageName} | Megapromocionales` },
      { property: 'og:description', content: `Resultados de la búsqueda de ${route.query.q ? route.query.q : route.query.pageName} en Megapromocionales.` },
      { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-06.jpg?alt=media&token=9215aac9-b073-4482-ae77-b1d17a3f662a' },
      { property: 'og:url', content: 'https://megapromocionales.com.co/' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${route.query.q ? route.query.q : route.query.pageName} | Megapromocionales` },
      { name: 'twitter:description', content: `Resultados de la búsqueda de ${route.query.q ? route.query.q : route.query.pageName} en Megapromocionales.` },
      { name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-06.jpg?alt=media&token=9215aac9-b073-4482-ae77-b1d17a3f662a' }
    ]
  })
}

const titlePage = computed(() => {
  return isCategory.value ? paramSearch.value :
  pageName.value ? pageName.value :
  paramSearch.value ? `Búsqueda: ${paramSearch.value}` :
  'Productos'
})

watch(paramSearch, () => {
  updateMeta()
}, { immediate: true })

watch(paramLabel, () => {
  updateMeta()
}, { immediate: true })

updateMeta()
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    :title="titlePage"
    image="https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-06.jpg?alt=media&token=9215aac9-b073-4482-ae77-b1d17a3f662a"
  />
  <div v-if="products.isLoading" class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
    <div v-for="(loader, index) in 20" :key="index">
      <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
        <Skeleton height="15rem" class="mb-2">{{loader}}</Skeleton>
        <Skeleton height="2rem" class="mb-2"></Skeleton>
        <Skeleton height="2rem" class="mb-2"></Skeleton>
      </div>
    </div>
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
      <div class="flex w-full gap-2 flex-wrap">
        <div v-if="getMaxQuantity > 0" class="bg-gray-800/50 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-xl p-4 w-full md:w-auto shadow-lg transition-all duration-300 ease-in-out">
          <MpFilterQuantity
            :value="inventory"
            :totalProducts="getMaxQuantity"
            @filterQuantity="filterQuantity"
          />
        </div>
        <div v-if="countDiscountedProducts > 0" class="bg-gray-800/50 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-xl p-4 w-full md:w-auto shadow-lg transition-all duration-300 ease-in-out">
          <MpFilterDiscount
            :totalProducts="countDiscountedProducts"
            @filterDiscount="filterDiscount"
          />
        </div>
        <div class="bg-gray-800/50 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-xl p-4 w-full md:w-auto shadow-lg transition-all duration-300 ease-in-out">
          <MpFilterColor
            :totalColor="getColors"
            @filterByColor="filterByColor"
          />
        </div>
      </div>
      <div class="mt-2 flex gap-2">
        <template v-for="filter in chips" :key="filter.key">
          <MpChip :label="filter" />
        </template>
      </div>
    </Fieldset>
    <div v-if="!isEmptyFilters" class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
      <template
        v-for="product in productsToView"
        :key="product.id"
      >
        <MpCardProduct :product="product" />
      </template>
    </div>
    <template v-else>
      <div class="text-center">
        <p class="dark:text-gray-400 text-stone-800 mt-5">No encontramos productos para "<strong>{{ paramSearch }}</strong>".</p>
        <p class="dark:text-gray-500 text-stone-900 mt-2">Aquí tienes algunas opciones:</p>
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          <template
            v-for="product in productsToView"
            :key="product.id"
          >
            <MpCardProduct :product="product" />
          </template>
        </div>
      </div>
    </template>
  </template>
</template>
