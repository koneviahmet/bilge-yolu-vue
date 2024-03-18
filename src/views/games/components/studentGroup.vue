<template>

    <div>
        <div class="flex items-center justify-center p-2" v-if="select_button">
            <button class="btn btn-sm btn-primary" @click="selectBTN">Seç</button>
        </div>
        <div>
            Doğru Sayısı: {{ trueCorrects.length }} 
        </div>

        <div class="flex flex-wrap">
            <div :class="`w-1/${col}`" v-for="s, key in students" :key="key">
                <div class="p-2">
                    <Student :info="{true: trueCorrects.filter(i => i == s).length}" :number="s" :select="randomIndex == key" :group="group"/>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import {defineProps, defineEmits, onMounted, watch, ref} from 'vue'
import Student from './student.vue';
import useRandIndex from '../compositions/useRandIndex'
const {selectedIndexError, select, selectingIndex, getRandomSelectIndex, excludedIndexes, selectableLength, selectableSize, selectableIndexes} = useRandIndex()

const props = defineProps(['students', 'col', 'group', 'start', 'select_button', 'trueCorrects'])
const emit  = defineEmits(['selected'])
const randomIndex = ref(null)
const isLoading   = ref(false)


watch(props, (cProps) => {
    if(cProps.start){
        selectBTN()
    }
},{deep: true})



const selectBTN = () => {
    if (isLoading.value) return false
    isLoading.value = !isLoading.value

    emit('selected', null)
    try {
        selectableLength.value = props.students.length
        select()
    } catch (error) {
        console.log(error);
    }

    let i = 0
    const interval = setInterval(() => {
        i++
        randomIndex.value = getRandomSelectIndex()

        if (i == 5) {
            randomIndex.value = null
            isLoading.value = !isLoading.value
            emit('selected', selectingIndex.value[0])
            clearInterval(interval)
        }
    }, 500);    
}


    


</script>