<script setup>
const config = useAppConfig()
const { client } = usePrismic()
const { data: doc } = await useAsyncData('doc', () => client.getSingle('homepage'))
</script>


<template lang="pug">
Head
  Title {{ config.title }} {{ config.year }}

#index(v-if='doc && doc.data')
  .splash(class='h-[106vh] md_h-[68vh] lg_h-[76vh]').absolute.left-0.top-32.md_top-40.w-full.overflow-hidden.md_overflow-auto
  
    .md_flex
      .left(class='h-[40vh] md_h-[49vh] lg_h-[55vh]').md_w-1x2.flex.flex-col.justify-center.items-center
        .text.text-2xl.xl_text-3xl.2xl_text-4xlpx-1.text-center.md_text-left.px-3.md_px-0.md_pl-6.lg_pl-8.pt-8.md_pt-0.2xl_mx-20.2xl_text-center
          //- .md_flex.flex-col.justify-center.items-center.
          //- .w-full.xl_w-11x12.2xl_w-10x12
          prismic-rich-text(:field="doc.data.body")
      
      .right(class='h-[40vh] md_h-[49vh] lg_h-[55vh]').md_w-1x2
        .video.md_-ml-20.md_overflow-hidden
          //- .md_flex.flex-col.justify-center.items-center.top-0
          .mask(class='-translate-x-[240px] -translate-y-[170px]').scale-50.md_scale-100.xl_scale-100.2xl_scale-100.md_-translate-x-0.md_-translate-y-0
            .container(v-if='doc.data.embed_vimeo_id')
              iframe(:src="'https://player.vimeo.com/video/'+ doc.data.embed_vimeo_id +'?autoplay=1&loop=1&muted=1&background=0&color=000000&byline=0&controls=0&dnt=1&pip=0&inline=1&title=0&transparent=1'" width='858' height='574' frameborder='0' allow='autoplay;')     
    
    .bottom
      Marquee
      .more.flex.justify-center.items-center.flex-col.pt-8
        nuxt-link(to='/lineup').scale-200
          img(src='/gfx/button_explore-all-artists.svg')
        span(style='font-size: 32px').pt-3 ↓
  
  .spacer(class='h-[130vh] md_h-[61vh] lg_h-[68vh]')
  
  .artists.mb-20.mt-0.md_mt-64
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
    // border: 1px white solid
    width: 858px
    height: 574px
    background: black
  .mask
    mask: url(/gfx/movie-player-svg-frame.svg#movie)
    width: 858px
    height: 574px

// #index
  // .splash
    // width: 100vw
    // overflow-x: hidden
    // logo - menu - banner
    // @media (max-width: 767px)
    //   height: calc(102vh - 190px - 38px - 36px)
    // @media (min-width: 768px)
    //   height: calc(100vh - 190px - 38px - 36px)
      
  // .text
    // @media (min-width: 768px)
    //   left: 0
    //   top: 0
    //   height: 100vh
    //   width: 50vw
      // background-image: url(/gfx/lines_textures3b.png)
    // background-size: auto 95vh
    // background-repeat: no-repeat
    // background-position: -15vw 8vh
      
  // .video
    // @media (min-width: 768px)
    //   height: 100vh
    //   left: 50vw
    //   width: 50vw
    //   background-image: url(/gfx/lines_textures3b.png)
    // background-size: auto 95vh
    // background-repeat: no-repeat
    // background-position: 15vw 0vh
    
  // .bottom
    // position: absolute
    // left: 0
    // border: 1px green solid
    // width: 100vw
    // @media (max-width: 767px)
    //   top: 50vh
    // @media (min-width: 768px)
    //   top: 78vh
    
</style>