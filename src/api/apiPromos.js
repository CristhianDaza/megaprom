import { apiConfigPromos} from '@/services/apiConfig.js'

const userData = {
  user: import.meta.env.VITE_USER_API_PROMOS,
  password: import.meta.env.VITE_PASSWORD_API_PROMOS
}

/**
 * @description This POST request is used to obtain the Stock list of all active products. It is displayed by Products, Stock and Warehouse.
 * @returns {Promise<unknown>}
 */
export const getAllStock = () => new Promise((resolve, reject) => {
  try {
    const response = apiConfigPromos.request({
      method: 'POST',
      url: 'all-stocks',
      data: userData
    })
    
    resolve(response)
  } catch (e) {
    console.log(e)
    reject(e)
  }
})

/**
 * @description The POST request is built to obtain the list of all products with their technical data sheet. This information is found at the level of the parent product and only the variants are found at the level of the child product.
 * @returns {Promise<unknown>}
 */
export const getAllProducts = () => new Promise((resolve, reject) => {
  try {
    const response = apiConfigPromos.request({
      method: 'POST',
      url: 'all-products',
      data: userData
    })
    
    resolve(response)
  } catch (e) {
    console.log(e)
    reject(e)
  }
})

/**
 * @description This POST request is used to obtain the Stock list of a specific product. It is displayed by product, stock and warehouse.
 * @param {string} sku - Product SKU
 * @returns {Promise<unknown>}
 */
export const getProductStock = (sku) => new Promise((resolve, reject) => {
  try {
    const response = apiConfigPromos.request({
      method: 'POST',
      url: 'all-stocks',
      data: {
        ...userData,
        sku
      }
    })
    
    resolve(response)
  } catch (e) {
    console.log(e)
    reject(e)
  }
})
