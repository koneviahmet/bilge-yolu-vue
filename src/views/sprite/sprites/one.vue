<template>
    <div class="flex flex-col space-y-6 items-center justify-center">
        <div>
            <Application :backgroundColor="'#FFF'" :width="96" :height="96">
                <sprite
                    texture="/flower.png"
                    :scale="3"
                    :x="-(96 * (step % 8))" :y="0"
                />
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
import {ref} from 'vue'
import { Application } from 'vue3-pixi'
const step = ref(0)

</script>