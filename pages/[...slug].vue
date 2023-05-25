<template lang="pug">
#page(v-if='!doc || !doc.data')
  #error.px-10.mt-20.flex.flex-col.items-center
    .title.text-6xl.mb-8
      UiTitle(size='xl') 404
    .text-4xl
      p Page not found
      
#page(v-else).content.w-full.lg_w-3x5.lg_mx-auto.mb-32
  
  .title(v-if='doc.data.title').mb-24.mt-16.flex.align-center.justify-center.text-6xl
    UiPageTitle
      | {{ $prismic.asText(doc.data.title) }}
  
  .date.text-sm.mb-4(v-if='doc.data.date').font-d.text-center.opacity-50.text-xs
    | Last updated {{ format(new Date(doc.last_publication_date), 'd MMMM yyyy') }}
  
    
  .body.text-2xl.lh-13
    slice-zone(:slices='doc.data.body' :components='components')
    
</template>

<script setup>
import { format } from 'date-fns'
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
