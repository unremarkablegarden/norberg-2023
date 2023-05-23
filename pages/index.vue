<script setup>
const { client } = usePrismic()
// const { data: home } = await useAsyncData('homepage', () => client.getByUID('page', 'home'))
const data = reactive({})
const { data: docs } = await useAsyncData('docs', () => client.getByType('homepage'))

watchEffect(() => {
  data.doc = docs.value?.results?.[0]?.data
})
</script>


<template lang="pug">
#index.absolute(v-if='data && data.doc')
  .text.text-2xl.flex.flex-col.justify-center.items-center.px-10
  
    prismic-rich-text(:field="data.doc.body")
  
  .video.absolute.flex.flex-col.justify-center.items-center.top-0
    .mask
      .container
        iframe(src='https://player.vimeo.com/video/823287528?autoplay=1&loop=1&muted=1&background=0&color=000000&byline=0&controls=0&dnt=1&pip=0&inline=1&title=0&transparent=1' width='858' height='574' frameborder='0' allow='autoplay;') 
    
    
  .bottom
    Marquee
    
    .more.flex.justify-center.items-center.flex-col.pt-8
      UiButton(type='orange-black') Explore all artists

      span(style='font-size: 32px').pt-3 ↓
      
</template>


<style lang="sass">
.video
  .container
    transform: scale(2.5)
    border: 1px white solid
    width: 858px
    height: 574px
    background: black
  .mask
    mask: url(/gfx/movie-player-svg-frame.svg#movie)
    width: 858px
    height: 574px

#index
  left: 0
  top: 0
  height: 100vh
  .text
    background-image: url(/gfx/lines_textures3b.png)
    background-size: auto 95vh
    background-repeat: no-repeat
    background-position: -15vw 8vh
    height: 100vh
    width: 50vw
    line-height: 1.2
    a
      text-decoration: underline
      font-family: 'B'
      
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
    bottom: 1rem
    left: 0
    // border: 1px green solid
    width: 100vw
    
</style>