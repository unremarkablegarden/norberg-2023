<template lang="pug">
h1.title.flex.h-8
  .decoration.left
  .label.bg-black.pb-1(:class="{ 'text-green': !purple, 'text-purple': purple }")
    .translate-y-1.md_translate-y-0
      slot
  .decoration.right
</template>

<script setup>
const props = defineProps({
  // type: String,
  size: String,
  disabled: Boolean,
  onClick: Function,
  purple: Boolean
})
</script>

<style lang="sass" scoped>
// h1
  // display: inline-block
.bg-black
  background: #000 !important
.label
  padding: 0 0.5rem 0 0.3rem
.decoration
  // box-shadow: 0 0 0 1px #000
  background-size: 0.7rem auto
  background-repeat: no-repeat
  display: inline-block
  width: 0.9rem
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