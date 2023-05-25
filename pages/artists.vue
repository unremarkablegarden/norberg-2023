<template lang="pug">
Head
  Title Artists at {{ config.title }} {{ config.year }}

#artists.mb-20
  .title.mb-8.mt-2.md_mt-4.md_mb-12.lg_mb-20.lg_mt-10.flex.align-center.justify-center.text-4xl.md_text-5xl.lg_text-6xl
    UiPageTitle(:width='pageWidth')
      | Artists
  ArtistGrid(sort="alpha")
</template>

<script setup>
// definePageMeta({ layout: "plain" })
const config = useAppConfig()
const pageWidth = ref(0)

onMounted(() => {
  pageWidth.value = document.getElementById('artists').offsetWidth
  
  window.addEventListener('resize', () => {
    pageWidth.value = document.getElementById('page').offsetWidth
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    pageWidth.value = document.getElementById('artists').offsetWidth
  })
})

</script>

<style lang="sass">
#artists .see-all-artists
  display: none
</style>