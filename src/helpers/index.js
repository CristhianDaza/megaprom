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

export const services = {
  promocionales: {
    pages: 2,
    page1: [
      {
        title: 'Tampografía',
        description: 'Es una técnica de estampado a base de tinta de larga duración. El proceso se realiza de forma manual y mecánica por color; esta técnica de impresión, es aplicada en diferentes materiales como: plástico, cartón, aluminio, bambo, madera, pvc o silicona. ',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Fpromocionales%2Ftampografia.png?alt=media&token=35cf4291-99f4-4b50-b1b8-49022f5f8076'
      },
      {
        title: 'Sublimación',
        description: 'Es otro tipo de modelo de estampado para personalización que permite transferir una imagen a una prenda 100% poliéster, o a un artículo con recubrimiento de poliéster, como: mug de cerámica, vasos metálicos, gorras, camisetas y paraguas. Esta transferencia se logra aplicando calor con una plancha en el producto.',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Fpromocionales%2Fsublimacion.png?alt=media&token=596ac7d0-617c-40f4-8c48-71e3259744da'
      },
      {
        title: 'Screen',
        description: 'La serigrafía es un proceso de estampado que consiste en la impresión de imágenes por medio del paso de una determinada cantidad de tinta por una plantilla, la cual se encuentra unida a un bastidor, el proceso se realiza de forma manual y mecánica por color, es aplicada en diferentes materiales como: plástico, cartón y tela.',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Fpromocionales%2Fscreen.png?alt=media&token=c5c9369a-83d5-4e27-a4ce-121afce6ad9b'
      }
    ],
    page2: [
      {
        title: 'Laser',
        description: 'Es una técnica utilizada en diversas industrias con la intención de marcar o grabar códigos, textos o imágenes vectorizadas en distintas piezas y materiales (metálicos, bambo y madera). Esto permite la trazabilidad de las piezas marcadas durante todo su ciclo de vida, ya que se trata de un método que emplea un láser de alta intensidad que quema o cambia la apariencia de la superficie del material trabajado.',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Fpromocionales%2Flaser.png?alt=media&token=bab81841-4fa4-4af0-9575-bffb0f64f93f'
      },
      {
        title: 'Termofijado DTF',
        description: 'La impresión DTF permite imprimir diseños de alta calidad directamente sobre una película de transferencia especial. Esto significa que puedes obtener imágenes detalladas y vibrantes en una amplia gama de materiales, como: algodón, poliéster, y más; esta técnica se realiza termofíjado por medio de calor con una plancha en el producto.',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Fpromocionales%2Ftermofijado.png?alt=media&token=7ec6e9de-93b5-4e75-9c68-3b27ac3806c4'
      },
      {
        title: 'Impresión Rígidos',
        description: 'Es otra de las alternativas que tenemos para marcar contenidos publicitarios personalizados. Es un método de impresión digital basado en tintas UV, que gracias a esta técnica consigue un secado especial al exponerlo a la luz ultravioleta y que permite una larga duración en la marca',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Fpromocionales%2Frigidos.png?alt=media&token=08c2c0a1-9933-4633-af25-7c0fa235e196'
      }
    ]
  },
  offset: {
    pages: 2,
    page1: [
      {
        title: 'Plastificadora mate o brillante',
        description: `El plastificado mate consiste en recubrir el producto con una fina película de polipropileno mate que aporta un toque de elegancia y de alta calidad al producto final.<br /><br />El plastificado brillante se consigue recubriendo el material impreso con una película finísima de polipropileno brillante que protege el producto, dándole un aspecto de alta calidad.<br /><br />Este tipo de plastificado es especialmente indicado para los productos de carpetas de presentación, flyers, o cubiertas de revistas, libros y libretas.`,
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Foffset%2Fplastificadora.png?alt=media&token=a042ae3a-7880-4699-a9fb-634681350c4f'
      },
      {
        title: 'Cosedora caballete',
        description: 'Esta encuadernación con las hojas unidas formando un cuadernillo grapado en el lomo, formando un pliegue central. Pensado para revistas, catálogos o folletos.',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Foffset%2Fcosedora.png?alt=media&token=80b41588-20d7-4ce6-b628-a40d8fc725c2'
      },
      {
        title: 'Hotmlet',
        description: 'La encuadernación hot melt consiste en fusionar los cuadernos de una revista o libro con la aplicación de un pegamento que, a alta temperatura, se vuelve líquido. Los resultados son de gran calidad con una mayor flexibilidad y agarre que se traduce en resultados más resistentes y duraderos.',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Foffset%2Fhotmel.png?alt=media&token=54ba633f-97c2-45a0-a229-c9dc54cf839e'
      }
    ],
    page2: [
      {
        title: 'Argolladora',
        description: `La encuadernación con anillas, como su propio nombre indica, consiste en la unión de diferentes hojas por medio de unas anillas específicamente diseñadas para ese fin.<br /><br /> Este tipo de encuadernación es de los más sencillos que existen`,
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Foffset%2Fargolaldora.png?alt=media&token=29324a43-37cc-4c84-b660-6b80d16adaec'
      },
      {
        title: 'Plegadora',
        description: 'Contamos con máquinas para plegar todo tipo de documentos de papel como cartas, folletos, facturas u ofertas. Muy útiles en empresas donde se gestionan grandes cantidades de correspondencia o se realizan campañas de publicidad a través de correo postal directo como el mailing.',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Foffset%2Fplegadora.png?alt=media&token=6dff422a-444b-476e-8d06-cfb5bb04828e'
      },
      {
        title: 'Encuadernación',
        description: 'Contamos con un personal altamente calificado pera el debido proceso en terminado de los productos gráficos, gracias a esto podemos garantizar que tu trabajo esté perfectamente finalizado.',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Foffset%2Fencuadernacion.png?alt=media&token=ce59fb3c-b61a-4bf1-b29a-4aa0597fcf3a'
      }
    ]
  },
  digital: {
    pages: 2,
    page1: [
      {
        title: 'Plastificadora mate o brillante',
        description: `El plastificado mate consiste en recubrir el producto con una fina película de polipropileno mate que aporta un toque de elegancia y de alta calidad al producto final.<br /><br />El plastificado brillante se consigue recubriendo el material impreso con una película finísima de polipropileno brillante que protege el producto, dándole un aspecto de alta calidad.<br /><br />Este tipo de plastificado es especialmente indicado para los productos de carpetas de presentación, flyers, o cubiertas de revistas, libros y libretas.`,
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Foffset%2Fplastificadora.png?alt=media&token=a042ae3a-7880-4699-a9fb-634681350c4f'
      },
      {
        title: 'Cosedora caballete',
        description: 'Esta encuadernación con las hojas unidas formando un cuadernillo grapado en el lomo, formando un pliegue central. Pensado para revistas, catálogos o folletos.',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Foffset%2Fcosedora.png?alt=media&token=80b41588-20d7-4ce6-b628-a40d8fc725c2'
      },
      {
        title: 'Hotmlet',
        description: 'La encuadernación hot melt consiste en fusionar los cuadernos de una revista o libro con la aplicación de un pegamento que, a alta temperatura, se vuelve líquido. Los resultados son de gran calidad con una mayor flexibilidad y agarre que se traduce en resultados más resistentes y duraderos.',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Foffset%2Fhotmel.png?alt=media&token=54ba633f-97c2-45a0-a229-c9dc54cf839e'
      }
    ],
    page2: [
      {
        title: 'Argolladora',
        description: `La encuadernación con anillas, como su propio nombre indica, consiste en la unión de diferentes hojas por medio de unas anillas específicamente diseñadas para ese fin.<br /><br /> Este tipo de encuadernación es de los más sencillos que existen`,
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Foffset%2Fargolaldora.png?alt=media&token=29324a43-37cc-4c84-b660-6b80d16adaec'
      },
      {
        title: 'Plegadora',
        description: 'Contamos con máquinas para plegar todo tipo de documentos de papel como cartas, folletos, facturas u ofertas. Muy útiles en empresas donde se gestionan grandes cantidades de correspondencia o se realizan campañas de publicidad a través de correo postal directo como el mailing.',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Foffset%2Fplegadora.png?alt=media&token=6dff422a-444b-476e-8d06-cfb5bb04828e'
      },
      {
        title: 'Encuadernación',
        description: 'Contamos con un personal altamente calificado pera el debido proceso en terminado de los productos gráficos, gracias a esto podemos garantizar que tu trabajo esté perfectamente finalizado.',
        image: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/services%2Foffset%2Fencuadernacion.png?alt=media&token=ce59fb3c-b61a-4bf1-b29a-4aa0597fcf3a'
      }
    ]
  },
};
