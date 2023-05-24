<template lang="pug">
#artist
  .flex.mt-8
    .left.mr-6.w-4x12
      .image.w-full
        //- (class="w-[400px] h-[400px]")
        prismic-image(
          :field="data.doc.image"
          :imgix-params="{ w: 800, h: 800, fit: 'facearea', facepad: 10, faceindex: 1 }"
        )
      .embeds(v-if='data.doc.embeds.length > 0').mt-8.mb-8
        .embed(v-for='(e, i) in data.doc.embeds')
          template(v-if='e.embed?.provider_name')
            strong {{ e.embed.provider_name }}
            .iframe(v-html='e.embed.html').w-full
    .right.w-8x12
      .title.text-4xl.mb-4
        prismic-rich-text(:field="data.doc.headline")
      .body.content.mb-8
        prismic-rich-text(:field="data.doc.body")
      
</template>

<script setup>
const slug = useRoute().params.slug[0]
const { client } = usePrismic()
// const { data: doc } = await useAsyncData('doc', () => client.getByUID('artist', slug))
const data = reactive({})

const { data: docs } = await useAsyncData('docs', () => client.getByType('artist'))

watchEffect(() => {
  data.doc = docs.value?.results?.find(doc => doc.slugs.includes(slug))?.data
})

</script>
