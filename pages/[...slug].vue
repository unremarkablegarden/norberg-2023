<template lang="pug">
//- Head
  Title {{ $prismic.asText(doc?.data?.title) }} > {{ config.title }} {{ config.year }}
  
SeoMeta(:title='seo.title' :description='seo.description' :image='seo.image')

//- SeoMeta(:doc='doc' :config='config')

#page(v-if='!doc || !doc.data')
  #error.px-10.mt-20.flex.flex-col.items-center
    .title.mb-8.mt-2.md_mt-4.md_mb-12.lg_mb-20.lg_mt-10.flex.align-center.justify-center.text-5xl.lg_text-6xl
      UiTitle(size='xl') 404
    .text-4xl
      p Page not found

#page(v-else).content.mb-32.w-full
  .logo-spacer.h-36.md_h-40.lg_h-48
  
  #title(v-if='doc?.data?.title').mb-8.mt-2.md_mt-4.md_mb-12.lg_mb-20.lg_mt-4.xl_mt-10.2xl_mt-16.flex.align-center.justify-center.text-5xl.md_text-6xl.lg_text-7xl.leading-none.w-full.lg_w-11x12.xl_w-9x12.2xl_w-7x12.mx-auto
  
    UiPageTitle(:width='pageWidth').text-center
      h1(v-html='$prismic.asText(doc?.data?.title)').hyphens-auto.md_hyphens-manual
  
  //- .date.text-sm.mb-4(v-if='doc.data.date').font-d.text-center.opacity-50.text-xs
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

const seo = reactive({
  title: '',
  description: '',
  image: ''
})

seo.title = doc.value.data?.title?.[0]?.text

doc.value.data?.body?.forEach(slice => {
  if (slice?.slice_type === 'text') {
    seo.description = slice?.primary?.text?.[0]?.text
    return
  }
})

doc.value.data?.body?.forEach(slice => {
  if (slice?.slice_type === 'image_with_caption') {
    let image = slice?.primary?.image?.url
    image = image.replace(/h=\d+/, 'h=630').replace(/w=\d+/, 'w=1200')
    image = image.includes('fit=') ? image.replace(/fit=\w+/, 'f=crop') : image + '&fit=crop'
    seo.image = image
    return
  }
})



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