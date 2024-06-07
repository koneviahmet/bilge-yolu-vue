<template>
    <div class="pb-10 lg:pb-0 flex flex-col justify-center">
        <div class="p-4 mx-auto grid md:grid-cols-3  space-y-6 md:space-y-0 bg-gray-200 bg-opacity-80 rounded-xl">
            <!-- first multiplier -->
            <div class="px-10 hidden">
                <div class="text-center font-extrabold text-lg lg:text-xl 2xl:text-2xl text-secondary">1. Çarpan</div>
                <div class="flex justify-around mt-2 2xl:mt-4">
                    <div class="grid grid-cols-2 grid-rows-7 gap-y-1 2xl:gap-y-4 gap-x-4">
                        <Bg v-for="i in [2,3,4,5,6,7,8,9,10,11,12,13,14,15]" :key="i" @click="setMultiplier('first', i)"
                            class="w-12 h-12 cursor-pointer font-bold text-xl games-elements-text-color-secondery rounded-full border-4"
                            :class="first_multiplier.includes(i) && 'border-primary-500' || 'border-opacity-0'">
                            {{ i }}
                        </Bg>
                    </div>
                </div>
            </div>

            <!-- second multiplier -->
            <div class="px-10 py-4 md:py-0 hidden">
                <div class="text-center font-extrabold text-lg lg:text-xl 2xl:text-2xl text-secondary">2. Çarpan</div>
                <div class="flex justify-around mt-2 2xl:mt-4">
                    <div class="grid grid-cols-2 grid-rows-7 gap-y-1 2xl:gap-y-4 gap-x-4">
                        <Bg v-for="i in [2,3,4,5,6,7,8,9,10,11,12,13,14,15]" :key="i"  @click="setMultiplier('second', i)"
                            class="w-12 h-12 cursor-pointer font-bold text-xl games-elements-text-color-secondery rounded-full border-4"
                            :class="second_multiplier.includes(i) && 'border-primary-500' || 'border-opacity-0'">
                            {{ i }}
                        </Bg>
                    </div>
                </div>
            </div>

            <!-- set time -->
            <div class="px-10 py-4 md:py-0">
                <div class="text-center font-extrabold text-lg lg:text-xl 2xl:text-2xl text-black">Zaman</div>
                <div class="flex justify-around mt-2 2xl:mt-4">
                    <div class="grid gap-1 2xl:gap-4">
                        <div class="flex items-center space-x-2" v-for="i in [40,50,60,70,80,90,100]" :key="i">
                            <Bg class="w-12 h-12 cursor-pointer font-bold text-xl rounded-full border-4 text-white"
                                :class="time == i && 'games-elements-border-color-secondery' || 'border-opacity-0'"
                                @click="setMultiplier('time', i)">
                                {{ i }}
                            </Bg>
                            <div class="font-bold text-sm lg:text-base 2xl:text-lg" :class="time == i && ' games-elements-text-color-secondery ' || 'text-black'">
                                Saniye
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-center items-center mt-5">
            <div class="games-elements-secondary text-xl font-bold cursor-pointer games-elements-secondary px-4 py-2 rounded-lg"
                 @click="setScreen('home')">
                Kaydet
            </div>
        </div>
    </div>
</template>

<script setup>
import Bg from '../other/Bg.vue'

const emit = defineEmits(['screen', 'multiplier'])
const props = defineProps(['first_multiplier', 'second_multiplier', 'time', 'volume'])

const setScreen = (screen) => {
    emit('screen', screen)
}

const setMultiplier = (selected, number) => {
    emit('multiplier', {selected, number})
}
</script>
