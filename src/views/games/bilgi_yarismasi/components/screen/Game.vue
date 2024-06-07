<template>
    <div class="flex flex-col h-full relative">

        <main class="h-full flex flex-col items-center justify-center relative">
            <!-- soru -->
            <div class="w-full">

                <div class="text-center flex items-center justify-center">
                    <div class="w-full lg:w-1/2 bg-white p-6 m-6 border-2 rounded-box text-xl  shadow-lg">
                        <div class="flex space-x-2 items-end justify-end mb-4 -mt-3 -mr-3">
                            <div class="m-2 games-elements-bg px-3 py-2 rounded-full text-xs cursor-pointer" @click="setJoker('yari_yariya')" :class="usedJokers.includes('yari_yariya') && 'opacity-30'">50:50</div>
                            <div class="m-2 games-elements-bg px-3 py-2 rounded-full text-xs  cursor-pointer" @click="setJoker('zaman_arttir')" :class="usedJokers.includes('zaman_arttir') && 'opacity-30'">+30</div>
                            <div class="m-2 games-elements-bg px-3 py-2 rounded-full text-xs  cursor-pointer" @click="setJoker('cift_cevap')" :class="usedJokers.includes('cift_cevap') && 'opacity-30'">x2</div>
                        </div>

                        
                        {{ selected_element.question }}
                    </div>
                </div>

                <!-- choices -->
                <div class="w-full md:w-1/2 m-auto flex flex-wrap justify-items-center">
                    <div class="w-full md:w-1/2 flex items-center justify-center" v-for="c in choices"  :key="c">
                        <div class="p-2 flex items-center justify-center  h-full w-full">
                            <div
                                class="cursor-pointer font-bold h-full w-full px-6"
                                @click="canAnswer && setAnswer(c)">
                                <div
                                    class="flex items-center justify-center h-full w-full shadow-lg"
                                    :class="choiceClass(c)">
                                    {{ c }} 
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <!-- puanı basalım -->
                <div class="h-28 flex items-center justify-center space-x-2" :class="phoneScreen.landscape  && 'mt-3 lg:mt-6 2xl:mt-10' || 'mt-10'">

                    <div class="text-right text-xl lg:text-3xl font-bold" :class="notification?.point == 0 && 'text-black' || 'text-black'">
                        {{ notification?.praise }}
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import {ref, watch, computed} from "vue"
import useSound from '../../sounds'
import {useScreen} from 'vue-screen'
import Bg from '../other/Bg.vue'

const emit = defineEmits(['screen', 'add_point', 'time'])
const props = defineProps(['gamer', 'first_multiplier', 'second_multiplier', 'volume', 'time', 'elements','level','max_question'])

const selected_element = ref(null)
const choices = ref([])
const notification = ref([])
const selectedAnswer = ref(null);
const {soundStart, soundSetVolume} = useSound()
const phoneScreen = useScreen()
const lenWrong = ref(0)
const timeWrong = ref(0)
const canAnswer = ref(true)
const usedJokers = ref([])
const doubleResponseCount = ref(0)

const start = () => {
    getQuestion()
}

soundSetVolume(props.volume)

watch(props, (props, _) => {
    if (timeWrong.value - props.time > 3 && timeWrong.value > 0) {
        canAnswer.value = true
        lenWrong.value = 0
        timeWrong.value = 0
        notification.value = {
            praise: "Çözmeye devam edebilirsin",
            point: 0
        }
    } else {
        if (timeWrong.value > 0) {
            const remainingTime = (4 - (timeWrong.value - props.time));
            if (remainingTime < 4) {
                notification.value = {
                    praise: remainingTime + " saniye sakin ol",
                    point: 0
                }
            }
        }
    }
})


