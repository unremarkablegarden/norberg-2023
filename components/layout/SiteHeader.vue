<template lang="pug">
header.px-4.lg_px-10.2xl_px-16.bg-black.z-30.absolute.w-full.left-0
  .bar-top.uppercase.text-primary.font-d.text-lg.md_text-2xl.leading-7.py-2#header
    .flex.justify-between.h-5
      button.uppercase.left.date.flex.gap-4.max-w-full.md_max-w-2xl(@click='toggleRadio')
        
        span.flex.gap-2(v-if='playing')
          .bg-primary.w-2.h-5
          .bg-primary.w-2.h-5
        span(v-else) ▶
        .border-primary.border.rounded-full.flex.px-2.items-center.justify-center.h-6.gap-1.w-24.sm_w-20(class='mt-[-1px]')
          .h-2.w-2.animate-pulse.bg-primary.rounded-full
          span.text-2xs.mb-0.mt-1.w-fit on air
        
        Vue3Marquee(pauseonhover='1')
          span Norbergfestival radio
          img.h-8.mx-2.-mt-2(src='/star.png')
          span(v-if='data') {{ data.current_track.title }}
          span(v-else) Loading
          img.h-8.mx-2.-mt-2(src='/star.png')
      nuxt-link.location.hidden.md_block(to='/artist/radio') Schedule →
</template>

<script setup>
import { Vue3Marquee } from "vue3-marquee"
import "vue3-marquee/dist/style.css"

let playing = ref(false)
let radio = ref(null)

const { pending, data, error, refresh } = await useFetch(
  "https://public.radio.co/stations/s2dab303e6/status", {
    lazy: true,
    server: false
  }
)

const toggleRadio = () => {
  if (!playing.value) {
    radio.value.load()
    radio.value.play()
  } else {
    radio.value.pause()
  }
  playing.value = !playing.value
}

let intervalId = null

onMounted(() => {
  radio.value = new Audio("https://s4.radio.co/s2dab303e6/listen")
  
  intervalId = window.setInterval(function () {
    console.log(`refreshing the radio live player ${new Date().toISOString()}`)
    refresh() // will call the 'todos' endpoint, just above
  }, 30 * 1000)
})

onUnmounted(() => {
  window.clearInterval(intervalId)
})

</script>
