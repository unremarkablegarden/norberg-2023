<template>
  <header class="px-4 lg_px-10 2xl_px-16 bg-black z-30 absolute w-full left-0">
    <div
      class="bar-top uppercase text-primary font-d text-lg md_text-2xl leading-7 py-2"
      id="header"
    >
      <div class="flex justify-between h-5">
        <button
          @click="toggleRadio"
          class="uppercase left date flex gap-4 max-w-full md_max-w-2xl"
        >
          <span v-if="playing" class="flex gap-2">
            <div class="bg-primary w-2 h-5"></div>
            <div class="bg-primary w-2 h-5"></div
          ></span>
          <span v-else>▶</span>
          <div
            class="border-primary border rounded-full flex px-2 items-center justify-center h-6 gap-1 w-24 sm_w-20 mt-[-1px]"
          >
            <div class="h-2 w-2 animate-pulse bg-primary rounded-full"></div>
            <span class="text-2xs mb-0 mt-1 w-fit">on air</span>
          </div>
          <Vue3Marquee pauseOnHover="1"
            >Norbergfestival radio
            <img class="h-8 mx-2 -mt-3" src="/star.png" />
            <span v-if="data"> {{ data.current_track.title }}</span>
            <span v-else> Loading</span>&nbsp;&nbsp;&nbsp;&nbsp;</Vue3Marquee
          >
        </button>
        <nuxt-link to="/artist/radio" class="right location text-right hidden md_block"
          >Schedule →</nuxt-link
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
let playing = ref(false);
let radio = ref(null);
const { pending, data, error, refresh } = await useFetch(
  "https://public.radio.co/stations/s2dab303e6/status",
  {
    lazy: true,
    server: false,
  }
);

setInterval(function () {
  console.log(`refreshing the radio live player ${new Date().toISOString()}`);
  refresh(); // will call the 'todos' endpoint, just above
}, 60 * 1000); // 60 * 1000 milsec

const toggleRadio = () => {
  if (!playing.value) {
    radio.value.load();
    radio.value.play();
  } else {
    radio.value.pause();
  }
  playing.value = !playing.value;
};

onMounted(() => {
  console.log("mounted");
  radio.value = new Audio("https://s4.radio.co/s2dab303e6/listen");
});
</script>
