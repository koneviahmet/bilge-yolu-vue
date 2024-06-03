<template>  
    <div class="flex flex-col w-full h-screen items-center justify-center space-y-2">
        <div class="p-2">
            <router-link class="btn btn-primary" to="/quesitons">Soru Hazırla</router-link>
        </div>

        <div>
            <input type="text" placeholder="Öğrenci Sayısı" v-model="student_size" class="input input-bordered w-full max-w-xs" />
        </div>

        <div class="flex space-x-0 w-1/2 border-b p-2" v-for="g in games" :key="g.id">
            <div class="w-full">
                <div class="font-bold cursor-pointer" @click="setGame(g.id)">
                    {{ g.title }}
                </div>
                <div class="text-sm">
                    {{ g.desc }}
                </div>
            </div>
            <div>
                <button class="btn btn-sm" @click="setGame(g.id)">Git</button>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import {defineProps, defineEmits, ref, watch} from 'vue'

const props = defineProps(['games', 'studentCount'])
const emit = defineEmits(['game', 'student_count'])
const student_size = ref(props.studentCount)

watch(student_size, (cStudentSize) => {
    emit('student_count', cStudentSize)
}, {immediate: true})

const setGame = (id) => {
    emit('game', id)
}

</script>