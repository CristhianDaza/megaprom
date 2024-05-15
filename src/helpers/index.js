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

export const constructCategoryMp = (product) => {
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
  let totalProducts = 0;
  if (children) {
    children?.forEach(child => {
      const stockEntry = stockData.find(item => item.Material === child.skuHijo);
      if (stockEntry) {
        totalProducts += stockEntry.Stock;
      }
    });
  }
  return totalProducts;
}

export const constructTableQuantityMp = (materials) => {
  const quantity = [];
  
  materials.forEach(material => {
    const item = {
      color: material.color_nombre,
      quantity: material.inventario_almacen?.[0]?.cantidad,
      inTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].cantidad : null,
      statusTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].estado : null,
      dataTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].fecha : null,
      lastUpdateTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].ultima_actualizacion : null,
      idColorTracking: material.trackings_importacion.length > 0 ? material.trackings_importacion[0].material_id : null,
    };
    
    Object.keys(item).forEach(key => {
      if (item[key] == null) {
        delete item[key];
      }
    });
    
    quantity.push(item);
  });
  
  return quantity;
};


export const constructTableQuantityCA = (children, stockData) => {
  const table = [];
  if (children) {
    children.forEach(child => {
      const stockEntry = stockData.find(item => item.Material === child.skuHijo);
      if (stockEntry) {
        table.push({
          color: child.skuHijo,
          quantity: stockEntry.Stock
        });
      }
    });
  }
  return table;
}
