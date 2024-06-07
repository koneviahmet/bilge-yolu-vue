<template>
    <div class="flex flex-col" v-if="gamer.length == 2">
        <div :class="phoneScreen.landscape && 'px-2' || 'p-3'">
            <div class="w-full games-elements-secondary rounded-full mb-2" :class="phoneScreen.landscape && 'h-2 lg:h-4' || 'h-4'">
                <div class="bg-white rounded-full" :style="`width: ${getGamerPercent}%`"
                     :class="phoneScreen.landscape && 'h-2 lg:h-4' || 'h-4'">
                </div>
            </div>
        </div>
        
        <div class="flex justify-between text-black" :class="phoneScreen.landscape && 'px-2' || 'p-3'">
            <div class="flex flex-col">
                <div :class="phoneScreen.landscape && 'text-sm lg:text-xl' || 'text-sm lg:text-xl'" class="text-white">1. Oyuncu</div>
                <div :class="phoneScreen.landscape && 'text-sm lg:text-2xl' || 'text-xl lg:text-2xl'" class="font-bold games-elements-text-color-secondery">
                    {{ gamer[0].point }} Puan
                </div>
            </div>
            <div class="font-bold" :class="phoneScreen.landscape && 'text-2xl lg:text-5xl' || 'text-4xl lg:text-5xl'">
                {{ current_time }}
            </div>
            <div class="flex flex-col text-right">
                <div :class="phoneScreen.landscape && 'text-sm lg:text-xl' || 'text-sm lg:text-xl'" class="text-white">2. Oyuncu</div>
                <div :class="phoneScreen.landscape && 'text-sm lg:text-2xl' || 'text-xl lg:text-2xl'" class="font-bold games-elements-text-color-secondery">
                    {{ gamer[1].point }} Puan
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import {computed} from "vue"
import {useScreen} from 'vue-screen'

const phoneScreen = useScreen()
const props = defineProps(['gamer', 'store_point', 'current_time'])
const getGamerPercent = computed(() => {
    const allPoint = props.gamer[0].point + props.gamer[1].point == 0 ? 2 : props.gamer[0].point + props.gamer[1].point
    const points = props.gamer[0].point == 0 ? 1 : props.gamer[0].point;
    return (100 * points) / allPoint;
})

</script>
