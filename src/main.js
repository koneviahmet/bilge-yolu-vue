import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './assets/index.css'
import store from "./store";
import can from './directives/can'
import VueFullscreen from 'vue-fullscreen'

const app = createApp(App);
app.directive('can', can)
app.use(router);
app.use(store);
app.use(VueFullscreen, {name: 'fs'})
app.mount('#app')
