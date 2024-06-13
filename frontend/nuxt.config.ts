// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui' , '@pinia/nuxt'],
  tailwindcss: {
    configPath: './tailwind.config.js',
    cssPath: '~/assets/css/tailwind.css'
  },
  ssr: false,
})
