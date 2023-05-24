<template lang="pug">
#page(v-if='!doc || !doc.data')
  
  #error.px-10.mt-20.flex.flex-col.items-center
    .title.text-6xl.mb-8
      UiTitle(size='xl') 404
    .text-4xl
      p Page not found
#page(v-else)
  .title.text-4xl.mb-4(v-if='doc.data.title').text-darkpurple
    prismic-rich-text(:field="doc.data.title")
    
  .date.text-sm.mb-4(v-if='doc.data.date')
    prismic-text(:field="doc.data.date")
    
  .content
    slice-zone(:slices='doc.data.body' :components='components')
    
</template>

<script setup>
import { defineSliceZoneComponents } from "@prismicio/vue"

import Embed from '~/slices/Embed.vue'
import Gallery from '~/slices/Gallery.vue'
import ImageCaption from '~/slices/ImageCaption.vue'
import Quote from '~/slices/Quote.vue'
import Text from '~/slices/Text.vue'

const components = defineSliceZoneComponents({
  embed: Embed,
  gallery: Gallery,
  image_with_caption: ImageCaption,
  quote: Quote,
  text: Text,
})

const slug = useRoute().params?.slug?.[0]
const { client } = usePrismic()
const { data: doc } = await useAsyncData('doc', () => client.getByUID('page', slug))

</script>
