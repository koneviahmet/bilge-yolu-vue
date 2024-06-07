<template>
    <div class="flex flex-col h-full items-center justify-center">
        <div class="items-center text-secondary mt-24">
            <div class="flex flex-col w-full" :class="phoneScreen.landscape && 'space-y-2 lg:space-y-4 2xl:space-y-8' || 'space-y-4'">

                <div class="flex space-x-2 text-black">
                    <div v-for="i in user_level" :key="i.level">
                        <h1 class="bg-white border px-6 py-12 rounded-box cursor-pointer" @click="start({gamer: 1, level: i.level})">
                            {{i.title}}
                        </h1>
                    </div>
                </div>

                <div class="hidden">
                    <h1 class="-ml-8 px-10  p-3 rounded-full cursor-pointer text-lg md:text-xl lg:text-2xl 2xl:text-4xl hover:text-primary-default games-elements-bg font-bold games-elements-text-color-secondery" @click="setScreen('options')">
                        Ayarlar
                    </h1>
                </div>
    
            </div>
        </div>
    </div>
</template>

<script setup>
import {useScreen} from 'vue-screen'
import {defineEmits, ref, watch} from 'vue'
import Bg from '../other/Bg.vue'


const phoneScreen = useScreen()

const emit = defineEmits(['screen', 'start', 'level'])
const props = defineProps(['time', 'user_level'])
const level = ref('Orta')

watch(level, (cLevel) => {
    emit('level', cLevel);
})

const setScreen = (screen) => {
    emit('screen', screen)
}

const start = (gamer) => {
    emit('start', gamer)
}
</script>



