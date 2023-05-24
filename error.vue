<template lang="pug">
#error
  h1.font-bold.text-b.text-2xl Error
  pre {{ error }}
</template>

<script setup>
const props = defineProps({
  error: Object
})
</script>