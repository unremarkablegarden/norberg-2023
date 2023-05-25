<template lang="pug">
#footer.px-10
  .sponsors.flex.justify-between.items-center.mb-10.gap-2
    .sponsor(v-for='(s, i) in footer?.data?.sponsors' :key='i')
      a(:href='s.link?.url?.replace("https://https://", "https://")', target='_blank').opacity-50.hover_opacity-100
        prismic-image(
          :field='s.image' :imgix-params='{ w: 200, h: 200, fm: "png",invert: s.invert }'
          :style='"transform: scale(" + (s.zoom || 1) + ")"'
        )
</template>

<script setup>
const { client } = usePrismic()
// const data = reactive({})

const { data: footer } = await useAsyncData('footer', () => client.getSingle('footer'))

// watchEffect(() => {
//   data.artists = artists.value?.results

</script>

<style lang="sass" scoped>
img
  filter: contrast(2)
a
  transition: all 0.3s ease
</style>