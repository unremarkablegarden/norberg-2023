<template lang="pug">
#error.px-10.mt-20
  .title.text-6xl.mb-8
    UiTitle(size='xl') Error
  pre {{ error }}
</template>

<script setup>
const props = defineProps({
  error: Object
})
</script>