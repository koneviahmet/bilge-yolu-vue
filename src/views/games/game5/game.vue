<template>
    <div class="flex flex-col space-y-4">
        <!-- Seçilenler -->
        <div class="flex space-x-3 items-center justify-center pt-12">   
            <div>
                <Student :number="students?.[selectedStudent]" :group="1"/>
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

        <div class="relative h-20">
            <!--cat-->
            <div class="absolute bottom-0 " :style="catStyle">
                <Application :backgroundAlpha="0"  :width="59" :height="75" >
                    <sprite
                        texture="/cat.png"
                        :scale="0.5"
                        :x="0" :y="-(75 * (catRun % 6))"
                    />
                </Application>
            </div>


            <!--student-->
            <div class="absolute bottom-0" :style="studentStyle">
                <Application  :backgroundAlpha="0" :width="96" :height="128" >
                    <sprite
                        texture="/tomi.png"
                        :scale="2"
                        :x="-(96 * (studentRun % 3))" :y="-(128 * 1)"
                    />
                </Application>
            </div>
            
        </div>
        


        <!-- Gruplar -->
        <div class="flex h-screen">
            <div class="p-2 border-t-2 bg-gray-50">
                <StudentGroup :col="12" :trueCorrects="trueCorrectArr" @selected="selectedStudent = $event"  :start="startSelect" :students="students" />
            </div>
        </div>
    </div>
</template>



<script setup>
import { Application } from 'vue3-pixi'
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
const catPosition        = ref(10)
const isFinish           = ref(false)
const catRun             = ref(0)
const catRunInterval     = ref(null)
const studentRun         = ref(0)
const studentRunInterval = ref(null)


watch(selectedStudent, (s) => {
    if (s != null) {
        info.value = `${s + 1}. Öğrenci soruyu cevaplayacak.`
        setTimeout(() => isAnswerButtonShow.value = true, 200);
        selectedArr.value = [...selectedArr.value, s]
        isLoading.value = false

        catStartAnimate()
        studentRunFNC()
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
        catPosition.value = point.value + 4
        clearInterval(catInterval.value)
        clearInterval(catRunInterval.value)
        clearInterval(studentRunInterval.value)
    }   
})

const selectBTN = () => {
    clearInterval(catInterval.value)
    clearInterval(catRunInterval.value)
    clearInterval(studentRunInterval.value)
    catRun.value = 0
    studentRun.value = 0

    isLoading.value          = true
    isAnswerButtonShow.value = false
    point.value = 0
    isFinish.value = false

    info.value = "Soruyu cevaplayacak öğrenci seçiliyor."
    startSelect.value = true
    setTimeout(() => startSelect.value = false, 100);
}

const catRunFNC = () => {
    catRun.value = 0
    catRunInterval.value = setInterval(() => {
        catRun.value++
    }, 400);
}

const studentRunFNC = () => {
    studentRun.value = 0
    studentRunInterval.value = setInterval(() => {
        studentRun.value++
    }, 400);
}

const catStartAnimate = () => {
    catPosition.value = 10
    catRunFNC()
    
    catInterval.value = setInterval(() => {
        catPosition.value += 2
        if (catPosition.value >= 100) {
            //kaybetti demektir
            isFinish.value = true
            info.value = "Üzgünüm kediyi kaçırdınız."
            clearInterval(catInterval.value)
            clearInterval(catRunInterval.value)
            clearInterval(studentRunInterval.value)
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
        clearInterval(catInterval.value)
        clearInterval(catRunInterval.value)
        clearInterval(studentRunInterval.value)

        info.value = "Üzgünüm! Yanlış Cevapladın."
        isAnswerButtonShow.value = false
        point.value = 0
    }
}


</script>