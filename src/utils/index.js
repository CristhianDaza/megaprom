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
} from '../helpers';

export const formatNumber = (value, isTable = false) => {
  if (value == null) return '';
  if (value < 0) return '0';
  if (value > 10) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + `${isTable ? '' : ' unds.'}`;
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const formatPrice = (value, includeIva) => {
  if (value == null) return '';
  if (value < 0) return '0';
  
  const formattedValue = includeIva ? value * 1.19 : value;

  const roundedValue = Math.round(formattedValue * 100) / 100;
  
  const roundValue = Math.ceil(roundedValue);
  
  if (includeIva) {
    return `$ ${formatNumber(roundValue, true)} con iva`;
  }
  return `$ ${formatNumber(roundValue, true)} + iva`;
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
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };
  
  const keywords = normalizeString(searchTerm).split('|').map(keyword => keyword.trim());
  
  return products.filter(product => {
    const productName = normalizeString(product.name);
    const productDescription = normalizeString(product.description);
    const productMaterial = normalizeString(product.material);
    const productCategory = product.category ? normalizeString(product.category) : '';
    const productId = normalizeString(product.id);
    
    return keywords.some(keyword =>
      productName.includes(keyword) ||
      productDescription.includes(keyword) ||
      productMaterial.includes(keyword) ||
      productCategory.includes(keyword) ||
      productId.includes(keyword)
    );
  });
}

export const normalizeProductsCA = (product, stock) => {
  return {
    areaPrinting: formatText(product?.impresion.areaImpresion),
    category: null,
    description: formatText(product?.descripcion, true),
    discount: null,
    id: product?.skuPadre,
    images: constructImagesCa(product?.hijos, product?.imagenesPadre),
    labels: null,
    mainImage: product?.imagenesPadre.length > 0 ? product?.imagenesPadre?.[0] : 'https://firebasestorage.googleapis.com/v0/b/megaprom-dev.appspot.com/o/Default%20Image.webp?alt=media&token=6f566cb0-8bfd-4090-b585-94fa330b9056',
    material: formatText(product?.material),
    name: `${formatText(product?.nombrePadre)}${product?.capacidad !== '' ? ` - ${product?.capacidad}` : ''}`,
    packaging: constructPackagingCa(product?.paquete),
    printing: formatText(product?.impresion.tecnicaImpresion),
    size: product?.medidas,
    tableQuantity: constructTableQuantityCA(product?.hijos, stock),
    totalProducts: constructTotalProductsCa(product?.hijos, stock)
  };
}


export const normalizeProductsMP = (product) => {
  return {
    areaPrinting: product?.area_impresion,
    category: constructCategoryMp(product),
    description: formatText(product?.descripcion_larga, true),
    discount: getDiscounts(product?.materiales),
    id: product?.familia,
    images: product?.imagenes,
    labels: constructLabelsMp(product),
    mainImage: product?.imagen === '' ? 'https://firebasestorage.googleapis.com/v0/b/megaprom-dev.appspot.com/o/Default%20Image.webp?alt=media&token=6f566cb0-8bfd-4090-b585-94fa330b9056' : product?.imagen,
    material: formatText(product?.material),
    name: formatText(product?.descripcion_comercial),
    packaging: constructPackagingMp(product),
    printing: formatText(product?.tecnica_marca_tecnica),
    size: constructSizeMp(product),
    tableQuantity: constructTableQuantityMp(product?.materiales),
    totalProducts: constructTotalProductsMp(product?.materiales)
  }
}

export const formatDate = (dateToTransform) => {
  if (!dateToTransform) return ''
  const date = new Date(dateToTransform);

  const day = date.getUTCDate()
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()

  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ]

  return `${day} de ${months[month]} del ${year}`
}
