<template lang="pug">
#layout-default.bg-primary.relative.mt-16
  //- .min-h-screen
  //- (style="height: 200vh")
  
  //- header.px-10.bg-black.z-30.relative
    //- SeoMeta
    //- LayoutSiteHeader
  
  //- Menu.px-10.sticky.top-0.z-50
  
  //- Logo.sticky#logo.z-40

  main.px-10.z-20
    slot
  
  //- footer.px-10
    LayoutSiteFooter
    
</template>

<script setup>
</script>


<style lang="sass" scoped>
#logo
  top: 3rem
</style>