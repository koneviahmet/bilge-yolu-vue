<template>
  <div>

  <div class="overflow-x-auto p-4">
    <div class="flex space-x-2 justify-end w-full">
      <router-link to="/" class="btn btn-sm">Oyunlar</router-link>      
      <router-link to="/quesitons/money" class="btn btn-sm">Puanlar</router-link>       
      <router-link to="/quesitons/print" class="btn btn-sm">Yazdır</router-link>       
      <button class="btn btn-sm" @click="confirmDeleteAll()">Tümünü Sil</button>
      <button class="btn btn-sm" @click="addQuesitonsAll()">Tümünü Ekle</button>
    </div>

    <div class="p-2 flex flex-col-reverse">
      
      <div class="border bg-white p-2 mb-2" v-for="item, k in quesitonsData" :key="item.id">
        <div class="flex">
          <div class="w-full font-bold">{{k + 1}} - {{ item.point }}</div>
          <div class="flex space-x-1 p-2">
            <button @click="editBTN(item.id)" class="btn btn-sm">D</button>
            <a class="btn btn-error btn-sm" @click="itemDelete(item)" :class="quesitonsLoading && 'loading btn-disabled'">S</a>    
          </div>
        </div>
        <div class="flex">
          <div class="m-2" v-if="item.img">
            <img :src="item.img" class="h-12" srcset="">
          </div>
          <div class="w-full">{{item.description}}</div>
        </div>
      </div>
    </div>
  </div>



  </div>
</template>

<script setup>
import { getCurrentInstance, defineEmits, onMounted } from "vue";
import useQuesitons from "../../compositions/useModelQuesitons";
import dataQuestions from './data/questions.json'

const { quesitonsLoading, quesitonsData, quesitonsError, getQuesitonss, deleteQuesitons, confirmDeleteAll, addQuesitons} = useQuesitons();

const emit = defineEmits(["edit"])
onMounted(() => getQuesitonss());

const editBTN = (id) => {
  emit('edit', null)
  setTimeout(() => emit('edit', id), 100);
};

const itemDelete = (item) => {
  deleteQuesitons(item)
};


const addQuesitonsAll = async () => {
  for await (const q of dataQuestions) addQuesitons(q)
}





</script>

