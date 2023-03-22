// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts', 
    ],

    googleFonts: {
      families: {
        'Open+Sans': true,
        'Montserrat': {
          wght: [400, 700]
        }
      }
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
