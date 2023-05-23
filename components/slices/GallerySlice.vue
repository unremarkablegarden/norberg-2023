<template lang="pug">
div
  .glide
    .glide__track(data-glide-el='track')
      .glide__slides
        .glide__slide(v-for='(img, index) in slice.items' :key='"index-" + index')
          .img
            img(:src='img.image.url', :alt='img.caption.text')
          .caption {{ img.caption[0].text }}

    .glide__bullets(data-glide-el='controls[nav]')
      button.glide__bullet(v-for='(img, index) in slice.items' :key='"index-" + index' :data-glide-dir='"=" + index')
      
    .glide__arrows(data-glide-el='controls')
      button.glide__arrow.glide__arrow--left(data-glide-dir='<') &larr;
      button.glide__arrow.glide__arrow--right(data-glide-dir='>') &rarr;
</template>


<script>
// import Glide from '@glidejs/glide'

export default {
  props: ['slice'],
  data: function() {
    return {
      
    }
  },
  name: 'gallery-slice',
  
  mounted () {
    console.log('mounted()')
    // new Glide('.glide').mount()
  }
}
</script>

<style lang="sass" scoped>

  xmp
    font-size: 12px
    line-height: 1em

  img
    width: 100%
    height: auto

</style>