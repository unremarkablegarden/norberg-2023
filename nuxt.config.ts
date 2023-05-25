export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, user-scalable=no',
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/png', href: '/star.png' }],
    },
  },
  
  css: [
    "@/assets/fonts/fonts.css",
    "@/assets/sass/main.sass"
  ],
  
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/prismic',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/device',
    '@nuxtjs/robots',
    '@nuxt/image-edge',
    'nuxt-simple-sitemap',
    // 'nuxt-lodash',
    // 'nuxt-seo-kit',
    '@morev/vue-transitions/nuxt',
    'nuxt-og-image',
    // 'nuxt-swiper'
    // 'nuxt-purgecss',
  ],
  
  image: {
    provider: 'prismic',
    prismic: {},
  },

  prismic: {
    endpoint: 'norbergfestival-2023',
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://norbergfestival.com/',
      siteName: 'Norbergfestival 2023',
      siteDescription: '6–8 July',
      language: 'en',
    }
  },

  devtools: {
    enabled: true
  },
})
