// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "BLYSSUM",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'google-site-verification', content: 'RJ5wF4EZWSm7DGx0iVjukXX89mMMRZt2Edq1btd_aTM' }
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