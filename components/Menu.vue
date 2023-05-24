<template lang="pug">
#menu.bg-primary2
  .inner.flex.justify-between.text-xl.pt-2
  
    .left.w-10x12
      nav(v-if='data && data.menu')#main.flex.justify-between.w-full
        .item(v-for='(item, i) in data.menu.main' :key='i', :class='{ disabled: ! item.enable }')
          a(:href='parseLink(item.link.url)', v-if='item.enable').hover_text-green {{ item.title }} 
          span(v-else) {{ item.title }}
    
    .right.w-2x12.text-right
      nav#more
        button.hover_text-green
          .flex
            .text-mediumpurple.pr-2 ++
            span more
            .text-mediumpurple.pl-1 ++
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
$orange: #FF5701

#menu
  a, span  
    text-shadow: -1px -1px 0 $orange, 1px -1px 0 $orange, -1px 1px 0 $orange, 1px 1px 0 $orange

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
  &.disabled
    opacity: 0.4
</style>