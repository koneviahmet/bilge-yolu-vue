<template>
  <div class="flex flex-col overflow-hidden" v-for="d, key in data" :key="key">
    <pagex  class="w-full flex flex-wrap" size="A4">
      <div class="w-1/2 flex bg-gray-300 min-h-max h-40 border border-dashed p-3" v-for="i in d" :key="i.id" :class="` bg-${i.color} `">
        <div class="h-full w-full bg-white rounded-lg flex flex-col items-center justify-center space-y-2">

          <div><img :src="i.img" class="h-14" alt=""></div>
          <div class="px-2 py-1 rounded-lg" :class="`bg-${i.color}`">{{ i.value }}</div>
          
        </div>
      </div>
    </pagex>
  </div>
</template>

<script setup>
import {onMounted, ref, computed} from "vue";
import useQuesitons from "../../compositions/useModelQuesitons";
const { quesitonsLoading, quesitonsData, getQuesitonss} = useQuesitons();

const maxItem = ref(14); //14


const data = computed(() => {
  const newData = []
  const filterData = []

  //kasadan puan alın
  for (let i = 0; i < 7; i++) {
      newData.push({
        color: 'blue-300',
        value: `Kasadan ${(i + 1) * 100} puan alın`,
        img: '/smile.png'
      })
  }

  for (let i = 0; i < 7; i++) {
      newData.push({
        color: 'red-300',
        value: `Kasaya ${(i + 1) * 100} puan verin`,
        img: '/sad.png'
      })
  }


  for (let i = 0; i < 14 * 5; i++) {
      newData.push({
        color: 'green-300',
        value: `100 Puan`,
        img: '/point.png'
      })
  }


  for (let i = 0; i < 14 * 4; i++) {
      newData.push({
        color: 'blue-300',
        value: `200 Puan`,
        img: '/point.png'
      })
  }


  for (let i = 0; i < 14 * 3; i++) {
      newData.push({
        color: 'yellow-300',
        value: `500 Puan`,
        img: '/point.png'
      })
  }



  for (let i = 0; i < 14 * 2; i++) {
      newData.push({
        color: 'purple-300',
        value: `1000 Puan`,
        img: '/point.png'
      })
  }


  newData.map(i => {
      let dataLength = filterData.length
      if (dataLength == 0) filterData.push([])

      if (filterData[filterData.length - 1].length != maxItem.value) {
        filterData[filterData.length - 1].push(i)
      }else{
        filterData.push([])
        filterData[filterData.length - 1].push(i)
      }
    })


  return filterData
})




</script>


<style scoped>


@page {
  size: A4;
  margin: 0;
}
pagex[size="A4"] {
  background: white;
  width: 21cm;
  height: 29.7cm;
  margin: 0 auto;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
  
  
}
@media print {

  body, pagex[size="A4"] {
    margin: 0cm;
    box-shadow: 0;
  }
}


</style>

