<script setup>
const config = useAppConfig()
</script>

<template lang="pug">
#header.bar-top.uppercase.text-primary.font-d.text-2xl.leading-7.py-2
  .flex.justify-between.h-5
    .left.date
      | {{ config.dates }}
    .middle.tickets.text-center
      a(:href='config.tickets.link' target='_blank' class="hover_underline")
        | {{ config.tickets.title }}
    .right.location.text-right 
      | {{ config.location }}
</template>
