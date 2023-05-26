const meta = {
  title: 'Norbergfestival',
  description: 'Norbergfestival is a 24-year running festival, held on the abandoned iron mine site of Mimerlaven in Norberg, Sweden. A growing group of artists present contemporary music, performances and interdisciplinary works. We make use of what the site provides, and we sleep on the ground. We extract what we produce and leave the mine as it was retired in 1981.',
  image: 'https://images.prismic.io/norbergfestival-2023/3fdd4f71-a01f-400f-84fa-ae958696a0a3_332976138_1326849398099883_926559151918573035_n.jpeg?auto=compress,format'
}

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, user-scalable=no',
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/png', href: '/star.png' }],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: meta.description
        }, 
        {
          hid: 'image',
          name: 'image',
          content: meta.image
        },
        {
          'name': 'twitter:card',
          'vmid': 'twitter:card',
          'content': 'summary'
        }, {
          'name': 'twitter:title',
          'vmid': 'twitter:title',
          'content': meta.title
        }, {
          'name': 'twitter:description',
          'vmid': 'twitter:description',
          'content': meta.description
        }, {
          'name': 'twitter:site',
          'vmid': 'twitter:site',
          'content': '@norbergfestival'
        }, {
          'name': 'twitter:creator',
          'vmid': 'twitter:creator',
          'content': '@norbergfestival'
        }, {
          'name': 'twitter:image:src',
          'vmid': 'twitter:image:src',
          'content': meta.image
        }, {
          'name': 'og:title',
          'vmid': 'og:title',
          'content': meta.title
        }, {
          'name': 'og:description',
          'vmid': 'og:description',
          'content': meta.description
        }, {
          'name': 'og:image',
          'vmid': 'og:image',
          'content': meta.image
        }, {
          'name': 'og:url',
          'vmid': 'og:url',
          'content': 'https://www.norbergfestival.com/'
        }, {
          'name': 'og:site_name',
          'vmid': 'og:site_name',
          'content': meta.title
        }, {
          'name': 'fb:admins',
          'vmid': 'fb:admins',
          'content': '120018101368569'
        }, {
          'name': 'og:type',
          'vmid': 'og:type',
          'content': 'website'
        },
      ]
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
