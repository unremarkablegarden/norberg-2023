<template lang="pug">
button(:class='{ "orange-black": type == "orange-black" }')
  .inner.flex.overflow-hidden.h-8
    .left.decoration
    .label.uppercase.text-xl(:class='{ "bg-black text-orange": type == "orange-black" }').px-4.py-1
      slot
    .right.decoration
  //- pre {{ props }}
</template>

<script setup>
const props = defineProps({
  label: String,
  type: String,
  disabled: Boolean,
  onClick: Function,
})
</script>

<style lang="sass" scoped>
button
  transition: all 0.2s ease-in
button:hover
  transition: all 0.2s ease-out
  transform: scale(1.05)
button
  .bg-black
    background: #000 !important
  display: inline-block
  line-height: 1
  &.orange-black
    .decoration
      background-size: contain
      background-repeat: no-repeat
      display: inline-block
      width: 1rem
      // height: 2.5rem
      height: 100%
      // background-color: white
      background-color: transparent
    .left
      background-position-x: right
      background-image: url(/gfx/button-side-fill-left.svg)
    .right
      background-image: url(/gfx/button-side-fill-right.svg)
      
    
  
</style>