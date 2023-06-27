<template lang="pug">
SeoMeta(title='Program')

#program
  .logo-spacer.h-36.md_h-40.lg_h-48
  
  .md_flex.items-end
    .headingg.md_w-1x2
      .md_flex.justify-between.items-center
      .title.mb-8.mt-2.md_mt-4.md_mb-12.lg_mb-20.lg_mt-10.text-4xl.md_text-6xl.lg_text-7xl.xl_text-8xl.2xl_text-8xl.text-center.md_text-left.relative
        UiPageTitle(:width='pageWidth/2') Program
        
    .days-menu.md_w-1x2.flex.md_mb-16.md_pb-8.md_justify-end
      .day(
        v-for='(d, i) in datesObjects' :key='i' 
        @click='setDay(d.date)' 
      )
          //- nuxt-link(:to='"/program/" + slugify(d.date)')
          
          template(v-if='d.date !== "July 9"')
            .title.cursor-pointer.mx-3.md_ml-6.md_mr-0
              img(
                :src='"/gfx/button_date-tab-"+(i+1)+"-" + (selectedDay === d.date ? "active" : "inactive") + ".svg"'
                :style='{ "width": buttonWidth + "px" }'
              )

  .days
    .day(v-for='(d, i) in datesObjects' :key='i', :class='{ "hidden": selectedDay !== d.date }')
      
      .locations.md_flex.w-full.bg-orangeX.pt-3
        .location(v-for='(l, i2) in locations').md_w-1x4.border-darkpurple
      
          .title.text-2xl.text-center.relative.mb-6.mt-8._md_mt-0.sticky.top-24.md_top-48.z-50.Xbg-orange
            UiPageTitle(:width='pageWidth/div') {{ l }}
          
          .events.border-black.Xmd_border-r.Xmd_border-l.border-t-4.border-b(
            class='md_h-[2074px]'
          )

            .event.md_absolute.z-20(
              v-for='(e, j) in d.locations.find(loc => loc.location === l)?.events' 
              :key='e.id'
              :style='{ "z-index": 100-j }'
            )
            
              nuxt-link(:to="e?.data?.artists?.[0]?.artist.slug ? `/artist/${e?.data?.artists?.[0]?.artist.slug}` : `/program`")
                
                .program-box.bg-green.hover_bg-purple.px-3.py-3.shadow-border.bg-cover.bg-center(
                  :style='{ "height": ! $device.isMobile && e.data?.duration ? (e.data?.duration * programHeightMult) + "px" : "auto", "width": ((pageWidth) / (div + (div == 1 ? .01 : .02))) + "px", "margin-top": ! $device.isMobile ? (e.data?.timeOffset * programHeightMult) + "px" : "0px", "background-image": "url("+e.data?.artists?.[0]?.artist?.data?.image?.url+")" }'
                  :class='{ "bg-lightgrey": ! e.data?.duration }'
                )
                  .meta.text-sm.mb-1
                    span.start {{ e.data?.hour }}:{{ e.data?.minute }} — 
                    span.end {{ e.data?.endTime }}
                    span(v-if='!e.data.duration') —Duration undetermined
                    
                  .mr-2
                    UiTitleProgram(:text='$prismic.asText(e.data?.title)' :duration='e.data?.duration') {{ $prismic.asText(e.data?.title) }}
                  
                  div.text-sm.uppercase.mt-1 {{ e.data?.type }}
                  
                  div.text-sm.uppercase.mt-3(v-if='e.data?.offsite') {{ e.data.offsite }}
                  //- pre(v-if='e.data?.google_map && e.data?.google_map.link_type !== "Any"') {{ e.data.google_map }}
                  div.text-sm.uppercase.mt-3(v-if='e.data?.info?.length') {{ e.data.info }}
                  //- pre {{ e.data }}
    
  .bottom-spacer.h-32
              
</template>


<script setup>
definePageMeta({
  layout: "program"
})
const { client } = usePrismic()
const data = reactive({})

const slugify = (str) => str.toLowerCase().replace(/ /g, '-')
const titleify = (str) => str.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')

const selectedDay = ref('July 6')

const { params } = useRoute()
const slug = params.slug

if (slug) selectedDay.value = titleify(slug)
else selectedDay.value = 'July 6'

const setDay = (date) => {
  selectedDay.value = date
  // update URL softly
  window.history.pushState({}, '', `/program/${slugify(date)}`)
}


const { data: docs } = await useAsyncData('docs', () => client.getByType('program', 
{ pageSize: 100, fetchLinks: 'artist.image' }))

const locations = [
  'Mimer',
  'Kraftcentralen',
  '303',
  'Krossverket',
  'Off-site',
  'Radio'
]


// get just the dates
let dates = [...new Set(docs.value?.results?.map(doc => doc.data.date))]
dates = dates.filter(date => date)
dates.sort((a, b) => {
  const aDate = new Date(a)
  const bDate = new Date(b)
  return aDate - bDate
})

