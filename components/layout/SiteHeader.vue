<template lang="pug">
header.px-4.lg_px-10.2xl_px-16.bg-black.z-30.absolute.w-full.left-0
  #header.bar-top.uppercase.text-primary.font-d.text-lg.md_text-2xl.leading-7.py-2
    .flex.justify-between.h-5
      .left.date
        | {{ config.dates }}
      .middle.tickets.text-center
        nuxt-link(:to='config.tickets.link', target="_blank").hover_underline
          | {{ config.tickets.title }}
      .right.location.text-right.hidden.md_block
        | {{ config.location }}
</template>

<script setup>
const config = useAppConfig()
</script>
