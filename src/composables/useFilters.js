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
  const selectedMaterial = ref(null)
  
  const changeCollapsed = (toggle) => {
    isCollapsed.value = toggle.value
  }
  
  const applyFilters = () => {
    productsToView.value = products.filteredProducts.filter(product => {
      const matchesQuantityAndColor = product.tableQuantity.some(item =>
        (!inventory.value || item.quantity >= inventory.value) &&
        (!color.value || item.color.trim().toLowerCase() === color.value?.trim().toLowerCase())
      )
      const matchesDiscount = !discount.value || product.discount !== null
      const matchesMaterial = !selectedMaterial.value ||
        _normalizeString(product.material).includes(_normalizeString(selectedMaterial.value))
      return matchesQuantityAndColor && matchesDiscount && matchesMaterial
    })
    
    isEmptyFilters.value = productsToView.value.length === 0;
    if (isEmptyFilters.value) {
      _setSimilarProducts()
    }
    if (route.query.inventario || route.query.descuento || route.query.color || route.query.material) {
      isCollapsed.value = false
    }
  }
  
  const _normalizeString = (str) => str ? str.trim().toLowerCase() : ''

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
    const query = { ...route.query }
    delete query['page']
    delete query['size']
    router.push({query: { ...query, inventario: value}})
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
    delete query['page']
    delete query['size']
    await router.push({ query })
  }
  
  const updateChips = () => {
    const filters = []
    const filterColors = {
      inventario: "#4A90E2",
      descuento: "#D0021B",
      color: "#F5A623",
      material: "#7ED321",
    };
    
    if (route.query.inventario) {
      filters.push({
        name: `Inventario: hasta ${formatNumber(route.query.inventario)}`,
        key: "inventario",
        color: filterColors["inventario"]
      });
    }
    if (route.query.descuento) {
      filters.push({
        name: "Con descuento",
        key: "descuento",
        color: filterColors["descuento"]
      });
    }
    if (route.query.color) {
      filters.push({
        name: `Color: ${route.query.color}`,
        key: "color",
        color: filterColors["color"]
      });
    }
    if (route.query.material) {
      filters.push({
        name: `Material: ${route.query.material}`,
        key: "material",
        color: filterColors["material"]
      });
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
    route.query.material,
  ], async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      inventory.value = Number(route.query.inventario || 0)
      discount.value = route.query.descuento || null
      color.value = route.query.color || null
      selectedMaterial.value = route.query.material || null
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
    delete query['page']
    delete query['size']
    router.push({ query })
  }
  
  const filterByMaterial = (material) => {
    selectedMaterial.value = material
    const query = { ...route.query }
    
    if (material) {
      query.material = material
    } else {
      delete query.material
    }
    delete query['page']
    delete query['size']
    router.push({ query }).then(() => applyFilters())
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
    updateChips,
  }
}
