// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";
export default defineNuxtConfig({
  app: {
    head: {
        link: [{ rel: 'icon', type: 'image/ico', href: '/favicon.ico' }]
    }
},
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts', 
    ],

    alias: {
      "@": resolve(__dirname, "/"),
    },

    googleFonts: {
      families: {
        'Open+Sans': true,
        'Montserrat': {
          wght: [400, 700]
        }
      }
    },
      
    // Defaults options
    tailwindcss: {
      cssPath: '~/assets/css/tailwind.css',
      configPath: 'tailwind.config',
      exposeConfig: false,
      config: {},
      injectPosition: 0,
      viewer: true,
    },
  
    build: {},
  
    css: ['~/assets/css/tailwind.css'],
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
})
