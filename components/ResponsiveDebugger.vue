<template lang="pug">
#responsive-debugger(v-if='isDev').fixed.bottom-1.right-1.z-50.bg-white.py-1.px-2.font-d.text-2xs.rounded
  .block.md_hidden
    span sm
  .hidden.md_block.lg_hidden
    span md
  .hidden.lg_block.xl_hidden
    span lg
  .hidden.xl_block.xxl_hidden
    span xl
  .hidden.xxl_block
    span 2xl
  div {{ res }}
</template>

<style lang="sass" scoped>
@media (min-width: 1536px)
  .xxl_hidden
    display: none !important
  .xxl_block
    display: block !important
</style>

<script setup>
// see if the server is in development mode
const isDev = process.env.NODE_ENV === 'development'

const res = ref('0x0')
// on mount measure screen size and put in res
onMounted(() => {
  res.value = `${window.innerWidth}x${window.innerHeight}`
  window.addEventListener('resize', () => {
    res.value = `${window.innerWidth}x${window.innerHeight}`
  })
})

</script>