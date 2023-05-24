// https://nuxt.com/docs/api/configuration/nuxt-config
// import { resolve } from 'path'
// import { createCommonJS } from 'mlly'
// const { __dirname } = createCommonJS(import.meta.url)

export default defineNuxtConfig({
  app: {
    head: {
      // title: 'The Witness',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, user-scalable=no',
      htmlAttrs: { lang: 'en' },
      // meta: [
      //   {
      //     name: 'description',
      //     content: '.earth'
      //   }
      // ],
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
  
  // hooks: {
  //   'pages:extend' (pages) {
  //     pages.push(
  //       { 
  //         name: 'page', path: '/:slug(.*)',
  //         file: resolve(__dirname, 'pages/_page.vue')
  //       },
  //     )
  //   }
  // }
})
