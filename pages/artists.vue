<template lang="pug">
Head
  Title Artists at {{ config.title }} {{ config.year }}

#artists.mb-20
  .title.mb-24.mt-16.flex.align-center.justify-center.text-6xl
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