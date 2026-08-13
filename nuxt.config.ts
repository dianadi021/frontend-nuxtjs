// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  typescript: {
    strict: true
  },

  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ],

      link: [
        {
          rel: 'stylesheet',
          href: 'assets/scripts/vendor/font-awesome/@7.3.1/all.min.css'
        }
      ],

      script: [
        {
          src: 'assets/scripts/vendor/font-awesome/@7.3.1/all.min.js'
        },
      ]
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
})