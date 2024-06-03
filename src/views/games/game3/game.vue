<template>
    <div class="flex flex-col space-y-4">

         <!-- saha -->
        <div class="h-screen p-2 bg-green-500" v-show="!isLoading">
            <div class="w-full h-full border-8 border-white   relative">

                <div class="bg-white rounded-lg overflow-hidden max-w-max absolute top-2 left-2">
                    <div class="bg-gray-200 p-1 text-sm font-bold">1. Grup</div>
                    <div class="flex items-center justify-center py-2 text-4xl">
                        {{ score[0] }}
                    </div>
                </div>

                <div class="bg-white rounded-lg overflow-hidden max-w-max absolute top-2 right-2">
                    <div class="bg-gray-200 p-1 text-sm font-bold">2. Grup</div>
                    <div class="flex items-center justify-center py-2 text-4xl">
                        {{ score[1] }}
                    </div>
                </div>

                <div class="absolute flex w-full h-full  items-start z-30 left-1/4 top-4 text-6xl text-white">
                    {{ factor > 1 ? factor + 'x':'' }}
                </div>

                <div class="absolute flex w-full h-full  items-center justify-center">
                    <div class="border-8 border-white w-44 h-44 rounded-full"></div>
                </div>
                <div class="absolute flex w-full h-full  items-center justify-center">
                    <div class="bg-white w-2 h-full"></div>
                </div>

                <div class="absolute flex w-full h-full  items-center justify-center">
                    <img  src="/ball.svg" class="w-16 h-16" :style="ballPositionStyle" alt="">
                </div>

                <div class="absolute flex w-full h-full items-center justify-start">
                    <div class="border-8 border-white w-24 h-80 border-l-0"></div>
                </div>

                <div class="absolute flex w-full h-full  items-center justify-end">
                    <div class="border-8 border-white w-24 h-80 border-r-0"></div>
                </div>

            </div>
        </div>

        <div class="absolute w-screen top-0 h-full flex flex-col space-y-6 items-center justify-end pb-20 z-40" v-show="!isLoading">
            <div class="flex items-center justify-center text-xl  border-2 bg-white p-2 rounded-lg" :class="isAnswerButtonShow ? 'visible':'invisible'" > 
                {{ whoAnswer + 1 }}. Grup
            </div>
            
            <div class="flex space-x-3 items-center justify-center p-4" :class="isAnswerButtonShow ? 'visible':'invisible'" > 
                <div v-if="whoAnswer == 0">
                    <Student :number="students[0]?.[selectedStudent?.[0]]" :group="3"/>
                </div>
                <div v-if="whoAnswer == 1">
                    <Student :number="students[1]?.[selectedStudent?.[1]]" :group="3"/>
                </div>
            </div>
      
            <div>
                <div class="flex flex-col items-center justify-center" :class="isAnswerButtonShow ? 'visible':'invisible'" >
                    <div v-if="isAnswerButtonShow">
                        <div class="p-4 text-xl bg-white mb-6 rounded-lg" v-if="getQuesiton?.description">
                            {{ getQuesiton?.description }}
                        </div>    
                    </div>

                    <div class="flex space-x-2"> 
                        <button class="btn btn-sm btn-error" @click="answerBTN(false)">Yanlış</button>
                        <button class="btn btn-sm btn-success" @click="answerBTN(true)">Doğru</button>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-center" :class="info ? 'visible':'invisible'">
                <div class="w-full bg-blue-200 p-2 rounded-lg text-xs">
                    {{ info || '...' }}
                </div>
            </div>

            <div class="flex items-center justify-center p-2" :class="isLoading ? 'invisible':'visible'">
                <button class="btn  btn-primary" @click="selectBTN">
                    Oyunu Başlat
                </button>
            </div>
        </div>
   

        <!-- Gruplar -->
        <div class="flex h-screen border-t-2 space-x-2 p-4 bg-gray-50">
            <div class="">
                <div class="flex items-center justify-center text-3xl py-2 text-gray-500">
                        1. Grup
                </div>
                <StudentGroup :col="4" :trueCorrects="trueCorrectArr[0]" @selected="selectedStudent[0] = $event" :group="1" :start="startSelect" :students="students[0]" />
            </div>
            <div class="">
                <div class="flex items-center justify-center text-3xl py-2 text-gray-500">
                        2. Grup
                </div>
                <StudentGroup :col="4" :trueCorrects="trueCorrectArr[1]" @selected="selectedStudent[1] = $event" :group="2" :start="startSelect" :students="students[1]" />
            </div>
        </div>
    </div>
    
