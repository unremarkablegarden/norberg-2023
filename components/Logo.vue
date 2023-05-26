<template lang="pug">
#logo(
  :style='"opacity: " + logoOpacity'
  :class="{ 'z-40': ! logoHide, 'z-0': logoHide }"
).sticky.top-0
  .flex.justify-center.pt-4.pb-4
    nuxt-link(to="/")
      nuxt-img(:src="data?.logo?.url" :alt="data?.logo?.alt" width="1000" class='w-[370px]')

</template>
  
<script setup>
const { client } = usePrismic()
const data = reactive({})

const { data: logo } = await useAsyncData('logo', () => client.getByType('homepage'))

watchEffect(() => {
  data.logo = logo.value?.results?.[0]?.data?.logo
})

// watch scroll amount from top of screen
const scrollY = ref(0)
const logoOpacity = ref(1)
const logoHide = ref(false)
onMounted(() => {
  window.addEventListener('scroll', () => {
    scrollY.value = window.scrollY
    const max = 300
    logoOpacity.value = (1 - (scrollY.value / max)) > 0 ? (1 - (scrollY.value / max)) : 0
    
    if (logoOpacity.value === 0) {
      logoHide.value = true
    } else {
      logoHide.value = false
    }
  })
  
})
// remove on unmout
onUnmounted(() => {
  window.removeEventListener('scroll', () => {
    scrollY.value = window.scrollY
  })
})
</script>
