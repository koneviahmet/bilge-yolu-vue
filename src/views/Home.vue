<template>
<div>
  
  <div v-if="game == 0">
      <button class="btn btn-sm fixed right-3 bottom-3" 
      @click="fullscreen = !fullscreen">{{ !fullscreen ? 'Tam Ekran' : 'Kapat' }}
    </button>
  </div>

  <!-- header -->
  <div class="flex justify-between p-2 z-50 fixed" v-if="game != 0">
    <div>
      <button class="btn btn-sm" @click="game = 0">Geri</button>
    </div>
  </div>

  <fs v-model="fullscreen" class="h-full w-full select-none bg-white">
    <Home :games="games" @game="game = $event" :studentCount="studentCount"  @student_count="studentCount = $event"  v-if="game == 0"/>
    
    <!--Bilge yolu oyunu-->
    <BilgeYolu :studentCount="studentCount" v-if="game == 1"/>

    <!--Tek kişilik klasik seçme oyunu-->
    <Game1 :studentCount="studentCount" :questions="questions" v-if="game == 2"/>

    <!--İki kişilik klasik seçme oyunu-->
    <Game2 :studentCount="studentCount" v-if="game == 3"/>

    <!--futbol oyunu-->
    <Game3 :studentCount="studentCount" :questions="questions" v-if="game == 4"/> 

    <!--Çiçek oyunu-->
    <Game4 :studentCount="studentCount" v-if="game == 5"/>


    <!--Kedi Yakalama Oyunu-->
    <Game5 :studentCount="studentCount" :questions="questions" v-if="game == 6"/>

    <div class="h-screen" v-if="game == 7">
      <Bilgiyarismasi  />
    </div>
  </fs>

</div>
</template>


<script setup>
import { Application } from 'vue3-pixi'
// import Sprite from './sprite/index.vue'
import useQuesitons from "../compositions/useModelQuesitons";
const { quesitonsLoading, quesitonsData, getQuesitonss} = useQuesitons();

import {ref, onMounted} from 'vue'
import Home from './games/index.vue'
import BilgeYolu from './games/bilge_yolu/game.vue'
import Game1 from './games/game1/game.vue'
import Game2 from './games/game2/game.vue'
import Game3 from './games/game3/game.vue'
import Game4 from './games/game4/game.vue'
import Game5 from './games/game5/game.vue'
import Bilgiyarismasi from './games/bilgi_yarismasi/indexx.vue'



const studentCount = ref(24)
const game = ref(0)
const fullscreen = ref(false)

const questions = ref([])

onMounted(() => {
  getQuesitonss().then(res => questions.value = res)
});




const games = [
  {
    id: 1,
    title: "Oyun 1",
    desc: "Bilge yolu oyunu"
  },
  {
    id: 2,
    title: "Oyun 2",
    desc: "Tek kişilik klasik seçme oyunu"    
  },
  {
    id: 3,
    title: "Oyun 3",
    desc: "İki kişilik klasik seçme oyunu"
  },
  {
    id: 4,
    title: "Oyun 4",
    desc: "Futbol oyunu"
  },
  {
    id: 5,
    title: "Oyun 5",
    desc: "Çiçek oyunu"
  },
  {
    id: 6,
    title: "Oyun 6",
    desc: "Kedi yakalama oyunu"
  },
  {
    id: 7,
    title: "Oyun 7",
    desc: "Bilgi yarışması"
  }
]



</script>