<template>
    <div class="flex flex-col rounded-lg border-2 overflow-hidden" :class="select ? 'bg-yellow-400': 'bg-white'">
        <div class="h-4 flex items-center justify-center" :class="setBgColor">
        
        </div>

        <div class="flex items-center justify-center py-4 px-8 text-2xl font-bold text-gray-500"> 
            {{ getNumber }} 
        </div>
        <div class="text-2xs py-1 px-2 bg-gray-100" v-if="info">
            D: {{ info.true }}
        </div>
    </div>
</template>


<script setup>
import {defineProps, computed} from 'vue'
const props = defineProps(['number', 'group', 'select', 'info'])

const setBgColor = computed(() => {
    let color = 'bg-gray-300'
    if (props.group == 1) color = 'bg-red-300'
    if (props.group == 2) color = 'bg-green-300'

    return color
})

const getNumber = computed(() => {
    if (props.number == 0 && props.number != null) return props.number + 1
    if (props.number == null) return '?'
    return props.number + 1
})
</script>