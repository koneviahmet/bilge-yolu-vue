<template>

    <div class="flex flex-col space-y-2 items-center justify-center">
        <div class="flex space-x-1">
            <button class="btn btn-sm" v-for="i in 2" :key="i" @click="sprite = i" :class="sprite == i ? 'btn-primary':''">{{ i }}</button>
        </div>

        <div>
            <One  v-if="sprite == 1"/>
            <OneAnim  v-if="sprite == 2"/>
        </div>
    </div>

    
</template>


<script setup>
import {ref} from 'vue'
import One from './sprites/one.vue';
import OneAnim from './sprites/oneAnim.vue';

const sprite = ref(2)



</script>