<template lang="pug">
.text-slice.font-d.text-lg.md_text-xl.w-full.lg_w-10x12.xl_w-8x12.2xl_w-1x2.mx-auto
  //- .px-5.md_px-0.mx-auto
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