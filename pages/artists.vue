<template lang="pug">
#artists
  .artist(v-for="(artist, i) in data.docs" :key='i')
    //- pre {{ artist.data }}
    Artist(:data='artist.data').mb-24
</template>


<script setup>
definePageMeta({ layout: "plain" })

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
  data.docs = docs.value?.results
  .sort((a, b) => {
    const aName = a.data?.headline?.[0]?.text?.toLowerCase()
    const bName = b.data?.headline?.[0]?.text?.toLowerCase()
    if (aName < bName) return -1
    if (aName > bName) return 1
    return 0
  })
})
</script>