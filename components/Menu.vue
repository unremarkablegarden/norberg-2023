<template lang="pug">
#menu.bg-primary2(v-if='data && data.menu').pt-0.md_pt-2
  
  .item(v-if='showMenu').close.block.md_hidden.whitespace-nowrap.text-5xl.font-d.fixed.top-2.right-2.z-50
    button(@click='showMenu = false') ✕
  
  .mobile-toggle(:class="{ 'hidden': showMenu, 'block md_hidden': !showMenu }").flex.justify-end.w-full.text-xl.mt-2.-mb-4.relative.z-50
    button(@click='showMenu = !showMenu') + menu
  
  .inner(:class="{ 'hidden md_flex': !showMenu, 'block': showMenu }").justify-between.fixed.md_relative.top-0.left-0.right-0.bottom-0.z-40.pt-16.md_pt-0.bg-primary.md_bg-transparent.text-4xl.md_text-xl.lg_text-2xl.2xl_text-3xl
    //- .backdrop-blur-md.md_backdrop-blur-none.
    //- 
    
    .left(:class="{ 'w-full md_w-full': !data.more_count, 'w-full md_w-10x12': data.more_count }")
      nav(v-if='data && data.menu')#main.flex.md_justify-between.w-full.flex-wrap
        
        .item(
          v-for='(item, i) in data.menu.main' 
          :key='i' 
          :class='{ disabled: ! item.enable }' 
          @click='showMenu = false'
        ).whitespace-nowrap.w-full.md_w-auto.text-center.md_text-left
          
          template(v-if='item?.link?.link_type === "Web"')
            a(:href='parseLink(item.link.url)').hover_text-green {{ item.title }}
          template(v-else)
            prismic-link(:field='item.link').hover_text-green {{ item.title }}
    
    .right.md_w-1x12.text-center.md_text-right(v-if='data.more_count')
      nav#more
        button(@click='data.open_more = !data.open_more').hover_text-green
          .flex
            .text-mediumpurple.pr-2 ++
            span more
            .text-mediumpurple.pl-1 ++
            
        .more-menu(v-if='data && data.open_more').pt-2.md_absolute.w-full.md_w-auto.md_right-0
          .item(
            v-for='(item, i) in data.menu.more' 
            :key='i' 
            :class='{ disabled: ! item.enable }'
          ).whitespace-nowrap
            template(v-if='item?.link?.link_type === "Web"')
              a(:href='parseLink(item.link.url)', v-if='item.enable').hover_text-green {{ item.title }}
            template(v-else)
              prismic-link(:field='item.link', v-if='item.enable').hover_text-green {{ item.title }}
    
</template>


<script setup>
const { client } = usePrismic()
const data = reactive({})
// const showMenu = ref(true)
const showMenu = ref(false)
const { data: menu } = await useAsyncData('menu', () => client.getByType('menu'))

watchEffect(() => {
  data.menu = menu.value?.results?.[0]?.data
  data.more_count = data?.menu?.more?.filter(item => item?.enable === true).length > 0 ? true : false
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
  a, span, button
    text-shadow: 0px 0px 4px $orange
    // text-shadow: -1px -1px 0 $orange, 1px -1px 0 $orange, -1px 1px 0 $orange, 1px 1px 0 $orange

#menu #main .item
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
    // opacity: 0.4
    display: none
#menu #main .item.close
  margin-top: 3rem
  &:before, &:after
    content: ' ' !important
</style>