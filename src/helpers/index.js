export const constructSizeMp = (size) => {
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

export const constructPackagingCa = (packaging) => {
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

export const constructPackagingMp = (packaging) => {
  const parts = []
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

export const constructCategoryMp = (product) => {
  const parts = []
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

export const constructLabelsMp = (product) => {
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

export const constructImagesCa = (children, mainImage) => {
  const images = []
  if (children) {
    children.forEach(child => {
      if (child?.imagenesHijo) {
        child?.imagenesHijo.forEach(image => {
          images.push(image)
        })
      }
    })
  }
  if (mainImage.length > 0) {
    images.push(mainImage[0])
  }
  return images
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

export const formatText = (text, isDescription = false) => {
  let decodedText = _decodeHtmlEntities(text)
  if (!decodedText) return ''
  return isDescription ? decodedText : decodedText.charAt(0).toUpperCase() + decodedText.slice(1).toLowerCase()
}

export const constructTotalProductsMp = (materials) => {
  let totalProducts = 0
  materials.forEach(material => {
    totalProducts += material.inventario_almacen?.[0]?.cantidad
  })
  return totalProducts
}

export const constructTotalProductsCa = (children, stockData) => {
  let totalProducts = 0
  if (children) {
    children?.forEach(child => {
      const stockEntry = stockData.find(item => item.Material === child.skuHijo)
      if (stockEntry) {
        totalProducts += stockEntry.Stock
      }
    });
  }
  return totalProducts
}

export const constructTableQuantityMp = (materials) => {
  const quantity = []
  
  materials.forEach(material => {
    const discountFactor = material.descuento / 100
    const discountedPrice = material.precio + (material.precio * discountFactor)
    
    const item = {
      color: material.color_nombre,
      quantity: material.inventario_almacen?.[0]?.cantidad,
      inTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].cantidad : null,
      statusTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].estado : null,
      dataTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].fecha : null,
      lastUpdateTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].ultima_actualizacion : null,
      idColorTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].material_id : null,
      price: discountedPrice
    };
    
    Object.keys(item).forEach(key => {
      if (item[key] == null) {
        delete item[key]
      }
    })
    
    quantity.push(item)
  });
  
  return quantity
}


export const constructTableQuantityCA = (children, stockData) => {
  const table = []
  if (children) {
    children.forEach(child => {
      const stockEntry = stockData.find(item => item.Material === child.skuHijo)
      if (stockEntry) {
        table.push({
          color: _processString(child.color),
          quantity: stockEntry.Stock,
          price: child.precio
        });
      }
    });
  }
  return table
}

const _processString = (input) => {
  if (typeof input !== 'string') {
    return ''
  }
  const lowerCased = input.toLowerCase()
  return lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1)
}

export const formatColor = (color) => {
  const colors = {
    'Blanco': '#FFFFFF',
    'Negro': '#000000',
    'Rojo': '#FF0000',
    'Azul': '#0000FF',
    'Verde': '#008000',
    'Amarillo': '#FFFF00',
    'Naranja': '#ff4d00',
    'Rosa': '#FFC0CB',
    'Morado': '#800080',
    'Gris': '#808080',
    'Cian': '#00FFFF',
    'Marrón': '#A52A2A',
    'Violeta': '#EE82EE',
    'Turquesa': '#40E0D0',
    'Lima': '#00FF00',
    'Oro': '#FFD700',
    'Plateado': '#C0C0C0',
    'Plata': '#C0C0C0',
    'Celeste': '#87CEEB',
    'Lavanda': '#E6E6FA',
    'Fucsia': '#FF00FF',
    'Azul Rey': '#184ae3',
    'Verde Esmeralda': '#50C878',
    'Azul Cielo': '#87CEEB',
    'Azul Oscuro': '#00008B',
    'Verde Limón': '#32CD32',
    'Bamboo': '#E3A857',
    'Verde Oscuro': '#006400',
    'Camel': '#C19A6B',
    'Natural': '#F5F5DC',
    'Tricolor': '#FFD700', // Amarillo
    'Azul y Verde': '#00FF7F', // Verde Claro
    'Negro / Gris': '#2F4F4F',
    'Khaki': '#F0E68C',
    'Blanco Sólido': '#FFFFFF',
    'Plateado / Negro': '#C0C0C0',
    'Azul Claro': '#ADD8E6',
    'Gris Oscuro': '#A9A9A9',
    'Azul Petróleo': '#004953',
    'Vinotinto': '#800000',
    'Transparente': '#FFFFFF00',
    'Plateado / Azul Rey': '#4169E1',
    'Amarillo Neón': '#FFFF33',
    'Naranja Neón': '#FF6600',
    'Café': '#6F4E37',
    'Rosado Oro': '#B76E79',
    'Transparente / Negro': '#FFFFFF00',
    'Transparente / Azul Rey': '#FFFFFF00',
    'Azul Rey / Negro': '#4169E1',
    'Amarillo Limón': '#FFFFE0',
    'Blanco Traslúcido': '#FFFFFF00',
    'Naranja Traslúcido': '#FFA50088',
    'Rosado Traslúcido': '#FFC0CB88',
    'Rojo Sólido': '#FF0000',
    'Verde Esmeralda Traslúcido': '#50C87888',
    'Morado Traslúcido': '#80008088',
    'Azul Rey Sólido': '#4169E1',
    'Amarillo Traslúcido': '#FFFF0088',
    'Rojo Traslúcido': '#FF000088',
    'Azul Rey Traslúcido': '#4169E188',
    'Blanco / Rojo': '#FFFFFF',
    'Blanco / Negro': '#FFFFFF',
    'Blanco / Azul Rey': '#FFFFFF',
    'Blanco / Verde': '#FFFFFF',
    'Naranja Neón / Blanco': '#FFFFFF',
    'Blanco / Azul Oscuro': '#FFFFFF',
    'Blanco / Rosado Neón': '#FFFFFF',
    'Azul Traslúcido': '#0000FF88',
    'Amarillo Sólido': '#FFFF00',
    'Morado Sólido': '#800080',
    'Naranja Sólido': '#FFA500',
    'Burgundy': '#800020',
    'Negro / Rojo': '#000000',
    'Negro / Azul Rey': '#000000',
    'Negro / Negro': '#000000',
    'Negro / Azul Oscuro': '#000000',
    'Azul Rey / Rsd, Amr, Vr': '#4169E1',
    'Blanco / Rsd, Amr, Vr': '#FFFFFF',
    'Rosado, Amarillo, Azul': '#FFC0CB',
    'Rosado, Amarillo, Verde': '#FFC0CB',
    'Azul Turquesa': '#40E0D0',
    'Blanco / Colores': '#FFFFFF',
    'Blanco / Blanco': '#FFFFFF',
    'Rosado, Amarillo. Verde': '#FFC0CB',
    'Rosado': '#bf61ff',
    'Beige': '#F5F5DC',
    'Amarillo metálico': '#FFD700',
    'Tinto': '#800020',
    'Negro translucido': '#000000',
    'Gris metalico': '#808080',
    'Azul metalico': '#0000FF88',
    'Rojo metalico': '#800020'
  }
  
  const normalizeColorName = (name) => {
    return name
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  };
  
  const normalizedColor = normalizeColorName(color)
  
  const foundColor = Object.keys(colors).find(
    key => normalizeColorName(key) === normalizedColor
  )
  
  return colors[foundColor] || null
}

export const getDiscounts = (materials) => {
  const discounts = materials
    .filter(material => material.descuento !== 0)
    .map(material => material.descuento)
  
  return discounts.length > 0 ? discounts[0] : null
}

