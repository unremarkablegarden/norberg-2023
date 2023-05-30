<template lang="pug">
#fancy-background
  #bg1.bg
  #bg2.bg
</template>

<style lang="sass" scoped>
.bg
  background-image: url(/gfx/lines_textures3.png)
  width: 40vw
  height: 100vh
  position: fixed
  top: 0
  z-index: 1
  background-repeat: no-repeat
  // border: 1px blue solid
#bg1
  left: 0 
  background-size: auto 95vh
  background-position: top right
#bg2
  left: 60vw
  background-size: auto 100vh
  background-position: -5vh left
</style>