<template lang="pug">
.artist(v-if='data')
  .logo-spacer(v-if='type !== "lineup"').h-40.md_h-40.lg_h-48
  
  .flex.justify-between.mb-5
    .left.w-full
      //- .w-11x12.lg_w-7x12
      .title.text-4xl.md_text-5xl.lg_text-6xl.xl_text-6xl
        nuxt-link(v-if='type === "lineup"' :to="'/artist/' + slug")
          UiTitle(size='xl') {{ $prismic.asText(data.headline) }}
        template(v-else)
          UiTitle(size='xl') {{ $prismic.asText(data.headline) }}
        
    //- .right.back
      .flex.justify-end.items-center(v-if='type !== "lineup"')
        //- .label.font-b.mr-3.uppercase.opacity-30 Close
        .back
          nuxt-link(:to="close_link").font-a.rotate-180.hover_text-mediumpurple 
            .flex.justify-end.items-center
              .text-2xl.lg_text-3xl &larr;
              .text-xl.lg_text-2xl.uppercase.pl-3 back
      
  .flex.flex-wrap.md_flex-nowrap
    .left.lg_mr-6.w-full.md_w-8x12.lg_w-8x12.md_pr-8.lg_pr-16
    
      .flex.mb-6.lg_mb-16.normal-case.scale-75.md_scale-100
        UiButton(type="trans" size="xl" :disabled='true') {{ data?.type === 'Performer' ? 'Performance' : data?.type }}
        //- UiButton(type="trans" size="xl") Date
        //- UiButton(type="trans" size="xl") Time
        //- UiButton(type="trans" size="xl") Tag
        //- UiButton(type="trans" size="xl") Venue
      
      .body.content.mb-8.font-d.lh-13.text-base.md_text-lg.lg_text-xl
        //- .xl_text-2xl
        prismic-rich-text(:field="data.body")
      
    .right.w-full.md_w-4x12.lg_w-4x12
      .image.w-full.shadow-marijn-big(v-if='data.image?.url')
        //- .hidden.md_block
        prismic-image(
          :field="data.image"
          :imgix-params="{ w: 800, h: 800, fit: 'facearea', facepad: 10, faceindex: 1 }"
          :alt="$prismic.asText(data.headline)"
        )
      div(v-else)
        img(src='/star.png')
        
      prismic-rich-text(:field="data.photo_credit", v-if='$prismic.asText(data.photo_credit)').credit.mt-2.text-sm.font-d.text-right
        
      .embeds(v-if='data.embeds.length > 0').mt-8.mb-8
        .embed(v-for='(e, i) in data.embeds')
          template(v-if='e.embed?.provider_name')
            .embed-container.shadow-marijn-big(:class='e.embed.provider_name ? e.embed.provider_name.toLowerCase() : null')
              .iframe(v-html='e.embed.html')
            
</template>

<script setup>
const props = defineProps({ 
  data: Object,
  slug: String,
  type: String
})

const close_link = ref('/lineup')
const router = useRouter()
// if last page was /all-artists, go back to that, otherwise go to /lineup
const last_page = router?.options?.history?.state?.back
if (last_page === '/all-artists') {
  close_link.value = '/all-artists'
}
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
      // container 11x12
      width: calc((100vw - 5rem) * (11/12) * (1/3));
      height: calc( ((100vw - 5rem) * (11/12) * (1/3)) * (9/16) );
    }
    // xl
    @media (min-width: 1280px) {
      // page px-10 (2.5rem)
      width: calc((100vw - 5rem) * (1/3) * (10/12));
      height: calc( ((100vw - 5rem) * (1/3)) * (10/12) * (9/16) );
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
