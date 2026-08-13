import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  // Request interceptor (siap untuk inject auth token)
  api.interceptors.request.use(
    (requestConfig) => {
      return requestConfig
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor (siap untuk handling error global)
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api,
      axios: api
    }
  }
})