const setJoker = (joker) => {
    if (usedJokers.value.includes(joker)) return false

    usedJokers.value.push(joker)
    if(joker == 'yari_yariya'){
        console.log(choices.value);
        let answer = selected_element.value.ansvers[0]
        let d = shuffle([...choices.value.map((i,k) => i != answer ? k + 1 : false).filter(i => i).map(i => i - 1)])
        choices.value[d[0]] = "..."
        choices.value[d[1]] = "..."
    }else if(joker == 'zaman_arttir'){
        emit('time')
    }else if(joker == 'cift_cevap'){
        doubleResponseCount.value = 1
    }


}

const setAnswer = (answer) => {
    let status = null
    const notificationArr = ["Tebrikler", "İyi Gidiyorsun", "Harikasın", "Süpersin"]
    selectedAnswer.value = answer;

    if (answer == selected_element.value.ansvers[0]) {
        status = true
        soundStart(0)
        lenWrong.value = 0

        const period = (props.gamer.bestAnswer + 1) % 4;
        //const newPoint = period == 0 ? 30 : 10;
        const newPoint = 1;
        const newGamer = {
            ...props.gamer,
            bestAnswer: props.gamer.bestAnswer + 1,
            point: props.gamer.point + newPoint
        }
        emit('add_point', newGamer)

        const notificationKey = newGamer.bestAnswer > notificationArr.length ? notificationArr.length - 1 : newGamer.bestAnswer - 1;

        notification.value = {
            praise: notificationArr[notificationKey],
            point: newPoint
        }
    } else {
        if (doubleResponseCount.value == 1) {
            choices.value = choices.value.map(i => i == answer ? '...' : i)
            return false
        }
        status = false
        soundStart(1)
        const newGamer = {
            ...props.gamer,
            bestAnswer: 0,
        }

        emit('add_point', newGamer)
        notification.value = {
            praise: "Hata yaptın",
            point: 0
        }
        lenWrong.value = lenWrong.value + 1

        if (lenWrong.value == 3) {
            timeWrong.value = props.time
            canAnswer.value = false
            notification.value = {
                praise: "3 saniye sakin ol ",
                point: 0
            }
        }
    }

    canAnswer.value = false
    setTimeout(() => {
        if (!status) {
            setScreen('result')
            return false
        }
        getQuestion()
        canAnswer.value = true

        console.log("Bitirme süresi", props.gamer.question, props.max_question);
        emit('add_point', {...props.gamer, question: props.gamer.question + 1})

        //hepsini bilerek bitirdi demek
        if (props.max_question == props.gamer?.question + 1) setScreen('result')

    }, 2000);




}


const setChoose = () => {
    let selecteds = [...selected_element.value.ansvers]
    shuffle(selecteds)
    choices.value = [...selecteds]
}


const toUniqueArray = (a) => {
    var newArr = [];
    for (var i = 0; i < a.length; i++) {
        if (newArr.indexOf(a[i]) === -1) {
            newArr.push(a[i]);
        }
    }
    return newArr;
}

const setScreen = (screen) => {
    emit('screen', screen)
}



const getQuestion =  () => {
    doubleResponseCount.value = 0
    let selectIndex = Math.floor(Math.random() * props.elements.length)
    selected_element.value =  props.elements[selectIndex];
    setChoose()
}

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}


const choiceClass = (c) => { 
    let size = c.length
    let landscapeSize = [];
    landscapeSize[0] = "text-lg lg:text-3xl";
    landscapeSize[1] = "text-lg ";   


    let portraitSize = [];
    portraitSize[0] = "text-2xl lg:text-xl";
    portraitSize[1] = "text-base lg:text-xl";

    let color = 'games-elements-secondary';
    if (c == selected_element.value.ansvers[0] && !canAnswer.value) {
        color = 'bg-green-400'
    }else if (c == selectedAnswer.value && !canAnswer.value) {
        color = 'bg-red-400'
    }


    let other = ` text-black text-center  p-2 rounded-lg  ${color}`
    return `${phoneScreen.landscape ? landscapeSize[size] : portraitSize[size]}  ${other}`
}

start()

</script>
