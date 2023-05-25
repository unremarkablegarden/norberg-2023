<template lang="pug">
Head
  Title {{ data.doc?.headline?.[0]?.text }} at {{ config.title }} {{ config.year }}
  
#artist.pb-20
  Artist(:data='data.doc')
  Marquee(type='full')
</template>

<script setup>
const config = useAppConfig()
definePageMeta({ layout: "plain" })

const slug = useRoute().params.slug[0]
const { client } = usePrismic()
const data = reactive({})

const { data: docs } = await useAsyncData('docs', () => client.getByType('artist'))

watchEffect(() => {
  data.doc = docs.value?.results?.find(doc => doc.slugs.includes(slug))?.data
})
</script>
