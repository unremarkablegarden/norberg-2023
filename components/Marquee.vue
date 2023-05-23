<template lang="pug">
#marquee.flex.gap-4.w-full.overflow-x-auto
  .name.bg-black.text-green.text-2xl.whitespace-nowrap(v-for='(name, i) in [1,2,3,4,5,6,7,8]') Artist Name
</template>