<template lang="pug">
#marquee
  Vue3Marquee
    .artist(v-for='(artist, i) in data.artists').bg-black.text-green.text-2xl.whitespace-nowrap.mr-3
      nuxt-link(:to="'/artist/' + artist.slug").hover_text-purple {{ artist.name }}
  Vue3Marquee(direction="reverse").mt-3
    .artist(v-for='(artist, i) in data.artists').bg-black.text-green.text-2xl.whitespace-nowrap.mr-3
      nuxt-link(:to="'/artist/' + artist.slug").hover_text-purple {{ artist.name }}
</template>

<script setup>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'

const { client } = usePrismic()
const data = reactive({})
const { data: artists } = await useAsyncData('artists', () => client.getByType('artist', { pageSize: 100 }))

watchEffect(() => {
  data.artists = artists.value?.results.map(artist => { 
    return {
      name: artist.data.headline?.[0]?.text,
      slug: artist.slugs?.[0]
    }
  })
})

</script>