const sortByTime = (events) => {
  return events.sort((a, b) => {
    const aDate = new Date(a.data.date)
    const bDate = new Date(b.data.date)
    const aTime = new Date(aDate.getFullYear(), aDate.getMonth(), aDate.getDate(), a.data.hour, a.data.minute)
    const bTime = new Date(bDate.getFullYear(), bDate.getMonth(), bDate.getDate(), b.data.hour, b.data.minute)
    return aTime - bTime
  })
}

let datesObjects = dates.map(date => {
  const dateObject = {}
  dateObject.date = date
  dateObject.events = docs.value?.results?.filter(doc => doc.data.date === date)
  dateObject.events = sortByTime(dateObject.events)
  return dateObject
})



// loop through datesObjects, look at the events array, if the event parseInt(hour) is less than 9, move it to the previous date's events array, and remove it from the current date's events array 

datesObjects.forEach((dateObject, index) => {
  dateObject?.events?.forEach((event, i) => {
    if (event?.data?.hour) {
      const h = parseInt(event.data.hour)
      const startTimeNextDay = 9
      
      if (h < startTimeNextDay) {
        const obj = datesObjects[index - 1]
        
        if (obj) {
          const moveEvent = datesObjects[index].events.find(e => e.id === event.id)
          obj.events.push(moveEvent)
        
          // filter out event with id event.id from current dateObjects
          datesObjects[index].events = datesObjects[index].events.filter(e => e.id !== event.id)
        }
      }
    }
  })
})


// sort again, because we moved some events around
datesObjects.forEach((dateObject, i) => {
  dateObject.events = sortByTime(dateObject.events)
})



// loop through the dateObjects, and move all the entries in the events array into a dateObject.location based on the event.data.location

datesObjects.forEach((dateObject, i) => {
  dateObject.locations = []
  dateObject.events.forEach((event, i) => {
    const location = event.data.location
    const locationObject = dateObject.locations.find(locationObject => locationObject.location === location)
    if (locationObject) {
      locationObject.events.push(event)
    } else {
      dateObject.locations.push({
        location,
        events: [event]
      })
    }
  })
})



// loop through the dateObjects, and for each event, calculate the end time, from the hour and minute, and the duration, add it to .endTime as HH:mm. add the nice time format as formattedDuration, so from for example from 70 to 1:10

datesObjects.forEach((dateObject, i) => {
  dateObject.locations.forEach((locationObject, i) => {
    locationObject.events.forEach((event, i) => {
      const hour = parseInt(event.data.hour)
      const minute = parseInt(event.data.minute)
      const duration = parseInt(event.data.duration) ? parseInt(event.data.duration) : 0
      const endTime = new Date(2021, 0, 1, hour, minute + duration)
      const endTimeString = endTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      event.data.endTime = endTimeString
      const formattedDuration = `${Math.floor(duration / 60)}:${duration % 60 < 10 ? '0' : ''}${duration % 60}`
      event.data.formattedDuration = formattedDuration
      
    })
  })
})


// loop through dateObjects, and for each event, calculate the timeOffset, from the hour and minute, and the duration, as minutes from 12:00, and add it to .timeOffset. treat 00:00 as 24:00

// start day at 12
const startHour = 12
// const startHour = 17

datesObjects.forEach((dateObject, i) => {
  dateObject.locations.forEach((locationObject, i) => {
    locationObject.events.forEach((event, i) => {
      const hour = parseInt(event.data.hour) < 9 ? parseInt(event.data.hour) + 24 : parseInt(event.data.hour)
      const minute = parseInt(event.data.minute)
      // const duration = parseInt(event.data.duration)
      // minutes from 12:00 to hour:minute
      const timeOffset = (hour - startHour) * 60 + minute
      event.data.timeOffset = timeOffset
    })
  })
})






// title stuff
const pageWidth = ref(1000)
const buttonWidth = ref(100)
const programHeightMult = 2.3
const div = ref(6)
const titleEl = 'program'

const resizeHandler = (titleEl) => {
  const el = document.getElementById(titleEl)
  if (el) {
    pageWidth.value = el.offsetWidth
    buttonWidth.value = pageWidth.value / 10
    if (buttonWidth.value < 100) buttonWidth.value = 100
    const tailwindSmBreakpoint = 640
    if (pageWidth.value < tailwindSmBreakpoint) div.value = 1
  }
}

onMounted(() => {
  resizeHandler(titleEl)
  window.addEventListener('resize', () => resizeHandler(titleEl))
})

onUnmounted(() => {
  window.removeEventListener('resize', () => resizeHandler())
})
</script>


<style lang="scss" scoped>
.events {
  // $s: 90px;
  // $s: 120px;
  $s: 138px;
  background-size: $s $s;
  background-image:
    // linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, #CA3702 1px, transparent 1px);
}
.shadow-border {
  box-shadow: 0 0 0 1.5px black;
}
.bg-none {
  background-image: none !important;
}
@media screen and (max-width: 640px) {
  .program-box {
    margin-top: 0 !important;   
  }
}
.program-box {
  background-repeat: no-repeat;
  background-size: 0 0;
  @media screen and (min-width: 640px) {
    &:hover {
      background-size: cover;
      backdrop-filter: blur(2px);
    }
  }
}

</style>