<template lang="pug">
Head
  Title Line-up at {{ config.title }} {{ config.year }}

#lineup.mx-auto.w-full.md_w-12x12.lg_w-11x12.xl_w-10x12.2xl_w-8x12

  .title.mb-8.mt-2.md_mt-4.md_mb-12.lg_mb-20.lg_mt-10.flex.align-center.justify-center.text-4xl.md_text-5xl.lg_text-6xl
    UiPageTitle(:width='pageWidth')
      | Line-up
  .artist(v-for="(artist, i) in data?.docs" :key='i', v-if='data && data.docs')
    Artist(:data='artist.data' :slug="artist.slugs?.[0]" type="lineup" ).mb-10.lg_mb-24
</template>


<script setup>
// definePageMeta({ layout: "plain" })
const config = useAppConfig()
const { client } = usePrismic()
const data = reactive({})

const { data: docs } = await useAsyncData('docs', () => client.getByType('artist', { 
  pageSize: 100,
  orderings: {
    field: 'my.artist.headline',
    direction: 'asc'
  }
}))

watchEffect(() => {
  data.docs = docs.value?.results.sort((a, b) => {
    const aName = a.data?.headline?.[0]?.text?.toLowerCase()
    const bName = b.data?.headline?.[0]?.text?.toLowerCase()
    if (aName < bName) return -1
    if (aName > bName) return 1
    return 0
  })
})

const pageWidth = ref(0)

onMounted(() => {
  pageWidth.value = document.getElementById('lineup').offsetWidth
  
  window.addEventListener('resize', () => {
    pageWidth.value = document.getElementById('page').offsetWidth
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    pageWidth.value = document.getElementById('lineup').offsetWidth
  })
})
</script>

<style lang="sass">
#lineup .artist .right.close
  display: none
</style>