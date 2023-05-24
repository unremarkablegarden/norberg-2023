<template lang="pug">
button(:class='{ "orange-black": type == "orange-black", "trans": type == "trans" }')
  .inner.flex.overflow-hidden(:class='{ "h-8": size == "xl", "h-4": size == "sm" }')
    .left.decoration
    .label(:class='{ "text-xs px-0": size == "sm", "text-xl px-4": size == "xl", "bg-black text-orange": type == "orange-black" }').uppercase.py-1
      .label-inner(:class='{ "-translate-y-[2.5px]": size == "sm", "-translate-y-[2px]": size == "xl" }')
        slot
    .right.decoration
  //- pre {{ props }}
</template>

<script setup>
const props = defineProps({
  type: String,
  size: String,
  // disabled: Boolean,
  // onClick: Function,
})
</script>

<style lang="sass" scoped>
.normal-case .uppercase
  text-transform: none !important
.h-4
  height: 1.15rem
.h-8
  height: 1.8rem
// button
//   transition: all 0.2s ease-in
// button:hover
//   transition: all 0.2s ease-out
//   transform: scale(1.05)
button
  .bg-black
    background: #000 !important
  display: inline-block
  line-height: 1
  .decoration
    background-size: contain
    background-repeat: no-repeat
    display: inline-block
    width: 1rem
    // height: 2.5rem
    height: 100%
    // background-color: white
    background-color: transparent
    &.left
      background-position-x: right
      transform: translateX(1px)
    &.right
      transform: translateX(-1px)
    
  &.orange-black
    .left
      background-image: url(/gfx/button-side-fill-left.svg)
    .right
      background-image: url(/gfx/button-side-fill-right.svg)
      
  &.trans
    .label
      border: 2px solid black
      border-width: 2px 0
    .left
      background-image: url(/gfx/button-side-outline-left.svg)
    .right
      background-image: url(/gfx/button-side-outline-right.svg)
      
    
  
</style>