</template>


<script setup>
import {defineProps, ref, onMounted, watch, computed} from 'vue'
import StudentGroup from '../components/studentGroup.vue';
import Student from '../components/student.vue';
import { ArrowRightIcon, ArrowLeftIcon} from "@heroicons/vue/solid";
import useRandIndex from '../compositions/useRandIndex';
const {selectedIndexError, select, selectingIndex, getRandomSelectIndex, excludedIndexes, selectableLength, selectableSize, selectableIndexes} = useRandIndex()

const props              = defineProps(['studentCount', 'questions'])
const startSelect        = ref(false)
const selectedStudent    = ref([null, null])
const students           = ref([[],[]])
const selectedArr        = ref([[],[]]) //seçilenler
const trueCorrectArr     = ref([[],[]]) //doğru cevaplayanlar
const isLoading          = ref(false)
const whoAsk             = ref(null)
const whoAnswer          = ref(null)
const info               = ref(null)
const isAnswerButtonShow = ref(false);
const factor             = ref(1)
const points             = ref([0,0])
const score              = ref([0,0])
const question_index     = ref(0);


const getQuesiton = computed(() => {
    return props.questions?.[question_index.value % props.questions.length] || {}
})

onMounted(() => {
    selectableLength.value = props.studentCount
    selectableSize.value = Math.floor(props.studentCount / 2)
    select()
    setTimeout(() => {
        students.value[0] = [...selectingIndex.value]
        students.value[1] = [...selectableIndexes.value]
    }, 100);
})

watch(points, (cPoints) => {
    let winner = null
    if (Math.abs(cPoints[0] - cPoints[1]) >= 50) {
        winner = cPoints[0] > cPoints[1] ? 0 : 1
        score.value[winner] += 1 

        //topu tekrar ortalayalım
        setTimeout(() => points.value = [0,0], 1000);
    }
}, {deep: true})


watch(selectedStudent, (s) => {
    const sStudent = [students.value[0][s[0]], students.value[1][s[1]]]
    if ((sStudent[0] != null) && (sStudent[1] != null)) {
        info.value = `${sStudent[whoAnswer.value] + 1} numaralı öğrenci soruyu cevaplayacak.`
        
        setTimeout(() => isAnswerButtonShow.value = true, 200);
        selectedArr.value[0] = [...selectedArr.value[0], sStudent[0]]
        selectedArr.value[1] = [...selectedArr.value[1], sStudent[1]]
        isLoading.value = false
    }
}, {deep: true})
 


const ballPositionStyle = computed(() => {
    let position = points.value[0] - points.value[1]
    let pStyle = ''
    if (position == 0) {
        pStyle = '' 
    }else if (position < 0) {
        pStyle = `left: ${48 + position}%`
    }else if (position > 0) {
        pStyle = `right: ${48 - position}%`
    }

    return `position: absolute; ${pStyle}`
})



const selectBTN = () => {
    isLoading.value          = true
    isAnswerButtonShow.value = false
  
    info.value = "Soruyu kimin soracağı seçiliyor."

    let whoAskSelected = Math.floor(Math.random() * 2)
    whoAsk.value    = whoAskSelected
    whoAnswer.value = whoAskSelected == 0 ? 1 : 0

    startSelect.value = true
    setTimeout(() => startSelect.value = false, 100);
}

const answerBTN = (answer) => {
    isAnswerButtonShow.value = false
    if (answer) {
        info.value = "Tebrikler! Doğru cevapladın."
        question_index.value += 1

        trueCorrectArr.value[whoAnswer.value] = [...trueCorrectArr.value[whoAnswer.value], students.value[whoAnswer.value][selectedStudent.value[whoAnswer.value]]]
        
        points.value[whoAnswer.value] = points.value[whoAnswer.value] + factor.value * 10

        factor.value = 1
    }else{
        factor.value += 1
        info.value = "Üzgünüm! Yanlış Cevapladın."
        points.value[whoAnswer.value] = points.value[whoAnswer.value] -  10
    }

    
    setTimeout(() => selectBTN(), 1000);
}


</script>