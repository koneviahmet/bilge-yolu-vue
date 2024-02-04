<template>
    <div class="p-3">
        <ul class="flex">
        <li class="mr-2" v-for="url in urlArr" :key="url.id">
            <router-link   class="inline-block border  rounded py-1 px-3 " :class='route.fullPath == url.to && "bg-blue-500 text-white"' :to="url.to">{{url.title}}</router-link>
        </li>
    </ul>
    </div>
</template>

<script setup>
    import {useRoute} from "vue-router";
    import {ref} from 'vue';
    const route = useRoute();
    const urlArr = ref([
        {
            id: 1,
            to: "/quesitons",
            title: "Quesitons Home Page"
        },
        {
            id: 2,
            to: "/quesitons/create",
            title: "Quesitons Create"
        },
        {
            id: 3,
            to: "/quesitons/update/1",
            title: "Quesitons Update"
        },
        {
            id: 4,
            to: "/quesitons/list",
            title: "Quesitons List"
        },
        {
            id: 5,
            to: "/quesitons/detail/1",
            title: "Quesitons Detail"
        },
        {
            id: 6,
            to: "/quesitons/search",
            title: "quesitons Search"
        }
    ])
</script>

