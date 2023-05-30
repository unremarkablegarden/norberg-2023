<template lang="pug">
#footer.w-full.lg_w-10x12.2xl_w-8x12.2xl_w-6x12.mx-auto
  //- .border-t.border-darkorange
  .sponsors.flex.justify-center.items-center.gap-3.md_gap-2.flex-wrap.md_flex-nowrap.mb-12.md_mb-0
    .sponsor(v-for='(s, i) in footer?.data?.sponsors' :key='i').mx-0.md_mx-4.w-3x12.md_w-auto
      a(:href='s.link?.url?.replace("https://https://", "https://")', target='_blank').opacity-50.hover_opacity-100
        prismic-image(
          :field='s.image' :imgix-params='{ w: 200, h: 200, fm: "png",invert: s.invert }'
          :style='"transform: scale(" + (s.zoom || 1) + ")"'
        )
        
  .credits.font-d.text-sm.pb-6.text-offblack
    .flex.justify-center
      .txt
        span Website designed by 
        a(href='https://marijndegenaar.net', target='_blank').underline Marijn Degenaar
        
      .txt
        span &nbsp;and coded by 
        a(href='https://unremarkablegarden.com', target='_blank').underline Olle Holmberg
    .fonts.text-center.pt-2.text-xs
      span Typefaces: 
      a(href='https://www.bb-bureau.fr/', target='_blank').font-a.underline Tokyto
      span &nbsp;by Benoît Bodhuin
      span &nbsp;and 
      a(href='https://abcdinamo.com/typefaces/diatype', target='_blank').underline Diatype
      span &nbsp;by Dinamo
      
</template>

<script setup>
const { client } = usePrismic()
// const data = reactive({})

const { data: footer } = await useAsyncData('footer', () => client.getSingle('footer'))

// watchEffect(() => {
//   data.artists = artists.value?.results

</script>

<style lang="sass" scoped>
img
  filter: contrast(2)
a
  transition: all 0.3s ease
</style>