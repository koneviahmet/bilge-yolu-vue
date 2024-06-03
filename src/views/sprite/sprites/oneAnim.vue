<template>
    <div class="flex flex-col space-y-6 items-center justify-center">
        <div>
            <Application :backgroundColor="'#FFF'" :width="250" :height="250">
                <template #default>
                <animated-sprite
                    texture="/flower.png"
                    playing
                    :animation-speed="0.1"
                    :scale="3"
                    :x="-(96 * (step % 8))" :y="0"
                />

                </template>
            </Application>
        </div>
        <div class="flex space-x-1">
            <button class="btn btn-sm btn-error" @click="step > 0 && step--">-</button>
            <button class="btn btn-sm" v-for="i in 8" :key="i" @click="step = i" :class="step == i ? 'btn-primary':''">{{ i }}</button>
            <button class="btn btn-sm btn-error" @click="step++">+</button>
        </div>
    </div>
</template>


<script setup>
import {ref, reactive} from 'vue'
import { Application, useApplication, useRenderer, useScreen, useStage } from 'vue3-pixi'
const step = ref(0)

const app = useApplication()
console.log(app);

</script>