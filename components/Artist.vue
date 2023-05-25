<template lang="pug">
.artist
  .flex.justify-between.mb-5
    .left.w-11x12.lg_w-7x12
      .title.text-6xl
        nuxt-link(v-if='type === "lineup"' :to="'/artist/' + slug")
          UiTitle(size='xl') {{ $prismic.asText(data.headline) }}
        template(v-else)
          UiTitle(size='xl') {{ $prismic.asText(data.headline) }}
        
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
            .embed-container.shadow-marijn-big(:class='e.embed.provider_name ? e.embed.provider_name.toLowerCase() : null')
              //- pre {{ e.embed}}
              .iframe(v-html='e.embed.html')
            
</template>

<script setup>
const props = defineProps({ 
  data: Object,
  slug: String,
  type: String
})
</script>

<style lang="scss">
._16x9, .youtube, .vimeo {
  iframe, object, embed {
    // mobile
    @media (max-width: 1023px) {
      width: calc(100vw - 5rem);
      height: calc( ((100vw - 5rem) * (9/16)) ); 
    }
    // desktop
    @media (min-width: 1024px) {
      width: calc((100vw - 5rem) * (1/3));
      height: calc( ((100vw - 5rem) * (1/3)) * (9/16) );
    }
    
  }
}
.soundcloud {
  iframe, object, embed {
    width: 100%;
  }
}
</style>
