<template lang="pug">
//- Head
  Title {{ data.doc?.headline?.[0]?.text }} at {{ config.title }} {{ config.year }}

SeoMeta(:title='seo.title' :description='seo.description' :image='seo.image', v-if='seo.title')

#artist.pb-20.lg_pt-8
  //- .mx-auto.w-full.md_w-12x12.lg_w-11x12.xl_w-10x12.2xl_w-8x12
  Artist(:data='data.doc')
  //- Marquee(type='full')
</template>

<script setup>
const config = useAppConfig()
// definePageMeta({ layout: "plain" })

const slug = useRoute().params.slug[0]
const { client } = usePrismic()
const data = reactive({})

const seo = reactive({
  title: '',
  description: '',
  image: ''
})

const { data: docs } = await useAsyncData('docs', () => client.getByType('artist', { pageSize: 100 }))

watchEffect(() => {
  data.doc = docs.value?.results?.find(doc => doc.slugs.includes(slug))?.data
  
  seo.title = data.doc?.headline?.[0]?.text
  seo.description = data.doc?.body?.[0]?.text
  let image = data.doc?.image?.url

  image = image.replace(/h=\d+/, 'h=630').replace(/w=\d+/, 'w=1200')
  image = image.includes('fit=') ? image.replace(/fit=\w+/, 'f=crop') : image + '&fit=crop'
  seo.image = image
})
</script>