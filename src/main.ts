import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router"
import Crafter from './components/crafter/Crafter.vue'
import Builder from './components/builder/Builder.vue'
import Workspace from './components/workspace/Workspace.vue'

const routes = [
    { path: '/crafter/:recipe?', component: Crafter },
    { path: '/builder', component: Builder},
    { path: '/workspace', component: Workspace}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

var worker = new Worker(
    new URL('./eco_engine_worker', import.meta.url),
    {type: 'module'}
  );

createApp(App).use(router).mount('#app')