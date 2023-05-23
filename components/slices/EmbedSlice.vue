<template lang="pug">
.post-part.single.container
  div(v-html='slice.primary.embed[0].text')
  //- iframe(src='', width='100%', height='180px', scrolling='no', frameborder='no', marginheight='0', marginwidth='0')
</template>

<script>
export default {
  props: ['slice'],
  name: 'embed-slice'
}
</script>

<style lang="sass">
.embedslice
  a
    text-decoration: underline
</style>