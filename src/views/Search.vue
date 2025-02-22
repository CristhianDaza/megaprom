<script setup>
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFilters } from '@/composables/useFilters'
import { useHead } from '@unhead/vue'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const MpCardProduct = defineAsyncComponent(/* webpackChunkName: "mpCardProduct" */() => import('@/components/UI/MpCardProduct.vue'))
const MpChip = defineAsyncComponent(/* webpackChunkName: "mpChip" */() => import('@/components/UI/MpChip.vue'))
const MpFilterDiscount = defineAsyncComponent(/* webpackChunkName: "mpFilterDiscount" */() => import('@/components/products/MpFilterDiscount.vue'))
const MpFilterQuantity = defineAsyncComponent(/* webpackChunkName: "mpFilterQuantity" */() => import('@/components/products/MpFilterQuantity.vue'))
const MpFilterColor = defineAsyncComponent(/* webpackChunkName: "mpFilterColor" */() => import('@/components/products/MpFilterColor.vue'))
const MpTitle = defineAsyncComponent(/* webpackChunkName: "mpTitle" */() => import('@/components/UI/MpTitle.vue'))
const MpFilterMaterial = defineAsyncComponent(/* webpackChunkName: "mpFilterMaterial" */() => import('@/components/products/MpFilterMaterial.vue'))

const vueRouter = useRouter()
const vueRoute = useRoute()

const {
  changeCollapsed,
  chips,
  countDiscountedProducts,
  filterByColor,
  filterByMaterial,
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

const currentPage = ref(Number(route.query.page) || 1)
const pageSize = ref(Number(route.query.size) || 15)
const totalPages = computed(() => Math.ceil(products.filteredProducts.length / pageSize.value))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return productsToView.value.slice(start, end)
})

const changePage = (newPage) => {
  const page = newPage.page + 1
  if (pageSize.value !== newPage.rows) {
    changePageSize(newPage.rows)
  }
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    vueRouter.push({ query: { ...route.query, page, size: pageSize.value } })
  }
}

const changePageSize = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  vueRouter.push({ query: { ...route.query, page: currentPage.value, size: newSize } })
}

const generatePageSizeOptions = (totalProducts) => {
  const options = []
  let step = 15

  while (step < totalProducts) {
    options.push(step)
    step += 15
  }

  options.push(totalProducts)
  return options
}

const availableMaterials = computed(() => {
  const materials = productsToView.value.map(product => product.material)
  return [...new Set(materials.filter(Boolean))].sort()
})

watch(() => route?.query, (newQuery) => {
  currentPage.value = Number(newQuery.page) || 1
  pageSize.value = Number(newQuery.size) || 15
}, { immediate: true })

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
      <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-dark-mp dark:border-gray-700 p-4">
        <Skeleton height="15rem" class="mb-2">{{loader}}</Skeleton>
        <Skeleton height="2rem" class="mb-2"></Skeleton>
        <Skeleton height="2rem" class="mb-2"></Skeleton>
      </div>
    </div>
  </div>
  <template v-else>
    <div
      v-if="products.filteredProducts.length > 1"
      class="container mx-auto mt-8"
    >
      <div class="flex w-full gap-2 flex-wrap">
        <div v-if="getMaxQuantity > 0" class="bg-[#E7E7E7] dark:bg-dark-mp border border-gray-600 dark:border-gray-700 rounded-xl p-4 md:w-[280px] w-auto shadow-lg transition-all duration-300 ease-in-out">
          <MpFilterQuantity
            :value="inventory"
            :totalProducts="getMaxQuantity"
            @filterQuantity="filterQuantity"
          />
        </div>
        <div v-if="countDiscountedProducts > 0" class="bg-[#E7E7E7] dark:bg-dark-mp border border-gray-600 dark:border-gray-700 rounded-xl p-4 md:w-[280px] w-auto shadow-lg transition-all duration-300 ease-in-out">
          <MpFilterDiscount
            :totalProducts="countDiscountedProducts"
            @filterDiscount="filterDiscount"
          />
        </div>
        <div class="bg-[#E7E7E7] dark:bg-dark-mp border border-gray-600 dark:border-gray-700 rounded-xl p-4  md:w-[280px] w-auto shadow-lg transition-all duration-300 ease-in-out">
          <MpFilterColor
            :totalColor="getColors"
            @filterByColor="filterByColor"
          />
        </div>
        <div class="bg-[#E7E7E7] dark:bg-dark-mp border border-gray-600 dark:border-gray-700 rounded-xl p-4 md:w-[280px] w-auto shadow-lg transition-all duration-300 ease-in-out">
          <MpFilterMaterial
            :materials="availableMaterials"
            :totalProducts="productsToView.length"
            @filterMaterial="filterByMaterial"
          />
        </div>
      </div>
      <div class="mt-4 flex gap-2">
        <template v-for="filter in chips" :key="filter.key">
          <MpChip :label="filter" />
        </template>
      </div>
    </div>
    <template v-if="!isEmptyFilters">
      <Paginator
        v-if="productsToView.length > 15"
        :rows="pageSize"
        :totalRecords="productsToView.length"
        :rowsPerPageOptions="generatePageSizeOptions(productsToView.length)"
        :first="(currentPage - 1) * pageSize"
        :pageLinkSize="10"
        @page="changePage"
        class="mt-4"
      />
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 my-4">
        <template
          v-for="product in paginatedProducts"
          :key="product.id"
        >
          <MpCardProduct :product="product" />
        </template>
      </div>
      <Paginator
        v-if="productsToView.length > 15"
        :rows="pageSize"
        :totalRecords="productsToView.length"
        :rowsPerPageOptions="generatePageSizeOptions(productsToView.length)"
        :first="(currentPage - 1) * pageSize"
        :pageLinkSize="10"
        @page="changePage"
        class="mb-0"
      />
    </template>
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
