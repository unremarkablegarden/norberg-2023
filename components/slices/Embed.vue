<template lang="pug">
.embed-slice
  div(v-html='slice?.primary?.embed?.[0].text')
  //- iframe(src='', width='100%', height='180px', scrolling='no', frameborder='no', marginheight='0', marginwidth='0')
</template>


<script setup>
const props = defineProps({
  slice: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="sass">
.embedslice
  a
    text-decoration: underline
</style>