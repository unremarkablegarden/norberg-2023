<template lang="pug">
h1.title.block.text-center
  //- pre {{ width }}
  .under.font-a.text-purple.z-10.absolute(:style='{ width: width + "px" }')
    slot
  .label.font-b.z-20.relative(:style='{ width: width + "px" }')
    slot
</template>

<script setup>
const props = defineProps({
  // type: String,
  size: String,
  width: Number,
  disabled: Boolean,
  onClick: Function,
})
</script>

<style lang="sass" scoped>
.bg-black
  background: #000 !important
.under
  // margin-bottom: -2.4em
</style>