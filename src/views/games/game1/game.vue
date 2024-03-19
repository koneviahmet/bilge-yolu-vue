<template>
    <div class="flex flex-col space-y-4">
        <!-- Seçilenler -->
        <div class="flex space-x-3 items-center justify-center pt-12">   
            <div>
                <Student :number="students?.[selectedStudent]" />
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
        <div class="flex h-screen">
            <div class="p-2 border-t-2 bg-gray-50">
                <StudentGroup :col="12" :trueCorrects="trueCorrectArr" @selected="selectedStudent = $event"  :start="startSelect" :students="students" />
            </div>
        </div>
    </div>
</template>


<script setup>
import {defineProps, ref, onMounted, watch} from 'vue'
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

watch(selectedStudent, (s) => {
    if (s != null) {
        info.value = `${s + 1}. Öğrenci soruyu cevaplayacak.`
        setTimeout(() => isAnswerButtonShow.value = true, 200);
        selectedArr.value = [...selectedArr.value, s]
        isLoading.value = false
    }
})

const selectBTN = () => {
    isLoading.value          = true
    isAnswerButtonShow.value = false

    info.value = "Soruyu cevaplayacak öğrenci seçiliyor."
    startSelect.value = true
    setTimeout(() => startSelect.value = false, 100);
}


const answerBTN = (answer) => {
    isAnswerButtonShow.value = false
    if (answer) {
       info.value = "Tebrikler! Doğru cevapladın."
       trueCorrectArr.value = [...trueCorrectArr.value, students.value[selectedStudent.value]]
    }else{
        info.value = "Üzgünüm! Yanlış Cevapladın."
    }
}


</script>