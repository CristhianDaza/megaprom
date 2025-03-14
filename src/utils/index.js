import {
  constructCategoryMp,
  constructImagesCa,
  constructLabelsMp,
  constructPackagingCa,
  constructPackagingMp,
  constructSizeMp,
  constructTableQuantityCA,
  constructTableQuantityMp,
  constructTotalProductsCa,
  constructTotalProductsMp,
  formatText,
  getDiscounts
} from '../helpers'

export const formatNumber = (value, isTable = false) => {
  if (value == null) return ''
  if (value < 0) return '0'
  if (value > 10) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + `${isTable ? '' : ' unds.'}`
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const formatPrice = (value, includeIva) => {
  if (value == null) return ''
  if (value < 0) return '0'
  
  const formattedValue = includeIva ? value * 1.19 : value

  const roundedValue = Math.round(formattedValue * 100) / 100
  
  const roundValue = Math.ceil(roundedValue)
  
  if (includeIva) {
    return `$ ${formatNumber(roundValue, true)} con iva`
  }
  return `$ ${formatNumber(roundValue, true)} + iva`
}


export const combineProducts = (docs) => {
  const combinedProducts = []
  
  docs.forEach(doc => {
    const products = doc.data().products
    if (Array.isArray(products)) {
      combinedProducts.push(...products)
    } else {
      console.warn('Without products:', doc)
    }
  })
  
  return combinedProducts
}

export const normalizeAndFilterProducts = (products, searchTerm) => {
  const normalizeString = (str) => {
    if (!str) return ''
    if (Array.isArray(str)) str = str.join(' ')
    return String(str).normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
  }

  const keywords = normalizeString(searchTerm)
    .split(/\s+/)
    .map(keyword => _singularize(keyword.trim()))

  return products.filter(product => {
    const productName = normalizeString(product.name).split(/\s+/).map(_singularize).join(' ')
    const productDescription = normalizeString(product.description).split(/\s+/).map(_singularize).join(' ')
    const productMaterial = normalizeString(product.material).split(/\s+/).map(_singularize).join(' ')
    const productCategory = normalizeString(product.category || '').split(/\s+/).map(_singularize).join(' ')
    const productId = normalizeString(product.id)

    return keywords.every(keyword =>
      productName.includes(keyword) ||
      productDescription.includes(keyword) ||
      productMaterial.includes(keyword) ||
      productCategory.includes(keyword) ||
      productId.includes(keyword)
    )
  })
}

const _singularize = (word) => {
  return word.replace(/(as|es|os|is|us|s)$/, '')
}

export const normalizeProductsCA = (product, stock) => {
  return {
    api: 'promoopcion',
    areaPrinting: formatText(product?.impresion.areaImpresion),
    description: formatText(product?.descripcion),
    discount: null,
    id: product?.skuPadre,
    images: constructImagesCa(product?.hijos, product?.imagenesPadre),
    mainImage: product?.imagenesPadre.length > 0 ? product?.imagenesPadre?.[0] : 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/notFound.jpg?alt=media&token=dc6a597c-b70b-4e1d-b529-9a01ad548587',
    material: formatText(product?.material),
    name: `${formatText(product?.nombrePadre, true)}${product?.capacidad !== '' ? ` - ${product?.capacidad}` : ''}`,
    packaging: constructPackagingCa(product?.paquete),
    printing: formatText(product?.impresion.tecnicaImpresion),
    size: product?.medidas,
    tableQuantity: constructTableQuantityCA(product?.hijos, stock),
    totalProducts: constructTotalProductsCa(product?.hijos, stock)
  }
}


export const normalizeProductsMP = (product) => {
  return {
    api: 'marpico',
    areaPrinting: product?.area_impresion,
    category: constructCategoryMp(product),
    description: formatText(product?.descripcion_larga),
    discount: getDiscounts(product?.materiales),
    id: product?.familia,
    images: product?.imagenes,
    labels: constructLabelsMp(product),
    mainImage: product?.imagen === '' ? 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/notFound.jpg?alt=media&token=dc6a597c-b70b-4e1d-b529-9a01ad548587' : product?.imagen,
    material: formatText(product?.material),
    name: formatText(product?.descripcion_comercial),
    packaging: constructPackagingMp(product),
    printing: formatText(product?.tecnica_marca_tecnica),
    size: constructSizeMp(product),
    tableQuantity: constructTableQuantityMp(product?.materiales),
    totalProducts: constructTotalProductsMp(product?.materiales)
  }
}

export function daysDifferenceFromMidnight(date1, date2) {
  const date1Midnight = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
  const date2Midnight = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
  const diffInMs = date2Midnight - date1Midnight
  return diffInMs / (1000 * 60 * 60 * 24)
}
