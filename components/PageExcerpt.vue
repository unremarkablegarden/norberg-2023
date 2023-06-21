<template lang="pug">
//- #page
  //- pre {{ props }}
  //- pre {{ data }}
  //- pre {{  }}
#page(v-if='data[props.uid] && data[props.uid].data')
  //- pre {{ data[props.uid]?.data?.data }}
  .content
    #title(v-if='data[props.uid]?.data?.data?.title').mb-8.mt-2.md_mt-4.md_mb-12.lg_mb-20.lg_mt-4.xl_mt-10.2xl_mt-16.flex.align-center.justify-center.text-5xl.md_text-6xl.lg_text-7xl.leading-none.w-full.lg_w-11x12.xl_w-9x12.2xl_w-7x12.mx-auto
    
      UiPageTitle(:width='pageWidth').text-center
        h1(v-html='$prismic.asText(data[props.uid]?.data?.data?.title)').hyphens-auto.md_hyphens-manual

    .body.text-2xl.lh-13
      slice-zone(:slices='data[props.uid]?.data?.data?.body' :components='components')
    
</template>

<script setup>
const props = defineProps({ uid: String })
const { client } = usePrismic()

// create an object with the key of the string props.uid
const data = reactive({
  [props.uid]: false
})

data[props.uid] = await useAsyncData(props.uid, () => client.getByUID('page', props.uid))


// ------------------
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
// ------------------

const pageWidth = ref(0)
const titleEl = 'page'

const resizeHandler = (titleEl) => {
  pageWidth.value = document.getElementById(titleEl)?.offsetWidth
}

onMounted(() => {
  resizeHandler(titleEl)
  window.addEventListener('resize', () => resizeHandler(titleEl))
})

onUnmounted(() => {
  window.removeEventListener('resize', () => resizeHandler())
})


</script>
