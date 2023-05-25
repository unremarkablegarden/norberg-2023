<template lang="pug">
#menu.bg-primary2
  .inner.flex.justify-between.text-xl.pt-2
  
    .left(:class="{ 'w-full': !data.more_count, 'w-10x12': data.more_count }")
      nav(v-if='data && data.menu')#main.flex.justify-between.w-full.flex-wrap
        .item(v-for='(item, i) in data.menu.main' :key='i', :class='{ disabled: ! item.enable }').whitespace-nowrap
          template(v-if='item?.link?.link_type === "Web"')
            a(:href='parseLink(item.link.url)', v-if='item.enable').hover_text-green {{ item.title }}
          template(v-else)
            prismic-link(:field='item.link', v-if='item.enable').hover_text-green {{ item.title }}
          
    
    .right.w-2x12.text-right(v-if='data.more_count')
      nav#more
        button(@click='data.open_more != data.open_more').hover_text-green
          .flex
            .text-mediumpurple.pr-2 ++
            span more
            .text-mediumpurple.pl-1 ++
        .more-menu(v-if='data && data.open_more')
          .item(v-for='(item, i) in data.menu.more' :key='i', :class='{ disabled: ! item.enable }').whitespace-nowrap
            template(v-if='item?.link?.link_type === "Web"')
              a(:href='parseLink(item.link.url)', v-if='item.enable').hover_text-green {{ item.title }}
            template(v-else)
              prismic-link(:field='item.link', v-if='item.enable').hover_text-green {{ item.title }}
    
</template>


<script setup>
const { client } = usePrismic()
const data = reactive({})
const { data: menu } = await useAsyncData('menu', () => client.getByType('menu'))

watchEffect(() => {
  data.menu = menu.value?.results?.[0]?.data
  data.more_count = data.menu.more.filter(item => item?.enable === true).length > 0 ? true : false
  data.open_more = false
})


const parseLink = (link) => {
  if (link && link.startsWith('https:///')) {
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