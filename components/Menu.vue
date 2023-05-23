<template lang="pug">
#menu
  .inner.flex.justify-between.text-xl.pt-2
  
    .left.w-10x12
      nav(v-if='data && data.menu')#main.flex.justify-between.w-full
        .item(v-for='(item, i) in data.menu.main' :key='i')
          a(:href='parseLink(item.link.url)') {{ item.title }} 
    
    .right.w-2x12.text-right
      nav#more
        button 
          span.text-mediumpurple.pr-2 ++
          span more
          span.text-mediumpurple.pl-1 ++
        //- pre {{ data.menu.more }}
    
</template>


<script setup>
const { client } = usePrismic()
const data = reactive({})
const { data: menu } = await useAsyncData('menu', () => client.getByType('menu'))

watchEffect(() => {
  data.menu = menu.value?.results?.[0]?.data
})

const parseLink = (link) => {
  if (link.startsWith('https:///')) {
    return link.slice(8)
  } else {
    return link
  }
}
</script>


<style lang="sass" scoped>
  #menu #main .item
    // font-size: 1.375rem
    &:before, &:after
      font-family: 'D'
      color: #9886E5
    &:before
      content: '<'
      padding-right: 0.4rem
    &:after
      content: '>'
      padding-left: 0.3rem
</style>