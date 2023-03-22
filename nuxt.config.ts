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
