const _constructSizeMp = (size) => {
  const parts = []
  if (size?.medidas_largo) {
    parts.push(`${Math.trunc(size.medidas_largo)}cm largo`)
  }
  if (size?.medidas_ancho) {
    parts.push(`${Math.trunc(size.medidas_ancho)}cm ancho`)
  }
  if (size?.medidas_alto) {
    parts.push(`${Math.trunc(size.medidas_alto)}cm alto`)
  }
  if (size?.medidas_diametro) {
    parts.push(`${size.medidas_diametro} de diámetro`)
  }
  return parts.join(' x ')
}

const _constructPackagingCa = (packaging) => {
  const parts = []
  if (packaging?.alto) {
    parts.push(`${packaging.alto} alto`)
  }
  if (packaging?.largo) {
    parts.push(`${packaging.largo} largo`)
  }
  if (packaging?.ancho) {
    parts.push(`${packaging.ancho} ancho`)
  }
  if (packaging?.pesoBruto) {
    parts.push(`${packaging.pesoBruto}${packaging.unidadPeso} peso bruto`)
  }
  if (packaging?.pesoNeto) {
    parts.push(`${packaging.pesoNeto}${packaging.unidadPeso} peso neto`)
  }
  if (packaging?.PiezasCaja) {
    parts.push(`${packaging.PiezasCaja} piezas por caja`)
  }
  if (packaging?.cajaIndividual) {
    parts.push(`Caga individual: ${packaging.cajaIndividual}`)
  }
  return parts.join(' - ')
}

const _constructPackagingMp = (packaging) => {
  const parts = [];
  if (packaging?.empaque_unds_caja) {
    parts.push(`${packaging.empaque_unds_caja} unidades por caja`)
  }
  if (packaging?.empaque_largo) {
    parts.push(`${packaging.empaque_largo} largo`)
  }
  if (packaging?.empaque_ancho) {
    parts.push(`${packaging.empaque_ancho} ancho`)
  }
  if (packaging?.empaque_alto) {
    parts.push(`${packaging.empaque_alto} alto`)
  }
  if (packaging?.empaque_peso_neto) {
    parts.push(`${packaging.empaque_peso_neto}G peso neto`)
  }
  if (packaging?.empaque_peso_bruto) {
    parts.push(`${packaging.empaque_peso_bruto}G peso bruto`)
  }
  if (packaging?.cajas_individuales) {
    parts.push(`${packaging.cajas_individuales} cajas individuales`)
  }
  return parts.join(' - ')
}

const _constructCategoryMp = (product) => {
  const parts = [];
  if (product?.subcategoria_1) {
    parts.push(product?.subcategoria_1?.nombre)
  }
  if (product?.subcategoria_2) {
    parts.push(product.subcategoria_2?.nombre)
  }
  if (product?.subcategoria_3) {
    parts.push(product.subcategoria_3?.nombre)
  }
  return parts.join(' | ')
}

const _constructLabelsMp = (product) => {
  const parts = []
  if (product?.etiquetas) {
    product.etiquetas.forEach(label => {
      parts.push({
        id: label.id,
        name: label.nombre,
        image: label.imagen
      })
    })
  }
  return parts
}

const _decodeHtmlEntities = (text) => {
  const htmlEntities = {
    '&Aacute;': 'Á',
    '&Eacute;': 'É',
    '&Iacute;': 'Í',
    '&Oacute;': 'Ó',
    '&Uacute;': 'Ú',
    '&aacute;': 'á',
    '&eacute;': 'é',
    '&iacute;': 'í',
    '&oacute;': 'ó',
    '&uacute;': 'ú',
    '&Ntilde;': 'Ñ',
    '&ntilde;': 'ñ'
  }
  if (!text) return text
  return text.replace(/&[A-Za-z]+;/g, match => htmlEntities[match] || match)
}

const _formatText = (text) => {
  let decodedText = _decodeHtmlEntities(text)
  if (!decodedText) return ''
  return decodedText.charAt(0).toUpperCase() + decodedText.slice(1).toLowerCase()
}

export const normalizeProductsMP = (product) => {
  return {
    areaPrinting: product?.area_impresion,
    category: _constructCategoryMp(product),
    description: _formatText(product?.descripcion_larga),
    id: product?.familia,
    images: product?.imagenes,
    labels: _constructLabelsMp(product),
    mainImage: product?.imagen === '' ? 'https://firebasestorage.googleapis.com/v0/b/megaprom-dev.appspot.com/o/Default%20Image.webp?alt=media&token=6f566cb0-8bfd-4090-b585-94fa330b9056' : product?.imagen,
    material: _formatText(product?.material),
    name: _formatText(product?.descripcion_comercial),
    packaging: _constructPackagingMp(product),
    printing: _formatText(product?.tecnica_marca_tecnica),
    size: _constructSizeMp(product)
  }
}

export const normalizeProductsCA = (product) => {
  return {
    areaPrinting: _formatText(product?.impresion.areaImpresion),
    category: null,
    description: _formatText(product?.descripcion),
    id: product?.skuPadre,
    images: product?.hijos?.[0]?.imagenesHijo,
    labels: null,
    mainImage: product?.imagenesPadre.length > 0 ? product?.imagenesPadre?.[0] : 'https://firebasestorage.googleapis.com/v0/b/megaprom-dev.appspot.com/o/Default%20Image.webp?alt=media&token=6f566cb0-8bfd-4090-b585-94fa330b9056',
    material: _formatText(product?.material),
    name: `${_formatText(product?.nombrePadre)}${product?.capacidad !== '' ? `- ${product?.capacidad}` : ''}`,
    packaging: _constructPackagingCa(product?.paquete),
    printing: _formatText(product?.impresion.tecnicaImpresion),
    size: product?.medidas
  };
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
