// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
        htmlAttrs: { lang: 'en' },
        link: [
          { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: 'any' }
        ]
    }
},
    components: {
    dirs: [{ path: '~/components', pathPrefix: false }]
  },

  modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts',
    ],

    googleFonts: {
      families: {
        Inter: {
          wght: [400, 600, 700]
        }
      }
    },
      
    // Defaults options
    tailwindcss: {
      cssPath: '~/assets/css/tailwind.css',
      configPath: 'tailwind.config',
      exposeConfig: false,
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
