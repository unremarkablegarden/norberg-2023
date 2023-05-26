<template lang="pug">
#artist-grid
  .wrapper
    .flex.flex-wrap
      .artist(v-for="(artist, i) in data.artists").w-1x2.md_w-4x12.lg_w-3x12.xl_w-1x5.2xl_w-1x6
        .p-2.pb-2.md_pb-3.xl_p-3
          //- .md_p-4.md_pb-8
          //- .lg_p-8.lg_pb-12
          nuxt-link(:to="`/artist/${artist.slugs?.[0]}`")
            .inner
              .image.shadow-marijn
                prismic-image(
                  :field="artist.data?.image"
                  :imgix-params="{ w: 800, h: 800, fit: 'facearea', facepad: 10, faceindex: 1 }"
                ).img
                  
              .text.flex.justify-between.mt-2.2xl_text-xl
                .name
                  prismic-rich-text(:field="artist.data?.headline")
                .type(v-if="artist.data?.type")
                  UiButton(type='trans' size='sm') 
                    | {{ artist.data?.type }}
      
      .artist.see-all-artists.w-1x2.md_w-4x12.lg_w-3x12.xl_w-1x5.2xl_w-1x6
        .p-0.pb-4
          .flex.justify-center.items-center.square
            nuxt-link(to='/all-artists')
              UiButton(type='orange-black' size='xl')
                .hidden.md_block
                  | All artists
                .block.md_hidden
                  | All
              
</template>

<script setup>
const props = defineProps({
  sort: {
    type: String,
    default: 'date'
  }
})

const { client } = usePrismic()
const data = reactive({})

const { data: artists } = await useAsyncData('artists', () => client.getByType('artist', { 
  pageSize: 100,
}))

watchEffect(() => {
  data.artists = artists.value?.results
  
  if (props.sort === 'alpha') {
    data.artists = data.artists.sort((a, b) => {
      const aName = a.data?.headline?.[0]?.text?.toLowerCase()
      const bName = b.data?.headline?.[0]?.text?.toLowerCase()
      if (aName < bName) return -1
      if (aName > bName) return 1
      return 0
    })
  }
})
</script>

<style lang="sass">
.image
  overflow: hidden
  .img
    transition: all 0.1s ease-in
    filter: brightness(0.9)
  // .hover
  //   display: none
  // .no-hover
  //   dislay: block
.image:hover
  .img
    transition: all 0.1s ease-out
    transform: scale(1.1)
    filter: brightness(1.1)
  // .hover
  //   display: block
  // .no-hover
  //   display: none

.square:after
  content: ""
  display: block
  padding-bottom: 100%
</style>