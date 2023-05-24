<template lang="pug">
#lineup.mb-20
  ArtistGrid(sort="alpha")
</template>

<script setup>
definePageMeta({ layout: "plain" })
</script>

<style lang="sass">
#lineup .see-all-artists
  display: none
</style>