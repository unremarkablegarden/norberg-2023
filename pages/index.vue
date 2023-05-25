<script setup>
const { client } = usePrismic()
const { data: doc } = await useAsyncData('doc', () => client.getSingle('homepage'))
</script>


<template lang="pug">
#index(v-if='doc && doc.data')
  
  .splash
    .text.absolute.text-2xl.flex.flex-col.justify-center.items-center.px-10
      prismic-rich-text(:field="doc.data.body")
    
    .video.absolute.flex.flex-col.justify-center.items-center.top-0
      .mask
        .container(v-if='doc.data.embed_vimeo_id')
          iframe(:src="'https://player.vimeo.com/video/'+ doc.data.embed_vimeo_id +'?autoplay=1&loop=1&muted=1&background=0&color=000000&byline=0&controls=0&dnt=1&pip=0&inline=1&title=0&transparent=1'" width='858' height='574' frameborder='0' allow='autoplay;')     
    .bottom
      Marquee
      .more.flex.justify-center.items-center.flex-col.pt-8
        //- UiButton(type='orange-black') Explore all artists
        nuxt-link(to='/lineup').scale-200
          img(src='/gfx/button_explore-all-artists.svg')
        span(style='font-size: 32px').pt-3 ↓
  
  .artists
    ArtistGrid
    
</template>


<style lang="sass">
.text
  line-height: 1.2
  a
    text-decoration: underline
    font-family: 'B'
</style>

<style lang="sass" scoped>
.video
  .container
    transform: scale(1.9)
    border: 1px white solid
    width: 858px
    height: 574px
    background: black
  .mask
    mask: url(/gfx/movie-player-svg-frame.svg#movie)
    width: 858px
    height: 574px

#index
  .splash
    // logo - menu - banner
    height: calc(100vh - 190px - 38px - 36px)
  .text
    left: 0
    top: 0
    height: 100vh
    background-image: url(/gfx/lines_textures3b.png)
    background-size: auto 95vh
    background-repeat: no-repeat
    background-position: -15vw 8vh
    height: 100vh
    width: 50vw
      
  .video
    height: 100vh
    left: 50vw
    width: 50vw
    background-image: url(/gfx/lines_textures3b.png)
    background-size: auto 95vh
    background-repeat: no-repeat
    background-position: 15vw 0vh
    
  .bottom
    position: absolute
    top: 78vh
    left: 0
    // border: 1px green solid
    width: 100vw
    
</style>