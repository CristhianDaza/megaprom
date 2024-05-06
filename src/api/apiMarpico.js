import { apiConfigMarpico } from '@/services/apiConfig.js'

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
