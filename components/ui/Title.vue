<template lang="pug">
h1(:class='{ "": size == "sm", "": size == "xl" }').title.flex
  .decoration.left(class='w-[1.1rem] md_w-[1.4rem] lg_w-[1.6rem] xl_w-[1.8rem] 2xl_w-[2rem]')
  .label.bg-black.text-green.pb-1
    slot
  .decoration.right(class='w-[1.5rem] md_w-[1.8rem] lg_w-[2rem] xl_w-[2.3rem] 2xl_w-[2.5rem]')
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
  // box-shadow: 0 0 0 1px blue
  background-size: auto 102%
  // background-size: 100% auto
  background-repeat: no-repeat
  display: inline-block
  // height: 5rem
  // height: 100%
  // background-color: white
  background-color: transparent
  background-position-y: top
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