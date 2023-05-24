<template lang="pug">
h1(:class='{ "text-2xl": style == "sm", "text-6xl h-10": style == "xl" }').title.flex
  .decoration.left
  .label.bg-black.text-green.pb-1
    slot
  .decoration.right
</template>

<script setup>
const props = defineProps({
  // type: String,
  size: String,
  disabled: Boolean,
  onClick: Function,
})
</script>

<style lang="sass" scoped>
// h1
  // display: inline-block
.bg-black
  background: #000 !important
.decoration
  background-size: 100% auto
  background-repeat: no-repeat
  display: inline-block
  width: 1.63rem
  // height: 5rem
  // height: 100%
  // background-color: white
  background-color: transparent
  &.left
    background-position-x: right
    transform: translateX(2px)
    background-image: url(/gfx/artist-name-box_left.svg)
  &.right
    transform: translateX(-2px)
    background-image: url(/gfx/artist-name-box_right.svg)
  
  // &.orange-black
  //   .left
  //     background-image: url(/gfx/button-side-fill-left.svg)
  //   .right
  //     background-image: url(/gfx/button-side-fill-right.svg)
  
  
</style>