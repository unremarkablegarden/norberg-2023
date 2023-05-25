<template lang="pug">
h1.title.block
  .label.font-a.text-purple.absolute.z-10
    slot
  .label.font-b.relative.z-20
    slot
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
.bg-black
  background: #000 !important
  
</style>