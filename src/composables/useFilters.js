import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/store/products.js'
import { formatNumber } from '@/utils'

export function useFilters() {
  const route = useRoute()
  const router = useRouter()
  const products = useProductsStore()
  
  const isCollapsed = ref(true)
  const inventory = ref(Number(route.query.inventario || 0))
  const discount = ref(route.query.descuento || null)
  const chips = ref([])
  
  const productsToView = ref([])
  
  const changeCollapsed = (toggle) => {
    isCollapsed.value = toggle.value
  }
  
  const applyFilters = () => {
    productsToView.value = products.filteredProducts.filter(product => {
      const matchesQuantity = inventory.value ? product.tableQuantity.some(item => item.quantity >= inventory.value) : true
      const matchesDiscount = discount.value ? product.discount !== null : true
      return matchesQuantity && matchesDiscount
    })
    if (route.query.inventario || route.query.descuento) {
      isCollapsed.value = false
    }
  }
  
  const filterQuantity = (value) => {
    inventory.value = value
    router.push({query: {...route.query, inventario: value}})
      .then(() => applyFilters())
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
  
  const countDiscountedProducts = computed(() => {
    let count = 0
    productsToView.value.forEach(item => {
      if (item?.discount !== null) {
        count++
      }
    })
    return count
  })
  
  const getMaxQuantity = computed(() => {
    let maxQuantity = 0
    productsToView.value.forEach(item => {
      if (item?.tableQuantity) {
        item.tableQuantity.forEach(quantityItem => {
          if (quantityItem.quantity > maxQuantity) {
            maxQuantity = quantityItem.quantity
          }
        })
      }
    })
    return maxQuantity
  })
  
  onMounted(async () => {
    await products.filterProductsByCategory(route.query.q)
    applyFilters()
    updateChips()
  })
  
  return {
    isCollapsed,
    inventory,
    discount,
    chips,
    productsToView,
    products,
    route,
    changeCollapsed,
    filterQuantity,
    filterDiscount,
    updateChips,
    countDiscountedProducts,
    getMaxQuantity
  }
}
