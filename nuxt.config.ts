import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-09-07',
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt', '@vite-pwa/nuxt'],
  pwa: {
    manifest: {
      name: 'Drzewo Genealogiczne',
      short_name: 'GeoTree',
      description: 'GenTree to aplikacja, która tworzy pomoże ci stworzyć twoje drzewo genealogiczne.',
      id: './',
      start_url: './',
      lang: 'pl',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#008000',
      theme_color: '#008000',
      icons: [
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png"
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ],
      screenshots: [
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          form_factor: "wide",
          label: 'GeoTree'
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          form_factor: "narrow",
          label: 'GeoTree'
        }
      ]
    },
    strategies: 'generateSW',
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,jpg,ico}'],
    },
    registerType: 'prompt',
    injectRegister: 'auto',
  }
})
