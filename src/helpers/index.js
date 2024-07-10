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
    })
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
      colorName: `${material.color_nombre}${material.variedad ? ` (${material.variedad})` : ''}`,
      quantity: material.inventario_almacen?.[0]?.cantidad,
      inTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].cantidad : null,
      statusTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].estado : null,
      dataTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].fecha : null,
      lastUpdateTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].ultima_actualizacion : null,
      idColorTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].material_id : null,
      price: discountedPrice
    }
    
    Object.keys(item).forEach(key => {
      if (item[key] == null) {
        delete item[key]
      }
    })
    
    quantity.push(item)
  })
  
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
          colorName: _processString(child.color),
          quantity: stockEntry.Stock,
          price: child.precio,
          type: child.tipo,
          sku: child.skuHijo
        })
      }
    })
  }
  return table
}

export const constructUpdatedTableQuantityCA = (children, stockData) => {
  const table = []
  if (children) {
    children.forEach(child => {
      const stockEntry = stockData.find(item => item.Material === child.sku)
      if (stockEntry) {
        table.push({
          ...child,
          quantity: stockEntry.Stock,
        })
      }
    })
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

const _colors = new Map([
  ['amarillo limon', '#FFFFE0'],
  ['amarillo metalico', '#FFD700'],
  ['amarillo neon', '#FFFF33'],
  ['amarillo solido', '#FFFF00'],
  ['amarillo traslucido', '#FFFF0088'],
  ['amarillo', '#FFFF00'],
  ['azul cielo', '#87CEEB'],
  ['azul claro', '#ADD8E6'],
  ['azul metalico', '#0000FF88'],
  ['azul oscuro', '#00008B'],
  ['azul pastel', '#AEC6CF'],
  ['azul petroleo', '#004953'],
  ['azul rey / negro', '#4169E1'],
  ['azul rey / rsd, amr, vr', '#4169E1'],
  ['azul rey solido', '#4169E1'],
  ['azul rey traslucido', '#4169E188'],
  ['azul rey', '#184ae3'],
  ['azul traslucido', '#0000FF88'],
  ['azul turquesa', '#40E0D0'],
  ['azul y verde', '#00FF7F'],
  ['azul', '#0000FF'],
  ['bamboo', '#E3A857'],
  ['beige', '#F5F5DC'],
  ['blanco / azul oscuro', '#FFFFFF'],
  ['blanco / azul rey', '#FFFFFF'],
  ['blanco / blanco', '#FFFFFF'],
  ['blanco / colores', '#FFFFFF'],
  ['blanco / negro', '#FFFFFF'],
  ['blanco / rojo', '#FFFFFF'],
  ['blanco / rosado neon', '#FFFFFF'],
  ['blanco / rsd, amr, vr', '#FFFFFF'],
  ['blanco / verde', '#FFFFFF'],
  ['blanco solido', '#FFFFFF'],
  ['blanco traslucido', '#FFFFFF80'],
  ['blanco', '#FFFFFF'],
  ['burgundy', '#800020'],
  ['cafe', '#6F4E37'],
  ['camel', '#C19A6B'],
  ['celeste', '#87CEEB'],
  ['cian', '#00FFFF'],
  ['fucsia', '#FF00FF'],
  ['gris metalico', '#808080'],
  ['gris oscuro', '#A9A9A9'],
  ['gris translucido', '#80808080'],
  ['gris', '#808080'],
  ['khaki', '#F0E68C'],
  ['lavanda', '#E6E6FA'],
  ['lima', '#00FF00'],
  ['marron', '#A52A2A'],
  ['morado pastel', '#DCC6E0'],
  ['morado solido', '#800080'],
  ['morado traslucido', '#80008088'],
  ['morado', '#800080'],
  ['naranja neon / blanco', '#FFFFFF'],
  ['naranja neon', '#FF6600'],
  ['naranja solido', '#FFA500'],
  ['naranja traslucido', '#FFA50088'],
  ['naranja', '#ff4d00'],
  ['natural', '#F5F5DC'],
  ['negro / azul oscuro', '#000000'],
  ['negro / azul rey', '#000000'],
  ['negro / gris', '#2F4F4F'],
  ['negro / negro', '#000000'],
  ['negro / rojo', '#000000'],
  ['negro translucido', '#00000080'],
  ['negro translucido', '#00000080'],
  ['negro traslucido', '#00000080'],
  ['negro', '#000000'],
  ['oro', '#FFD700'],
  ['plata', '#C0C0C0'],
  ['plateado / azul rey', '#4169E1'],
  ['plateado / negro', '#C0C0C0'],
  ['plateado', '#C0C0C0'],
  ['rojo metalico', '#800020'],
  ['rojo solido', '#FF0000'],
  ['rojo traslucido', '#FF000088'],
  ['rojo', '#FF0000'],
  ['rosa neon', '#FF00FF'],
  ['rosa pastel', '#FFD1DC'],
  ['rosa', '#FFC0CB'],
  ['rosado oro', '#B76E79'],
  ['rosado traslucido', '#FFC0CB88'],
  ['rosado', '#bf61ff'],
  ['rosado, amarillo, azul', '#FFC0CB'],
  ['rosado, amarillo, verde', '#FFC0CB'],
  ['rosado, amarillo. verde', '#FFC0CB'],
  ['tinto', '#800020'],
  ['transparente / azul rey', '#FFFFFF00'],
  ['transparente / negro', '#FFFFFF00'],
  ['transparente', '#FFFFFF00'],
  ['tricolor', '#FFD700'],
  ['turquesa', '#40E0D0'],
  ['verde esmeralda traslucido', '#50C87888'],
  ['verde esmeralda', '#50C878'],
  ['verde limon', '#32CD32'],
  ['verde metalico', '#50C878'],
  ['verde neon', '#00FF00'],
  ['verde oscuro', '#006400'],
  ['verde pastel', '#77DD77'],
  ['verde translucido', '#00800080'],
  ['verde traslucido', '#00800080'],
  ['verde', '#008000'],
  ['vinotinto', '#800000'],
  ['violeta', '#EE82EE']
])

const _normalizeColorName = (name) => {
  if (!name) return ''
  return name.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export const formatColor = (color) => {
  const normalizedColor = _normalizeColorName(color)
  return _colors.get(normalizedColor) || null
}

export const getDiscounts = (materials) => {
  const discounts = materials
    .filter(material => material.descuento !== 0)
    .map(material => material.descuento)
  
  return discounts.length > 0 ? discounts[0] : null
}

