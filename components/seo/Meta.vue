<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description"/>
  </Head>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Norbergfestival'
  },
  description: {
    type: String,
    default: '6–8 July 2023'
  }
})

// https://nuxt.com/docs/getting-started/seo-meta
// useHead
// useSeoMeta
// useServerSeoMeta
</script>