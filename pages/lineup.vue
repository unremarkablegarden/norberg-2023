<template lang="pug">
Head
  Title Line-up at {{ config.title }} {{ config.year }}

#lineup.mb-20
  .title.mb-8.mt-2.md_mt-4.md_mb-12.lg_mb-20.lg_mt-10.flex.align-center.justify-center.text-4xl.md_text-5xl.lg_text-6xl
    UiPageTitle(:width='pageWidth')
      | Line-up
  
  .txt.font-d.text-sm.md_text-base.lg_text-lg.text-center.mb-8.md_mb-10.lg_mb-12.xl_mb-16
    p
      | If you would like to read all the artist bios in one place you can 
      nuxt-link(to='/all-artists') find them here
      
  ArtistGrid(sort="alpha")
  
</template>

<script setup>
// definePageMeta({ layout: "plain" })
const config = useAppConfig()
const pageWidth = ref(0)

const titleEl = 'lineup'
onMounted(() => {
  pageWidth.value = document.getElementById(titleEl).offsetWidth
  
  window.addEventListener('resize', () => {
    pageWidth.value = document.getElementById(titleEl).offsetWidth
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    pageWidth.value = document.getElementById(titleEl).offsetWidth
  })
})

</script>

<style lang="sass">
#artists .see-all-artists
  display: none
</style>