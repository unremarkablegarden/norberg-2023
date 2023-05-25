<template lang="pug">
.text-slice.font-d.font-xl.w-full.lg_w-10x12.lg_mx-auto
  prismic-rich-text.textslice(:field='slice.primary.text')
</template>

<script setup>
const props = defineProps({
  slice: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="sass">
// .textslice
//   a
//     text-decoration: underline
</style>