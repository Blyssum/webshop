// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "BLYSSUM",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'title', content: 'BLYSSUM' },
        { name: 'description', content: 'look at multiple Designs by BLYSSUM in our ONLINESHOP.' },


      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  runtimeConfig: {
    public: {
      shopware: {
        shopwareEndpoint: "https://sw.blyssum.com",
        shopwareAccessToken: "SWSCEULDSNUYUFEYCGHTBWFZRG",
      }
    }
  },
  modules: ["@shopware-pwa/nuxt3-module", 'nuxt-simple-sitemap'],
  css: [ '~/assets/css/main.css' ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {

  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  typescript: {
    // typeCheck: true,
    strict: true,
  },

})