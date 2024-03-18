<template>

    <div class="flex flex-col space-y-4">
        <!-- Seçilenler -->
        <div class="flex space-x-3 items-center justify-center p-4">   
            <div>
                <Student :number="students[0]?.[selectedStudent?.[0]]" :group="1"/>
            </div>
            <div class="bg-gray-300 rounded-lg p-4">
                <ArrowRightIcon  class="h-6" v-if="whoAsk == 0"/>
                <ArrowLeftIcon  class="h-6" v-else/>
            </div>
            <div>
                <Student :number="students[1]?.[selectedStudent?.[1]]" :group="2"/>
            </div>
        </div>

   

        <div class="flex items-center justify-center p-2" :class="isLoading ? 'invisible':'visible'">
            <button class="btn btn-sm btn-primary" @click="selectBTN">Seç</button>
        </div>

        <div class="flex items-center justify-center" :class="isAnswerButtonShow ? 'visible':'invisible'" >
            <div class="flex space-x-2"> 
                <button class="btn btn-error" @click="answerBTN(false)">Yanlış</button>
                <button class="btn btn-success" @click="answerBTN(true)">Doğru</button>
            </div>
        </div>
        <div class="flex items-center justify-center" :class="info ? 'visible':'invisible'">
            <div class="w-2/3 bg-blue-200 p-2 rounded-lg">
                {{ info || '...' }}
            </div>
        </div>

        <!-- Gruplar -->
        <div class="flex">
            <div class="bg-gray-300">
                <StudentGroup :col="4" :trueCorrects="trueCorrectArr[0]" @selected="selectedStudent[0] = $event" :group="1" :start="startSelect" :students="students[0]" />
            </div>
            <div class="bg-red-300">
                <StudentGroup :col="4" :trueCorrects="trueCorrectArr[1]" @selected="selectedStudent[1] = $event" :group="2" :start="startSelect" :students="students[1]" />
            </div>
        </div>
    </div>
    
</template>


<script setup>
import {defineProps, ref, onMounted, watch} from 'vue'
import StudentGroup from '../components/studentGroup.vue';
import Student from '../components/student.vue';
import { ArrowRightIcon, ArrowLeftIcon} from "@heroicons/vue/solid";
import useRandIndex from '../compositions/useRandIndex';
const {selectedIndexError, select, selectingIndex, getRandomSelectIndex, excludedIndexes, selectableLength, selectableSize, selectableIndexes} = useRandIndex()

const props              = defineProps(['studentCount'])
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


onMounted(() => {
    selectableLength.value = props.studentCount
    selectableSize.value = Math.floor(props.studentCount / 2)
    select()
    setTimeout(() => {
        students.value[0] = [...selectingIndex.value]
        students.value[1] = [...selectableIndexes.value]
    }, 100);
})

watch(selectedStudent, (s) => {
    const sStudent = [students.value[0][s[0]], students.value[1][s[1]]]
    if ((sStudent[0] != null) && (sStudent[1] != null)) {
        info.value = whoAsk.value == 0 ? `${sStudent[0] + 1}. Öğrenci, ${sStudent[1] + 1}. Öğrenciye soru soracak.` : `${sStudent[1] + 1}. Öğrenci, ${sStudent[0] + 1}. Öğrenciye soru soracak.`
        setTimeout(() => isAnswerButtonShow.value = true, 200);
        selectedArr.value[0] = [...selectedArr.value[0], sStudent[0]]
        selectedArr.value[1] = [...selectedArr.value[1], sStudent[1]]
        isLoading.value = false
    }
}, {deep: true})


const selectBTN = () => {
    isLoading.value          = true
    isAnswerButtonShow.value = false

    info.value = "Soruyu kimin soracağı seçiliyor."
    let i = 0;
    const interval = setInterval(() => {
        i++
        whoAsk.value = i % 2;    
        if (i == 5) {
            let whoAskSelected = Math.floor(Math.random() * 2)
            whoAsk.value    = whoAskSelected
            whoAnswer.value = whoAskSelected == 0 ? 1 : 0

            
            
            startSelect.value = true
            setTimeout(() => startSelect.value = false, 100);
            
            info.value = `Soruyu ${whoAskSelected + 1}. grup soracak. Öğrenciler seçiliyor.`
            clearInterval(interval)
        }
    }, 500);
}


const answerBTN = (answer) => {
    isAnswerButtonShow.value = false
    if (answer) {
        info.value = "Tebrikler! Doğru cevapladın."
        trueCorrectArr.value[whoAnswer.value] = [...trueCorrectArr.value[whoAnswer.value], students.value[whoAnswer.value][selectedStudent.value[whoAnswer.value]]]
    }else{
        info.value = "Üzgünüm! Yanlış Cevapladın."
    }
}


</script>