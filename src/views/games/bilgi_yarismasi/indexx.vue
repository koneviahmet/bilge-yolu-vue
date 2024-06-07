<template>
    <LandscapeScreen v-if="screen == 'game' && !phoneScreen.landscape && gamer.length > 1"/>


    <fs v-model="fullscreen" class="h-full w-full select-none" v-else>
        <div class="relative font-multiply flex flex-col h-full w-full bg-repeat bg-center games-elements-bg-repeat">
            <!-- sarkıt -->
            <div class="flex flex-col absolute top-0 left-0 w-full h-2/6 z-0 ">
                <div :class="screen == 'game' || screen == 'result' ? 'h-5/6' : 'h-5/6'" class=" w-full games-elements-bg">
                    <div class="absolute w-full h-full top-0 flex flex-col  items-center justify-center">
                        <h1 class="text-3xl lg:text-7xl  games-elements-text-color-secondery font-bold" 
                        v-if="screen=='home' || screen == 'result'">
                            ÇUMRA BİLSEM
                        </h1>
                    </div>
                </div>
            </div>

            <!-- voice and  full screen-->
            <div class="absolute right-2 bottom-2  z-40">
                <div class="flex justify-center items-center space-x-3">
                    <button @click="screen = 'home'" v-if="screen == 'game'">
                        <ReplyIcon class="w-6 lg:w-8"/>
                    </button>

                    <button @click="volume = !volume">
                        <VolumeUpIcon class="w-6 lg:w-8" v-if="volume"/>
                        <VolumeOffIcon class="w-6 lg:w-8" v-else/>
                    </button>

                    <button @click="fullscreen = !fullscreen">
                        <ArrowsExpandIcon class="w-6 lg:w-8"/>
                    </button>
                </div>
            </div>

            <!-- header -->
            <header class="z-10 bg">
                <div class="lg:p-2 p-2 flex justify-around items-start">
                    <!-- sol -->
                    <div class="w-full"></div>
                    <!-- orta -->

                    <div class="w-full">
                        <!-- timer -->
                        <vue-countdown :time="time*1000" @progress="timerProgressFNC" @end="finishedTime" v-if="screen == 'game'"/>
                    </div>

                    <!-- sağ üst menü -->
                    <div class="w-full"></div>
                </div>

                <div class="rounded-lg px-2" v-if="screen == 'game' && gamer">
                    <FirstProgress :current_time="currentTime" :gamer="gamer" :store_point="getStorePoint" v-if="gamer.length == 1" :max_question="max_question"/>
                    <SecondProgress :current_time="currentTime" :gamer="gamer" v-if="gamer.length == 2"/>
                </div>
            </header>


            <!-- content -->
            <main class="h-full z-10" :class="screen == 'options' && 'overflow-auto'">
                <HomeScreen @screen="setScreenEvent" @start="setStart" :user_level="user_level" :time="time" :level="level" @level="level = $event" v-if="screen == 'home'"/>
                <ResultScreen @score="setStorePoint" :heightScore="heightScore" @screen="setScreenEvent" :max_question="max_question" v-if="screen == 'result'" :gamer="gamer" :time="time"/>

                <div class="flex h-full" v-if="screen == 'game'">
                    <div class="w-full" v-for="(g,key) in gamer" :key="key">
                        <!-- 
                            [{ 'type': 'true', 'items': [...elements['Kolay'][0].items, ...elements['Orta'][0].items, ...elements['Zor'][0].items]},{ 'type': 'true', 'items': [...elements['Kolay'][1].items, ...elements['Orta'][1].items, ...elements['Zor'][1].items]}]
                        -->
           
                        <GameScreen
                            v-if="screen == 'game'"
                            :gamer="g"
                            :time="currentTime"
                            :volume="volume"
                            :elements="data"
                            :level="level"
                            :max_question="max_question"
                            @screen="setScreenEvent"
                            @add_point="addPoint"
                            @time="addTime"
                            :first_multiplier="first_multiplier"
                            :second_multiplier="second_multiplier"
                        />
                    </div>
                </div>
      
                <OptionsScreen
                    v-if="screen == 'options'"
                    @screen="setScreenEvent"
                    :first_multiplier="first_multiplier"
                    :second_multiplier="second_multiplier"
                    :time="time"
                    :volume="volume"
                    @multiplier="setMultiplier"
                />
            </main>
        </div>
    </fs>
