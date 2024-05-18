import { apiConfigMarpico } from '@/services/apiConfig.js'

/**
 * @description This function is used to obtain the list of all products.
 * @returns {Promise<unknown>}
 */
export const searchProduct = () => new Promise((resolve, reject) => {
  try {
    const response = apiConfigMarpico.request({
      method: 'GET',
      url: 'materialesAPI'
    })
    
    resolve(response)
  } catch (e) {
    console.log(e)
    reject(e)
  }
})

/**
 * @description This function is used to obtain the product by its ID.
 * @param {String} id - Product ID
 * @returns {Promise<unknown>}
 */
export const getProductId = (id) => new Promise(
  (resolve, reject) => {
    try {
      const response = apiConfigMarpico.request({
        method: 'GET',
        url: 'materialesAPIByProducto',
        params: {
          producto: id,
        }
      })
      resolve(response)
    } catch (e) {
      console.log(e)
      reject(e)
    }
  }
)
