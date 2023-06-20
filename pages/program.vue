<template lang="pug">
SeoMeta(title='Program')

#program
  .logo-spacer.h-36.md_h-40.lg_h-48
  
  .days-menu.flex.gap-8.mb-16
    .day(
      v-for='(d, i) in datesObjects' :key='i' 
      @click='selectedDay = d.date' 
      :class='{ "bg-mediumpurple": selectedDay === d.date }'
    )
      template(v-if='d.date !== "July 9"')
        .title.text-5xl.cursor-pointer.px-2.py-1.border.border-2 {{ d.date }}
      //- .md_flex.justify-between.items-center
        .title.mb-8.mt-2.md_mt-4.md_mb-12.lg_mb-20.lg_mt-10.text-4xl.md_text-6xl.lg_text-7xl.xl_text-8xl.2xl_text-8xl.text-center.md_text-left.relative
          UiPageTitle(:width='pageWidth') {{ d.date }}
  
  .days
    .day(v-for='(d, i) in datesObjects' :key='i', :class='{ "hidden": selectedDay !== d.date }')
      
      .locations.flex.w-full.bg-darkgrey.pt-3.border-2.border-darkpurple
        .location(v-for='(l, i2) in locations').w-1x4
      
          h3.font-a.text-2xl.pb-3.text-center.border-b-2.border-darkpurple {{ l }}
          
          .events.border-darkpurple(
            class='h-[920px]'
            :class='{ "border-l-2": i2 > 0, "pl-[2px]": i2 === 0 }'
          )
            
            
            .event.absolute(
              v-for='(e, j) in d.locations.find(loc => loc.location === l)?.events' 
              :key='e.id'
              :style='{ "z-index": 100-j }'
            )
            
              nuxt-link(:to='"/artist/" + e.slugs[0]')
                
                .font-d.border-2.border-darkgreen.bg-green.overflow-hidden.px-3.py-3.hover_border-darkpurple.hover_bg-purple(
                  :style='{ "height": e.data?.duration ? (e.data?.duration * 1.5) + "px" : 70 + "px", "width": (pageWidth / 4) -3 + "px", "margin-top": (e.data?.timeOffset * 1.5) + "px" }'
                  :class='{ "bg-purple": ! e.data?.duration }'
                )
                  .meta.text-sm.mb-1.opacity-50
                    //- pre {{ pageWidth }}
                    span.start {{ e.data?.hour }}:{{ e.data?.minute }} — 
                    span.end {{ e.data?.endTime }}
                    //- span.opacity-40.text-sm.ml-2 &nbsp;({{ e.data?.formattedDuration }})
                    //- div.text-xs
                      //- span {{ e.data?.date }} / 
                      //- span {{ e.data?.location }} /
                      //- span d: {{ e.data?.duration }} / 
                      //- span o: {{ e.data?.timeOffset }}
                      //- div {{ e.id }}
                    
                  span.font-d.text-lg.mr-1 {{ $prismic.asText(e.data?.title) }}
                  span.text-xs.opacity-50 {{ e.data?.type }}
                  
                  pre(v-if='e.data?.offsite') {{ e.data.offsite }}
                  pre(v-if='e.data?.google_map && e.data?.google_map.link_type !== "Any"') {{ e.data.google_map }}
                  pre(v-if='e.data?.info?.length') {{ e.data.info }}
  
  
    
  .bottom-spacer.h-64.md_h-72.lg_h-80
              
</template>

<script setup>
definePageMeta({
  layout: "program"
})

const { client } = usePrismic()
const data = reactive({})
const selectedDay = ref('July 6')

const { data: docs } = await useAsyncData('docs', () => client.getByType('program', 
{ pageSize: 100 }))

const locations = [
  'Mimer',
  'Kraftcentralen',
  '303',
  'Krossverket',
  // 'Off-site',
  // 'Radio'
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
// const startHour = 12
const startHour = 17

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

const pageWidth = ref(0)
const titleEl = 'program'

onMounted(() => {
  pageWidth.value = document.getElementById(titleEl).offsetWidth
  
  window.addEventListener('resize', () => {
    pageWidth.value = document.getElementById(titleEl).offsetWidth
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    pageWidth.value = document.getElementById(titleEl).offsetWidth
  })
})

</script>