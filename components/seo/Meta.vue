<template lang="pug">
Head  
  Title {{ renderTitle(title) }}
  //- Meta(name="title", :content="title")
  Meta(name="og:title", :content="renderTitle(title)")
  Meta(name="twitter:title", :content="renderTitle(title)")

  Meta(name="description", :content='description')
  Meta(name="og:description", :content='description')
  Meta(name="twitter:description", :content='description')
  
  Meta(name="og:image", :content="image")
  Meta(name="twitter:image", :content="image")
  
  Meta(name="twitter:card", content="summary_large_image")
  Meta(name="og:url", :content='url')
  Meta(name="og:site_name", :content="config.title")
  Meta(name="og:type", content="website")

  Meta(name="canonical", :content="url")

</template>

<script setup>
const config = useAppConfig()
const route = useRoute()
// const routeSlug = route.params.slug ? route.params.slug[0] : ''
const url = ref( 'https://www.norbergfestival.com' + route.fullPath)

const props = defineProps({
  title: {
    type: String,
    default: 'Norbergfestival ~ 6–8 July 2023'
  },
  description: {
    type: String,
    default: 'Norbergfestival is a 24-year running festival, held on the abandoned iron mine site of Mimerlaven in Norberg, Sweden. A growing group of artists present contemporary music, performances and interdisciplinary works. We make use of what the site provides, and we sleep on the ground. We extract what we produce and leave the mine as it was retired in 1981.'
  },
  image: {
    type: String,
    default: 'https://images.prismic.io/norbergfestival-2023/3fdd4f71-a01f-400f-84fa-ae958696a0a3_332976138_1326849398099883_926559151918573035_n.jpeg?auto=compress,format'
  },
})

const renderTitle = (title) => {
  const add = 'Norbergfestival ~ 6–8 July 2023'
  if (title !== add) return title + ' | ' + add
  else return title
}

</script>