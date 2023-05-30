<template lang="pug">
Head
  Title Artists at {{ config.title }} {{ config.year }}

#artists
  //- .mx-auto.w-full.md_w-12x12.lg_w-11x12.xl_w-10x12.2xl_w-8x12

  .md_flex.justify-between.items-center
  
    .title.mb-8.mt-2.md_mt-4.md_mb-12.lg_mb-20.lg_mt-10.text-4xl.md_text-6xl.lg_text-7xl.xl_text-8xl.2xl_text-8xl.text-center.md_text-left
      UiPageTitle(:width='pageWidth')
        | All artists
    
    .link(class='md_w-[300px] md_-ml-[300px]').text-center.md_text-right.md_-mt-5.mb-6.-mt-2.scale-90.md_scale-100.relative.z-50
      nuxt-link(to='/lineup') 
        UiButton(type='orange-black' size='xl') View as a grid
  
  //- .txt
    .font-d.text-sm.md_text-base.lg_text-lg.text-center.mb-8.md_mb-10.lg_mb-20.xl_mb-20.2xl_mb-24
      p Here you can read all the artist bios in one place
      p.opacity-30
        em Keep in mind that we haven't announced all the artists yet :)
      
      p Looking for somebody in particular? 
      p 
        | You can 
        nuxt-link(to='/lineup') find artists from the overview here
  
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
const titleEl = 'artists'

onMounted(() => {
  pageWidth.value = document.getElementById(titleEl).offsetWidth
  
  window.addEventListener('resize', () => {
    pageWidth.value = document.getElementById(titleEl).offsetWidth
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    pageWidth.value = document.getElementById(titleEl).offsetWidth
  })
})
</script>

<style lang="sass">
#lineup .artist .right.close
  display: none
.txt p
  margin-bottom: 1rem
</style>