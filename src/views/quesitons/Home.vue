<template>
  <div class="flex">
    <div class="w-1/3">
      <Update v-if="editId" :id="editId" @id="editId = null"/>
      <Create v-else/>
    </div>
    <div class="w-2/3"><List @edit="editId = $event"/></div>
  </div>
</template>

<script setup>

import {ref} from 'vue'
import Create from "./components/form/create.vue";
import Update from "./components/form/update.vue";
import List from "./List.vue";
const tab = ref('add')
const editId = ref(null)

</script>


