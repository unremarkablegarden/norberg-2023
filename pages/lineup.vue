<template lang="pug">
Head
  Title Line-up at {{ config.title }} {{ config.year }}

#lineup.mb-20
  .logo-spacer.h-36.md_h-40.lg_h-48
  
  .md_flex.justify-between.items-center
    .title.mb-8.mt-2.md_mt-4.md_mb-12.lg_mb-20.lg_mt-10.text-4xl.md_text-6xl.lg_text-7xl.xl_text-8xl.2xl_text-8xl.text-center.md_text-left.relative
      UiPageTitle(:width='pageWidth')
        | Line-up 2023
      
    .link(class='md_w-[300px] md_-ml-[300px]').text-center.md_text-right.md_-mt-3.mb-6.-mt-2.scale-90.md_scale-100.relative.z-50
      nuxt-link(to='/all-artists') 
        UiButton(type='orange-black' size='xl') View as a list
        
  
  //- .txt.font-d.text-sm.md_text-base.lg_text-lg.text-center.mb-8.md_mb-10.lg_mb-12.xl_mb-16
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