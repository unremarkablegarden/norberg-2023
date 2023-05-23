<script setup>
const { client } = usePrismic()
const data = reactive({})
const { data: docs } = await useAsyncData('docs', () => client.getByType('homepage'))

watchEffect(() => {
  data.doc = docs.value?.results?.[0]?.data
})
</script>


<template lang="pug">
#logo.flex.justify-center.pt-4
  nuxt-img(:src="data.doc.logo.url" :alt="data.doc.logo.alt" width="1000" class='lg_w-[370px]').w-full
</template>

<style lang="sass" scoped>
// .lg_w-logo
</style>
