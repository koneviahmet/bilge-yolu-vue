<template>

<div>
  <!-- header -->
  <div class="flex justify-between p-2 z-50" v-if="game != 0">
    <div>
      <button class="btn btn-sm" @click="game = 0">Geri</button>
    </div>
    <div class="w-full flex items-end justify-end">
      <router-link to="/quesitons" class="btn btn-sm">Soru Hazırla</router-link>
    </div>
  </div>

  <div>
    <Home :games="games" @game="game = $event" v-if="game == 0"/>
    <!--Bilge yolu oyunu-->
    <BilgeYolu :studentCount="studentCount" v-if="game == 1"/>
    <!--Tek kişilik klasik seçme oyunu-->
    <Game1 :studentCount="studentCount" v-if="game == 2"/>
    <!--İki kişilik klasik seçme oyunu-->
    <Game2 :studentCount="studentCount" v-if="game == 3"/>
    <!--futbol oyunu-->
    <Game3 :studentCount="studentCount" v-if="game == 4"/> 
    <!--Çiçek oyunu-->
    <Game4 :studentCount="studentCount" v-if="game == 5"/>
    <!--Kedi Yakalama Oyunu-->
    <Game5 :studentCount="studentCount" v-if="game == 6"/>
  </div>
</div>
</template>


<script setup>
import {ref} from 'vue'

import Home from './games/index.vue'
import BilgeYolu from './games/bilge_yolu/game.vue'
import Game1 from './games/game1/game.vue'
import Game2 from './games/game2/game.vue'
import Game3 from './games/game3/game.vue'
import Game4 from './games/game4/game.vue'
import Game5 from './games/game5/game.vue'

const studentCount = ref(24)
const game = ref(5)

const games = [
  {
    id: 1,
    title: "Bilge Yolu",
    desc: "Bilge yolu oyunu"
  },
  {
    id: 2,
    title: "Oyun 1",
    desc: "Tek kişilik klasik seçme oyunu"    
  },
  {
    id: 3,
    title: "Oyun 2",
    desc: "İki kişilik klasik seçme oyunu"
  },
  {
    id: 4,
    title: "Oyun 3",
    desc: "Futbol oyunu"
  },
  {
    id: 5,
    title: "Oyun 4",
    desc: "Çiçek oyunu"
  },
  {
    id: 6,
    title: "Oyun 5",
    desc: "Kedi yakalama oyunu"
  }
]



</script>