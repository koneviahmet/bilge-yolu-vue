<template>
    <div class="flex flex-col space-y-4">
        <!-- Seçilenler -->
        <div class="flex space-x-3 items-center justify-center pt-12">   
            <div>
                <Student :number="students[0]?.[selectedStudent?.[0]]" :group="1"/>
            </div>
            <div class="p-4">
                <ArrowRightIcon  class="h-8" v-if="whoAsk == 0"/>
                <ArrowLeftIcon  class="h-8" v-else/>
            </div>
            <div>
                <Student :number="students[1]?.[selectedStudent?.[1]]" :group="2"/>
            </div>
        </div>

        <div class="flex items-center justify-center p-2" :class="isLoading ? 'invisible':'visible'">
            <button class="btn btn-primary" @click="selectBTN">Seçimi Başlat</button>
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
        <div class="flex h-screen border-t-2 space-x-2 p-4 bg-gray-50">
            <div class="">
                <div class="flex items-center justify-center text-3xl py-2 text-gray-500">
                        1. Grup
                </div>
                <div class="flex items-center justify-center space-x-2 p-1">
                    <div class="bg-white px-2 py-1 rounded-lg" v-for="f, key in flowers[0]" :key="key">
                        <div class="text-sm text-gray-400">{{ key + 1 }}</div>
                        <Application :backgroundColor="'#FFF'" :width="64" :height="64" >
                            <sprite
                                texture="/flower.png"
                                :scale="2"
                                :x="-(64 * (f % 6))" :y="0"
                                v-if="!flowerAnim"
                            />
                        </Application>
                    </div>
                </div>
                <StudentGroup :col="4" :trueCorrects="trueCorrectArr[0]" @selected="selectedStudent[0] = $event" :group="1" :start="startSelect" :students="students[0]" />
            </div>
            <div class="">
                <div class="flex items-center justify-center text-3xl py-2 text-gray-500">
                        2. Grup
                </div>
                <div class="flex items-center justify-center space-x-2 p-1">
                    <div class="bg-white px-2 py-1 rounded-lg" v-for="f, key in flowers[1]" :key="key">
                        <div class="text-sm text-gray-400">{{ key + 1 }}</div>
                        <Application :backgroundColor="'#FFF'" :width="64" :height="64" >
                            <sprite
                                texture="/flower.png"
                                :scale="2"
                                :x="-(64 * (f % 6))" :y="0"
                                v-if="!flowerAnim"
                            />
                            
                        </Application>
                    </div>
                </div>
                <StudentGroup :col="4" :trueCorrects="trueCorrectArr[1]" @selected="selectedStudent[1] = $event" :group="2" :start="startSelect" :students="students[1]" />
            </div>
        </div>
    </div>
</template>


<script setup>
import {defineProps, ref, computed, watch, onMounted} from 'vue'
import StudentGroup from '../components/studentGroup.vue';
import Student from '../components/student.vue';
import { ArrowRightIcon, ArrowLeftIcon} from "@heroicons/vue/solid";
import useRandIndex from '../compositions/useRandIndex';
const {selectedIndexError, select, selectingIndex, getRandomSelectIndex, excludedIndexes, selectableLength, selectableSize, selectableIndexes} = useRandIndex()
import { Application } from 'vue3-pixi'

const props              = defineProps(['studentCount'])
const startSelect        = ref(false)
const selectedStudent    = ref([null, null])
const students           = ref([[],[]])
const selectedArr        = ref([[],[]]) //seçilenler
const trueCorrectArr     = ref([[1,2,3,4,5,6,7,8,9,10,1,12,13,14,15,16,7,12,1,1,1],[1,2,3,4,5,6,7,8,9,10,1,12,13,14,15,16,7]]) //doğru cevaplayanlar
const isLoading          = ref(false)
const whoAsk             = ref(null)
const whoAnswer          = ref(null)
const info               = ref(null)
const isAnswerButtonShow = ref(false);
const flowerAnim         = ref(false)


const flowers = computed(() => {
    flowerAnim.value = true
    setTimeout(() => flowerAnim.value = false, 1);
    let f = [[],[]]
    const firstGroup    = trueCorrectArr.value[0].length
    const secondGroup   = trueCorrectArr.value[1].length
    f[0] = setFlowerArr(firstGroup, 5)
    f[1] = setFlowerArr(secondGroup, 5)
    return f
})


const setFlowerArr = (count, max) => {
    const remainder = count % max
    const part = (count - remainder) / max
    let arr = []
    for (let i = 0; i < part; i++) arr.push(max)
    if (remainder > 0) arr.push(remainder)
    return arr
}


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