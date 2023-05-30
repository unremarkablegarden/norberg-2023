<template lang="pug">
#marquee(:class='{ "fixed left-0 bottom-16 w-full z-50": type === "full", "": type === "small" }')
  Vue3Marquee
    .artist(v-for='(artist, i) in data.artists', class='py-0.5').text-green.text-xl.md_text-2xl.whitespace-nowrap.mr-2
      nuxt-link(:to="'/artist/' + artist.slug").hover_text-purple 
        UiTitleMarquee {{ artist.name }}
  
  Vue3Marquee(direction="reverse", v-if='type !== "full"').mt-1.md_mt-2
    .artist(v-for='(artist, i) in data.artists', class='py-0.5').text-green.text-xl.md_text-2xl.whitespace-nowrap.mr-2
      nuxt-link(:to="'/artist/' + artist.slug").hover_text-purple 
        UiTitleMarquee {{ artist.name }}
</template>

<script setup>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'

const props = defineProps({ type: String })

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
