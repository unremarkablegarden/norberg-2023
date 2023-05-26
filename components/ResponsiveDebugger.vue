<template lang="pug">
#debug.fixed.top-1.right-1.z-50.bg-white.py-1.px-2.font-d.text-2xs.rounded
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
</template>

<style lang="sass" scoped>
@media (min-width: 1536px)
  .xxl_hidden
    display: none !important
  .xxl_block
    display: block !important
</style>