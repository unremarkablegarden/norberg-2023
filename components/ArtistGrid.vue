<template lang="pug">
#artist-grid
  .wrapper.px-5
    //- .grid.grid-cols-4.gap-4
    .flex.flex-wrap
      .artist(v-for="(artist, i) in data.artists").w-3x12
        .p-2.pb-4
          nuxt-link(:to="`/artist/${artist.slugs?.[0]}`")
            .inner
              .image.shadow-marijn
                prismic-image(
                  :field="artist.data?.image"
                  :imgix-params="{ w: 600, h: 600, fit: 'facearea', facepad: 10, faceindex: 1 }"
                ).img
                //- .no-hover
                //-   prismic-image(
                //-     :field="artist.data?.image"
                //-     :imgix-params="{ w: 600, h: 600, fit: 'facearea', facepad: 10, faceindex: 1 }"
                //-   )
                //- .hover
                //-   prismic-image(
                //-     :field="artist.data?.image"
                //-     :imgix-params="{ w: 600, h: 600, fit: 'facearea', facepad: 3, faceindex: 1 }"
                //-   )
                  
              .text.flex.justify-between.mt-2
                .name
                  prismic-rich-text(:field="artist.data?.headline")
                .type(v-if="artist.data?.type")
                  UiButton(type='trans' size='sm') 
                    | {{ artist.data?.type }}
      
      .artist.w-3x12
        .p-2.pb-4
          .flex.justify-center.items-center.square
            nuxt-link(to='/artists')
              UiButton(type='orange-black' size='xl')
                | See all artists
              
</template>

<script setup>
const { client } = usePrismic()
const data = reactive({})
const { data: artists } = await useAsyncData('artists', () => client.getByType('artist', { pageSize: 100 }))

watchEffect(() => {
  data.artists = artists.value?.results
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