<template lang="pug">
Artist(:data='data.doc')
</template>

<script setup>
definePageMeta({ layout: "plain" })

const slug = useRoute().params.slug[0]
const { client } = usePrismic()
const data = reactive({})

const { data: docs } = await useAsyncData('docs', () => client.getByType('artist'))

watchEffect(() => {
  data.doc = docs.value?.results?.find(doc => doc.slugs.includes(slug))?.data
})
</script>
