<template>
    <div class="flex flex-col space-y-2 overflow-hidden">
        <div class="" :class="phoneScreen.landscape && 'px-2' || 'p-3'">
            <div class="w-full bg-white  rounded-full mb-2" :class="phoneScreen.landscape && 'h-2 lg:h-4' || 'h-4'">
                <div class="games-elements-secondary rounded-full" :style="`width: ${getFirstGamePercent}%`"
                    :class="phoneScreen.landscape && 'h-2 lg:h-4' || 'h-4'"
                ></div>
            </div>
        </div>
        <div class="flex flex-col space-y-4 text-black items-center">
            <div class="font-bold" :class="phoneScreen.landscape && 'text-2xl lg:text-5xl' || 'text-4xl lg:text-5xl'" >
                {{current_time}}
            </div>
            <div class="text-2xl">
                {{ gamer[0]?.point }} / {{ max_question }}
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed} from "vue"
import {useScreen} from 'vue-screen'

const phoneScreen = useScreen()
const props = defineProps(['gamer', 'store_point', 'current_time', 'max_question'])

const getFirstGamePercent = computed(() => {
    const allPoint = props.max_question
    const points   = props.gamer[0]?.point;

    return (100 * points) / allPoint;
})
</script>
