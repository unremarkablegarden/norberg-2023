<template lang="pug">
#layout-default.relative(:class='$router.currentRoute.value.name').z-10
  LayoutSiteHeader
  
  .h-8.spacer
    
  Menu.px-4.lg_px-10.2xl_px-16.sticky.top-4.md_top-1.z-50
  
  Logo#logo
  
  main#main.px-4.lg_px-10.2xl_px-16.z-20.relative
    slot
  
  //- footer.px-4.lg_px-10.2xl_px-16
    LayoutSiteFooter
</template>
