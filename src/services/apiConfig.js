import axios from 'axios'

const apiConfigMarpico = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_MARPICO,
  headers: {
    Authorization: `Api-Key ${import.meta.env.VITE_TOKEN_API_MARPICO}`,
    'Content-Type': 'application/json',
  },
});

const apiConfigPromos = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_PROMOS,
});

export {
  apiConfigMarpico,
  apiConfigPromos
}
