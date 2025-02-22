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
  const color = ref(route.query.color || null)
  const chips = ref([])
  const isEmptyFilters = ref(false)
  
  const productsToView = ref([])
  
  const changeCollapsed = (toggle) => {
    isCollapsed.value = toggle.value
  }
  
  const applyFilters = () => {
    productsToView.value = products.filteredProducts.filter(product => {
      isEmptyFilters.value = false
      const matchesQuantity = inventory.value
        ? product.tableQuantity.some(item => item.quantity >= inventory.value)
        : true
      const matchesDiscount = discount.value
        ? product.discount !== null
        : true
      const matchesColor = color.value
        ? product.tableQuantity.some(item => item.color.toLowerCase() === color.value.toLowerCase())
        : true
      return matchesQuantity && matchesDiscount && matchesColor
    })
    if (!productsToView.value.length) {
      isEmptyFilters.value = true
      _setSimilarProducts()
    }
    if (route.query.inventario || route.query.descuento || route.query.color) {
      isCollapsed.value = false
    }
  }

  const _setSimilarProducts = () => {
    let availableProducts = [...products.products]
    let similarProducts = ref([])

    if (availableProducts.length <= 25) {
      similarProducts.value = availableProducts
      return
    }

    productsToView.value = _getRandomItems(availableProducts, 25)
  }
  

  const _getRandomItems = (array, numItems) => {
    const shuffled = array.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, numItems)
  }

  const filterQuantity = (value) => {
    inventory.value = value
    router.push({query: {...route.query, inventario: value}})
      .then(() => applyFilters())
  }
  
  const filterDiscount = async (value) => {
    discount.value = value ? value : null
    const query = { ...route.query }
    if (value) {
      query.descuento = value
    } else {
      delete query.descuento
    }
    await router.push({ query })
  }
  
  const updateChips = () => {
    const filters = []
    if (route.query.inventario) {
      filters.push({ name: `Inventario: hasta ${formatNumber(route.query.inventario)}`, key: 'inventario' })
    }
    if (route.query.descuento) {
      filters.push({ name: 'Con descuento', key: 'descuento' })
    }
    if (route.query.color) {
      filters.push({ name: `Color: ${route.query.color}`, key: 'color' })
    }
    chips.value = filters
  }
  
  watch(() => route.query.q, async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      await products.filterProductsByCategory(route.query.q)
      isCollapsed.value = true
      applyFilters()
    }
  })
  
  watch(() => route.query.label, async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      await products.filterProductsByLabel(route.query.label)
      isCollapsed.value = true
      applyFilters()
    }
  })

  watch(() => [
    route.query.inventario,
    route.query.descuento,
    route.query.color,
  ], async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      inventory.value = Number(route.query.inventario || 0)
      discount.value = route.query.descuento || null
      color.value = route.query.color || null
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

  const getColors = computed(() => {
    const colorCount = {};

    productsToView.value.forEach(item => {
      if (item?.tableQuantity) {
        item.tableQuantity.forEach(quantityItem => {
          const color = quantityItem.color;
          colorCount[color] = (colorCount[color] || 0) + 1;
        });
      }
    });
  
    return Object.keys(colorCount).map(color => ({
      color,
      quantity: colorCount[color]
    }));
  });
  
  const filterByColor = (color) => {
    const query = { ...route.query }
    if (query.color === color) {
      delete query.color
    } else {
      query.color = color
    }
    router.push({ query })
  }
  
  onMounted(async () => {
    if (route.query.q) {
      await products.filterProductsByCategory(route.query.q)
    }
    if (route.query.label) {
      await products.filterProductsByLabel(route.query.label)
    }
    applyFilters()
    updateChips()
  })
  
  return {
    changeCollapsed,
    chips,
    countDiscountedProducts,
    discount,
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
    updateChips,
  }
}
