<template>
    <div class="flex flex-col space-y-4">
        <!-- Seçilenler -->
        <div class="flex space-x-3 items-center justify-center p-4">   
            <div>
                <Student :number="students?.[selectedStudent]" :group="1"/>
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


        Kedi Yakala point: {{ point }} {{ catPosition }}
        <div class="bg-red-200 relative h-20">
            <!--cat-->
            <div class="bg-green-300 h-12 w-12 absolute bottom-0 rounded-full" :style="catStyle"></div>

            <!--student-->
            <div class="bg-red-300 h-12 w-12 absolute bottom-0 rounded-full" :style="studentStyle"></div>
            
        </div>

        <!-- Gruplar -->
        <div class="flex">
            <div class="bg-gray-300">
                <StudentGroup :col="12" :trueCorrects="trueCorrectArr" @selected="selectedStudent = $event" :group="1" :start="startSelect" :students="students" />
            </div>
        </div>
    </div>
</template>



<script setup>
import {defineProps, ref, onMounted, watch, computed} from 'vue'
import StudentGroup from '../components/studentGroup.vue';
import Student from '../components/student.vue';

const props              = defineProps(['studentCount'])
const startSelect        = ref(false)
const selectedStudent    = ref(null)
const students          = ref(Array.from({ length: props.studentCount }, (_, index) => index))

const selectedArr        = ref([]) //seçilenler
const trueCorrectArr     = ref([]) //doğru cevaplayanlar
const isLoading          = ref(false)
const info               = ref(null)
const isAnswerButtonShow = ref(false);
const point              = ref(0)
const catInterval        = ref(null)
const catPosition        = ref(0)
const isFinish           = ref(false)

watch(selectedStudent, (s) => {
    if (s != null) {
        info.value = `${s + 1}. Öğrenci soruyu cevaplayacak.`
        setTimeout(() => isAnswerButtonShow.value = true, 200);
        selectedArr.value = [...selectedArr.value, s]
        isLoading.value = false

        catStartAnimate()
    }
})


const catStyle = computed(() => {
    return `left: ${catPosition.value}%`
})

const studentStyle = computed(() => {
    return `left: ${point.value}%`
})

watch(point, (cPoint) => {
    if (cPoint >= catPosition.value) {
        info.value = "Tebrikler yakaladın."
        isFinish.value = true
        isAnswerButtonShow.value = false
        catPosition.value = point.value + 2
        clearInterval(catInterval.value)
    }   
})

const selectBTN = () => {
    clearInterval(catInterval.value)
    isLoading.value          = true
    isAnswerButtonShow.value = false
    point.value = 0
    isFinish.value = false

    info.value = "Soruyu cevaplayacak öğrenci seçiliyor."
    startSelect.value = true
    setTimeout(() => startSelect.value = false, 100);
}



const catStartAnimate = () => {
    catPosition.value = 10
    
    catInterval.value = setInterval(() => {
        catPosition.value += 2
        if (catPosition.value >= 100) {
            //kaybetti demektir
            isFinish.value = true
            info.value = "Üzgünüm kediyi kaçırdınız."
            clearInterval(catInterval.value)
            isAnswerButtonShow.value = false
        }
    }, 500);
}

const answerBTN = (answer) => {
    if (answer) {
       info.value = "Tebrikler! Doğru cevapladın."
       trueCorrectArr.value = [...trueCorrectArr.value, students.value[selectedStudent.value]]
       point.value += 5
       isAnswerButtonShow.value = false
       setTimeout(() => {
            if (!isFinish.value) isAnswerButtonShow.value = true
       }, 500);
    }else{
        info.value = "Üzgünüm! Yanlış Cevapladın."
        isAnswerButtonShow.value = false
        point.value = 0
    }
}


</script>