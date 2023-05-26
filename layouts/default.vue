<template lang="pug">
#layout-default.bg-primary.relative(:class='$router.currentRoute.value.name')
  //- .min-h-full.border
  header.px-4.lg_px-10.2xl_px-16.bg-black.z-30.relative
    LayoutSiteHeader
  
  Menu.px-4.lg_px-10.2xl_px-16.sticky.top-4.md_top-1.z-50
  
  Logo#logo
  
  main#main.px-4.lg_px-10.2xl_px-16.z-20.relative
    slot
  
  footer.px-4.lg_px-10.2xl_px-16
    LayoutSiteFooter
</template>

<script setup>
</script>

<style lang="sass" scoped>
#layout-default.index
  @media (max-width: 767px)
    background-image: url(/gfx/lines_textures3b.png)
    background-size: 300% auto
    background-position: 0 0
// #logo
//   top: 3rem
#main
  $logo: 190px
  $menu: 38px
  $banner: 36px
  $footer: 150px
  min-height: calc(100vh - #{$logo} - #{$menu} - #{$banner} - #{$footer})
// .min-h-full
//   min-height: 100vh
</style>