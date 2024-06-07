<template>
    <div class="h-full flex flex-col justify-end">
        <div class="h-2/3 flex flex-col justify-center items-center">
            <div class="h-full flex flex-col space-y-4 items-center justify-center">
                <div class="text-gray-500 flex items-center space-x-3">
                    <div class="font-bold text-6xl text-black">{{gamer[0].point}} - {{ max_question }}</div>
                    <div class="font-bold text-black text-4xl lg:text-5xl 2xl:text-6xl"></div>
                </div>
                <div>
                    <div class="text-center text-black flex text-2xl lg:text-3xl 2xl:text-5xl space-x-2 items-center">
                        <div>% {{ (gamer[0].point * 100 / max_question).toFixed(2) }} Başarı</div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center items-center" :class="phoneScreen.landscape ? 'my-5 2xl:my-20' : 'my-20'">
                <div class="text-black text-xl font-bold cursor-pointer games-elements-secondary px-4 py-2 rounded-lg"  @click="setScreen('home')">
                    Tekrar Oyna
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed, ref} from "vue"
import {useScreen} from 'vue-screen'

const phoneScreen = useScreen()

const emit = defineEmits(['screen', 'score'])
const props = defineProps(['gamer', 'time', 'heightScore', 'max_question'])
const newRecord = ref(false)

const setStoreScore = () => {
    if(props.gamer.length == 1){
        if (props.gamer[0].point > getStorePoint.value) {
            newRecord.value = true
            emit('score', props.gamer[0].point)
        }
    }
}

const getStorePoint = computed(() => {
    return props.heightScore;
})

setStoreScore()

const setScreen = (screen) => {
    emit('screen', screen)
}
</script>
