import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router"
import Crafter from './components/crafter/Crafter.vue'

const routes = [
    { path: '/crafter/:recipe', component: Crafter },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(router).mount('#app')