<template lang="pug">
#logo(
  :style='"transform: scale("+scrollScale+")"'
).sticky.top-0.md_top-12.z-40.pt-10.origin-top
  //- .md_origin-center
  
  //- .flex.w-full.justify-center.text-center.w-full.absolute.border
  .absolute(class='left-[50vw] -translate-x-[50%]')
    nuxt-link(to="/")
      nuxt-img(
        :src="data?.logo?.url" 
        :alt="data?.logo?.alt" 
        width="1000"
        class="w-[80vw] max-w-[370px] md_max-w-none md_w-[350px] xl_w-[400px] 2xl_w-[500px]"
      ).logo-img

</template>

<style lang="sass">
// .logo-img
//   width: 250px
.index .logo-img
  @media (max-width: 767px)
    width: 90vw
  @media (min-width: 768px)
    width: 370px
</style>
  
<script setup>
const { client } = usePrismic()
const data = reactive({})

const { data: logo } = await useAsyncData('logo', () => client.getByType('homepage'))

watchEffect(() => {
  data.logo = logo.value?.results?.[0]?.data?.logo
})

// watch scroll amount from top of screen
const scrollY = ref(0)
const scrollScale = ref(1)

onMounted(() => {
  function updateScrollScale() {
    scrollY.value = window.scrollY

    const max = 666
    const scaleMin = 0.55

    // as you scroll down, scale down the logo, from 1.0 to 0.5 over "max" scrollY pixels
    scrollScale.value = (1 - (scrollY.value / max)) > scaleMin ? (1 - (scrollY.value / max)) : scaleMin
  }

  function handleScroll () {
    requestAnimationFrame(updateScrollScale)
  }

  // Bind the handleScroll function to the scroll event
  window.addEventListener('scroll', handleScroll)
})
  
</script>