</template>

<script setup>
import {ArrowsExpandIcon, ReplyIcon, VolumeOffIcon, VolumeUpIcon} from "@heroicons/vue/outline";
import {useScreen} from 'vue-screen'
import {computed, ref, watch} from 'vue'
import useSound from './sounds'
import FirstProgress from './components/other/GameProgressFirst.vue'
import SecondProgress from './components/other/GameProgressSecond.vue'
import elements from './data/sorular.json'

import OptionsScreen from "./components/screen/Options.vue"
import ResultScreen from "./components/screen/Results.vue"
import HomeScreen from "./components/screen/Home.vue"
import GameScreen from "./components/screen/Game.vue"
import LandscapeScreen from "./components/screen/Landscape.vue"
import VueCountdown from '@chenfengyuan/vue-countdown';

const data = ref([])
const fullscreen = ref(false)
const phoneScreen = useScreen()
const heightScore = ref(0)
const level = ref("Orta")
const user_level = ref([{level: 1, title: "BAŞLA"}])
const max_question = ref(12)

const {soundStart, soundSetVolume} = useSound()

const screen = ref("home")
const first_multiplier = ref([2, 3, 4, 5, 6, 7, 8, 9, 10])
const second_multiplier = ref([2, 3, 4, 5, 6, 7, 8, 9, 10])
const time = ref(60)
const gamer = ref(null)
const volume = ref(true)
const currentTime = ref(0)


const addPoint = (g) => {
    gamer.value[g.gamer] = g
}

watch(screen, (screen, _) => {
    if (screen == "game") {
        time.value = 60
        soundStart(3)
    } else {
        soundStart(2)
    }
})

soundSetVolume(volume.value)
watch(volume, (volume, _) => {
    soundSetVolume(volume)
})


const getStorePoint = computed(() => {
    return heightScore.value;
})

const setStorePoint = (newScore) => {
    heightScore.value = newScore;
}


const setScreenEvent = (selectScreen) => {
    screen.value = selectScreen
}


const getTime = computed(() => {
    return time.value
})


const finishedTime = () => {
    screen.value = "result"
}

const setStart = (newGamer) => {

    data.value = elements.filter(i => i.level == newGamer.level)

    newGamer = newGamer.gamer
    screen.value = "game"
    const addGamer = {
        point: 0,
        bestAnswer: 0,
        question: 0
    }

    const gamerArr = []
    for (let index = 0; index < newGamer; index++) {
        gamerArr.push({gamer: index, ...addGamer})
    }

    gamer.value = gamerArr
}

const addTime = () => {
    time.value = currentTime.value + 30
}

const timerProgressFNC = (t) => {
    const sn = t.totalMilliseconds / 1000
    currentTime.value = Math.ceil(sn)
    if (sn < 10) {
        soundStart(4)
    }
}

const setMultiplier = (obj) => {
    soundStart(2)
    if (obj.selected == "first") {
        if (first_multiplier.value.includes(obj.number)) {
            if (first_multiplier.value.length != 1) {
                first_multiplier.value = first_multiplier.value.filter(i => i != obj.number)
            }
        } else {
            first_multiplier.value.push(obj.number)
        }
    } else if (obj.selected == "second") {
        if (second_multiplier.value.includes(obj.number)) {
            if (second_multiplier.value.length != 1) {
                second_multiplier.value = second_multiplier.value.filter(i => i != obj.number)
            }
        } else {
            second_multiplier.value.push(obj.number)
        }
    } else if (obj.selected == "time") {
        time.value = obj.number
    }
}
</script>

<style>
.games-elements-bg{
    background-color: #87AAAA;
}
.games-elements-secondary{
    background-color: #F6D7A7;
}

.games-elements-text-color-question{
    color: #E50069;
}


.games-elements-text-color-secondery{
    color: #F6D7A7;
}

.games-elements-border-color-secondery{
    border-color: #F6D7A7;
}

.games-elements-text-color-primary{
    color: #87AAAA;
}

.games-elements-bg-repeat {
    background: #87AAAA;
    /* background-image: url("/img/games/yazim_yanlisi/pattern.png"), linear-gradient(#FFF, #FFF);  W3C */
}

.games-elements-bg-sarkit{
    background-image: url("/img/games/yazim_yanlisi/vawe-06.svg");
    background-repeat: repeat-x;
}
</style>
