// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-10-04',

  // Set NUXT_APP_BASE_URL to '/<repository>/' for GitHub project pages,
  // or '/' for a custom domain and Vercel.
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'Nuxt Frontend Template',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt all-around frontend template supporting SSR and CSR.' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
        { rel: 'stylesheet', href: 'assets/scripts/vendor/font-awesome/@7.3.1/all.min.css' }
      ],
      script: [
        { src: 'assets/scripts/vendor/font-awesome/@7.3.1/all.min.js' },
      ]
    }
  },

  // Nuxt DevTools
  devtools: { enabled: true },

  // Registrasi Modul Utama
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxtjs/color-mode'
  ],

  // Load stylesheet utama Tailwind
  css: ['~/assets/css/main.css'],

  // Konfigurasi Tailwind & Color Mode (Dark/Light mode support)
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },

  // Konfigurasi Runtime Environment (Client & Server)
  runtimeConfig: {
    // Secret keys (Hanya tersedia di sisi server)
    apiSecret: '',
    // Public keys (Tersedia di sisi client dan server)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  },

  // Hybrid Rendering & Route Rules (Dukungan SSR & CSR)
  // Nuxt berjalan dengan SSR aktif secara default.
  // Anda dapat mengatur route tertentu menjadi CSR (SPA mode) atau SSG sesuai kebutuhan.
  routeRules: {
    // '/admin/**': { ssr: false }, // Client-Side Only (SPA)
    // '/api/**': { cors: true },   // API proxy/cors
  },

  // Konfigurasi TypeScript
  typescript: {
    strict: true
  }
})
