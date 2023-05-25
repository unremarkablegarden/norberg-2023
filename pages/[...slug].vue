<template lang="pug">
Head
  Title {{ $prismic.asText(doc?.data?.title) }} > {{ config.title }} {{ config.year }}

SeoMeta(:doc='doc' :config='config')

#page(v-if='!doc || !doc.data')
  #error.px-10.mt-20.flex.flex-col.items-center
    .title.text-6xl.mb-8
      UiTitle(size='xl') 404
    .text-4xl
      p Page not found

#page(v-else).content.mb-32.w-full
  //- .lg_w-3x5.lg_mx-auto
  
  #title(v-if='doc?.data?.title').mb-24.mt-16.flex.align-center.justify-center.text-6xl.w-full.lg_w-8x12.lg_mx-auto
    UiPageTitle(:width='pageWidth')
      div(v-html='$prismic.asText(doc?.data?.title)')
  
  .date.text-sm.mb-4(v-if='doc.data.date').font-d.text-center.opacity-50.text-xs
    | Last updated {{ format(new Date(doc.last_publication_date), 'd MMMM yyyy') }}
    
  .body.text-2xl.lh-13
    slice-zone(:slices='doc.data.body' :components='components')
    
</template>

<script setup>
const config = useAppConfig()
import { format } from 'date-fns'
import { defineSliceZoneComponents } from "@prismicio/vue"

import Embed from '~/components/slices/Embed.vue'
import Gallery from '~/components/slices/Gallery.vue'
import ImageCaption from '~/components/slices/ImageCaption.vue'
import Quote from '~/components/slices/Quote.vue'
import Text from '~/components/slices/Text.vue'

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


const pageWidth = ref(0)
const titleWrapper = 'title'

onMounted(() => {
  pageWidth.value = document.getElementById(titleWrapper).offsetWidth
  
  window.addEventListener('resize', () => {
    pageWidth.value = document.getElementById(titleWrapper).offsetWidth
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    pageWidth.value = document.getElementById(titleWrapper).offsetWidth
  })
})

</script>


<style lang="sass" scoped>
  
</style>