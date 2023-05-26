<template lang="pug">
.artist
  .mobile-image.image.w-full.shadow-marijn-big.block.md_hidden.mb-8
    prismic-image(
      :field="data.image"
      :imgix-params="{ w: 800, h: 800, fit: 'facearea', facepad: 10, faceindex: 1 }"
    )

  .flex.justify-between.mb-5
    .left.w-11x12.lg_w-7x12
      .title.text-3xl.md_text-3.lg_text-5xl.xl_text-6xl
        nuxt-link(v-if='type === "lineup"' :to="'/artist/' + slug")
          UiTitle(size='xl') {{ $prismic.asText(data.headline) }}
        template(v-else)
          UiTitle(size='xl') {{ $prismic.asText(data.headline) }}
        
    .right.close
      .animate-spin
        nuxt-link(to="/artists").text-4xl.font-b.rotate-180.hover_text-mediumpurple X
      
  .flex.flex-wrap.md_flex-nowrap
    .left.lg_mr-6.w-full.md_w-6x12.lg_w-8x12.md_pr-8.lg_pr-16
    
      .flex.mb-6.lg_mb-16.normal-case.scale-75.md_scale-100
        UiButton(type="trans" size="xl") {{ data?.type }}
        //- UiButton(type="trans" size="xl") Date
        //- UiButton(type="trans" size="xl") Time
        //- UiButton(type="trans" size="xl") Tag
        //- UiButton(type="trans" size="xl") Venue
      
      .body.content.mb-8.font-d.text-base.md_text-lg.lg_text-xl
        prismic-rich-text(:field="data.body")
      
    .right.w-full.md_w-6x12.lg_w-4x12
      .image.w-full.shadow-marijn-big.hidden.md_block
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

<style lang="scss" scoped>
.scale-75 {
  transform-origin: left
}
</style>

<style lang="scss">
._16x9, .youtube, .vimeo {
  iframe, object, embed {
    // breakpoints:
    // md	768px	@media (min-width: 768px) { ... }
    // lg	1024px	@media (min-width: 1024px) { ... }
    // xl	1280px	@media (min-width: 1280px) { ... }
    // 2xl	1536px	@media (min-width: 1536px) { ... }
    
    // container:
    // .w-full .md_w-12x12 .lg_w-11x12 .xl_w-10x12 .2xl_w-8x12
    
    // mobile
    @media (max-width: 767px) {
      width: 100%;
      height: calc((100vw - 3rem) * (9/16));
    }
    // tablet
    @media (min-width: 768px) and (max-width: 1023px) {
      width: calc((100vw - 2rem) / 2);
      height: calc( (((100vw - 2rem) / 2) * (9/16)) ); 
    }
    // lg
    @media (min-width: 1024px) {
      // page px-10 (2.5rem)
      // container 10x12
      width: calc((100vw - 5rem) * (10/12) * (1/3));
      height: calc( ((100vw - 5rem) * (1/3)) * (9/16) );
    }
    // xl
    @media (min-width: 1280px) {
      // page px-10 (2.5rem)
      width: calc((100vw - 5rem) * (1/3) * (8/12));
      height: calc( ((100vw - 5rem) * (1/3)) * (8/12) * (9/16) );
    }
    // 2xl
    @media (min-width: 1536px) {
      // page px-16 (4rem)
      width: calc((100vw - 10rem) * (1/3) * (8/12));
      height: calc( ((100vw - 10rem) * (1/3)) * (8/12) * (9/16) );
    }
  }
}
.soundcloud {
  iframe, object, embed {
    width: 100%;
    // height: calc((100vw - 3rem) * (9/16));
  }
}
</style>
