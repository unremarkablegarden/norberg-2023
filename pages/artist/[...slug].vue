<template lang="pug">
#artist
  pre {{ $route.params?.slug?.[0] }}
   
</template>

<script setup>
// import { defineSliceZoneComponents } from "@prismicio/vue"

// import Embed from '~/slices/Embed.vue'
// import Gallery from '~/slices/Gallery.vue'
// import ImageCaption from '~/slices/ImageCaption.vue'
// import Quote from '~/slices/Quote.vue'
// import Text from '~/slices/Text.vue'

// const components = defineSliceZoneComponents({
//   embed: Embed,
//   gallery: Gallery,
//   image_with_caption: ImageCaption,
//   quote: Quote,
//   text: Text,
// })

// const slug = useRoute().params.slug[0]
// const { client } = usePrismic()
// const { data: doc } = await useAsyncData('doc', () => client.getByUID('page', slug))

</script>
