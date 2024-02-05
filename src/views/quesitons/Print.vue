<template>
  <div class="flex flex-col overflow-hidden" v-for="d, key in data" :key="key">
    <pagex  class="w-full flex flex-wrap" size="A4">
      <div class="w-1/2 flex bg-gray-200 min-h-max h-40 border border-dashed border-gray-800 p-3" v-for="i in d" :key="i.id">
        <div class="h-full w-full bg-white rounded-lg p-2 relative">
          <div class="text-lg">
            {{ i.description}}
          </div>
          <div class="absolute bottom-1 left-1">
            <img :src="i.img" class="h-14" alt="">
          </div>
          <div class="absolute bottom-1 right-1 text-sm font-bol bg-gray-200 px-2 py-1 rounded-lg">{{i.point || 100}}</div>
        </div>
      </div>
    </pagex>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import useQuesitons from "../../compositions/useModelQuesitons";
const { quesitonsLoading, quesitonsData, getQuesitonss} = useQuesitons();
const data = ref([])
const maxItem = ref(14); //14

onMounted(() => {
  getQuesitonss().then(res => {
    res.map(i => {
      let dataLength = data.value.length
      if (dataLength == 0) data.value.push([])

      if (data.value[data.value.length - 1].length != maxItem.value) {
        data.value[data.value.length - 1].push(i)
      }else{
        data.value.push([])
        data.value[data.value.length - 1].push(i)
      }

    })
  })
});


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
