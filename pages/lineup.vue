<template lang="pug">
Head
  Title Line-up at {{ config.title }} {{ config.year }}

#lineup
  //- p.text-center.text-2xl.mt-10.mb-20.font-d.opacity-40
    //- span.underline Read the full line-up below
    //- | &nbsp; :)
  .title.mb-24.mt-16.flex.align-center.justify-center.text-6xl
    UiPageTitle(:width='pageWidth')
      | Line-up
  .artist(v-for="(artist, i) in data?.docs" :key='i', v-if='data && data.docs')
    Artist(:data='artist.data' :slug="artist.slugs?.[0]" type="lineup" ).mb-24
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