<script setup>
const { client } = usePrismic()
const data = reactive({})

const { data: logo } = await useAsyncData('logo', () => client.getByType('homepage'))

watchEffect(() => {
  data.logo = logo.value?.results?.[0]?.data?.logo
})
</script>


<template lang="pug">
#logo.flex.justify-center.pt-4
  nuxt-link(to="/")
    nuxt-img(:src="data?.logo?.url" :alt="data?.logo?.alt" width="1000" class='lg_w-[370px]').w-full
</template>
