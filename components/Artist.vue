<template lang="pug">
.artist
  .flex.justify-between.mb-5
    .left.w-11x12.lg_w-7x12
      .title.text-6xl
        UiTitle(size='xl') {{ $prismic.asText(data.headline) }}
        //- prismic-rich-text(:field="data.headline")
    .right.close
      .animate-spin
        nuxt-link(to="/artists").text-4xl.font-b.rotate-180.hover_text-mediumpurple X
      
  .flex
    .left.mr-6.w-8x12.pr-16
      .flex.mb-16.normal-case
        UiButton(type="trans" size="xl") Program info later
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
            //- strong {{ e.embed.provider_name }}
            .embed-container.shadow-marijn-big
              .iframe(v-html='e.embed.html')
            //- <div class='embed-container'><iframe src='https://www.youtube.com/embed/QILiHiTD3uc' frameborder='0' allowfullscreen></iframe></div>

</template>

<script setup>
const props = defineProps({ data: Object })
</script>

<style>
iframe
.embed-container {
  /* position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%; */
}

.embed-container iframe,
.embed-container object,
.embed-container embed {
  /* position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; */
  width: calc((100vw - 5rem) * (1/3));
  height: calc( ((100vw - 5rem) * (1/3)) * (9/16) );
  /* height: 0; */
  /* padding-bottom: 56.25%; */
}

</style>
