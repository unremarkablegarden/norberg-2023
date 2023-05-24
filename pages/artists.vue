<template lang="pug">
#artists.mb-20
  ArtistGrid(sort="alpha")
</template>

<script setup>
definePageMeta({ layout: "plain" })
</script>

<style lang="sass">
#artists .see-all-artists
  display: none
</style>