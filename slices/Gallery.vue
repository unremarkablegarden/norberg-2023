<template lang="pug">
.gallery-slice
  .glide
    .glide__track(data-glide-el='track')
      .glide__slides
        .glide__slide(v-for='(img, index) in slice.items' :key='"index-" + index')
          .img
            nuxt-img(:src='img.image.url', :alt='img.caption.text')
            //- img(:src='img.image.url', :alt='img.caption.text')
          prismic-text(:field='image.caption')
          //- .caption {{ img.caption[0].text }}

    .glide__bullets(data-glide-el='controls[nav]')
      button.glide__bullet(v-for='(img, index) in slice.items' :key='"index-" + index' :data-glide-dir='"=" + index')
      
    .glide__arrows(data-glide-el='controls')
      button.glide__arrow.glide__arrow--left(data-glide-dir='prev') &larr;
      button.glide__arrow.glide__arrow--right(data-glide-dir='next') &rarr;
</template>



<script setup>
const props = defineProps({
  slice: {
    type: Object,
    required: true,
  },
})

// glide.js ? other ?
</script>


<style lang="sass" scoped>
  img
    width: 100%
    height: auto

</style>