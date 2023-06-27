<template lang="pug">
h3.title.flex.text-green(:class="{ 'text-lg': text.length <= 16, 'text-base': text.length >= 16 }")
  //- .decoration.left(:style='{ "width": d().wl, "background-size": "auto " + d().sl }')
  //- .left-svg
    img(
      src='/gfx/artist-name-box_left.svg'
      :height="height1 + 'px'"
      :width="width1 + 'px'"
    )
  .label(ref='label').bg-black
    slot
    //- span : {{ d().sl }}
  //- .decoration.right
  //- .right-svg
    img(src='/gfx/artist-name-box_right.svg')
</template>

<script setup>
const props = defineProps({
  text: String,
  duration: Number
})

// const label = ref(null)
// const height1 = ref(22)
// const width1 = ref(22)

// onMounted(() => {
//   const getHeight = () => {
//     let l = label.value
//     let h = l.clientHeight
//     return h
//   }
//   height1.value = getHeight()
//   width1.value = getHeight()
// })


// const d = () => {
//   const l = props.text.length
  
//   // one row
//   let sl = 1.4
//   let wl = 0.5
//   let sr = 1.4
//   let wr = 0.7
  
//   // two rows
//   if (l > 12 && l < 20) { 
//     sl = 2.8
//     wl = 1.2
//     sr = 3
//     wr = 1.9
//   }
  
//   return {
//     sl: `${sl}rem`,
//     wl: `${wl}rem`,
//     sr: `${sr}rem`,
//     wr: `${wr}rem`
//   }
// }


</script>

<style lang="sass" scoped>
.label
  // padding: 0 0.3rem 0 0.3rem
  padding: 0 0.5rem 0 0.3rem
  // @media (min-width: 768px)
    // width: min-content
    
    
// .decoration
//   $sl: 1.4rem
//   $wl: 0.5rem
//   $sr: 1.4rem
//   $wr: 0.7rem
  
//   // $sl: 2.8rem
//   // $wl: 1.2rem
//   // $sr: 3rem
//   // $wr: 1.9rem
  
//   background-repeat: no-repeat
//   display: inline-block
//   background-color: transparent
//   // box-shadow: 0 0 0 1px yellow
//   &.left
//     background-size: auto $sl
//     width: $wl
//     background-position-x: right
//     transform: translateX(2px)
//     background-image: url(/gfx/artist-name-box_left.svg)
//   &.right
//     background-size: auto $sr
//     width: $wr
//     // background-size: auto 2.4rem
//     // width: 2rem
//     transform: translateX(-2px)
//     background-image: url(/gfx/artist-name-box_right.svg)
//   &.left-svg
//   &.right-svg
    
  // &.orange-black
  //   .left
  //     background-image: url(/gfx/button-side-fill-left.svg)
  //   .right
  //     background-image: url(/gfx/button-side-fill-right.svg)
  
  
</style>