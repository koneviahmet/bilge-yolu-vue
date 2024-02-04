<template>
  <div>

  <div class="overflow-x-auto p-4">
    <div class="flex items-end justify-end w-full">
      <button class="btn btn-sm" @click="confirmDeleteAll()">Tümünü Sil</button>
    </div>

    <table class="table w-full">
      <thead>
        <tr>
          <th>ITEM</th> 
          <th>OPTIONS</th>
        </tr>
      </thead> 
      <tbody>
        <tr v-for="item in quesitonsData" :key="item.id">
          <th class="w-full">{{item.description}}</th> 
          <th>{{item.img}}</th> 
          <td class="flex space-x-1">
            <button @click="editBTN(item.id)" class="btn btn-sm">Düzenle</button>
            <a class="btn btn-error btn-sm" @click="itemDelete(item)" :class="quesitonsLoading && 'loading btn-disabled'">Sil</a>    
          </td> 
        </tr>
      </tbody>
    </table>
  </div>


  </div>
</template>

<script setup>
import { getCurrentInstance, defineEmits, onMounted } from "vue";
import useQuesitons from "../../compositions/useModelQuesitons";
const { quesitonsLoading, quesitonsData, quesitonsError, getQuesitonss, deleteQuesitons, confirmDeleteAll} = useQuesitons();

const emit = defineEmits(["edit"])

onMounted(() => getQuesitonss());

const editBTN = (id) => {

  emit('edit', null)
  setTimeout(() => emit('edit', id), 100);
};

const itemDelete = (item) => {
  deleteQuesitons(item)
};
</script>

