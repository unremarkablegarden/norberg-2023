<template lang="pug">
.artist
  .flex.justify-between.mb-5
    .left
      .title.text-6xl
        UiTitle(size='xl') {{ $prismic.asText(data.headline) }}
        //- prismic-rich-text(:field="data.headline")
    .right.close
      nuxt-link(to="/artists").text-4xl.font-b.rotate-180.hover_text-mediumpurple X
      
  .flex
    .left.mr-6.w-8x12.pr-16
      .flex.mb-16.normal-case
        UiButton(type="trans" size="xl") Program info coming later
        //- UiButton(type="trans" size="xl") Date
        //- UiButton(type="trans" size="xl") Time
        //- UiButton(type="trans" size="xl") Tag
        //- UiButton(type="trans" size="xl") Venue
      
    
      .body.content.mb-8.font-d.text-xl
        prismic-rich-text(:field="data.body")
      
    .right.w-4x12
      .image.w-full.shadow-marijn-big
        prismic-image(
          :field="data.image"
          :imgix-params="{ w: 800, h: 800, fit: 'facearea', facepad: 10, faceindex: 1 }"
        )
      .embeds(v-if='data.embeds.length > 0').mt-8.mb-8
        .embed(v-for='(e, i) in data.embeds')
          template(v-if='e.embed?.provider_name')
            strong {{ e.embed.provider_name }}
            .iframe(v-html='e.embed.html').w-full

</template>

<script setup>
const props = defineProps({ data: Object })
</script>
