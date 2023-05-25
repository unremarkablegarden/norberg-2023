<template lang="pug">
.quote-slice
  blockquote.block-quotation.inline-block.font-b.text-3xl.lg_text-6xl
    em
      prismic-rich-text(:field='slice.primary.quote')
    //- | {{ $prismic.richTextAsPlain(slice.primary.quote) }}
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
// media query breakpoint large
@media (min-width: 1024px)
  .lg_text-6xl
    @apply text-6xl

.block-quotation
  div
    *
      display: inline-block
    &:before, &:after
      color: #9886E5
    &:before
      content: "« "
    &:after
      content: " »"

</style>