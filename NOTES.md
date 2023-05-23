# Swiper
https://nuxt.com/modules/swiper


# SEO Kit
https://nuxt.com/modules/seo-kit
<script lang="ts" setup>
useSeoMeta({
  title: 'Home',
  description: 'Welcome to my website',
  // reactive example
  ogImage: () => someData.value?.image
})
</script>


# OG Image
https://nuxt.com/modules/og-image


# Prismic
/preview
<script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=norbergfestival-2023"></script>


# Lodash
https://lodash.com/
<script setup>
  const text = useToUpper("it works!");
</script>


# Nuxt Image
https://v1.image.nuxtjs.org/components/nuxt-img
<nuxt-img> drop-in replacement for the native <img> element
<nuxt-picture> drop-in replacement for the native <picture> element.


# Pinia


# Tailwind


# Devices
$device.isDesktop
$device.isMobile
$device.isTablet
$device.isMobileOrTablet
$device.isDesktopOrTablet
$device.isIos
$device.isWindows
$device.isMacOS
$device.isApple
$device.isAndroid
$device.isFirefox
$device.isEdge
$device.isChrome
$device.isSafari
$device.isSamsung
$device.isCrawler

<script setup>
const { isMobile } = useDevice();
</script>

<template>
  <section>
    <div v-if="$device.isDesktop">
      Desktop
