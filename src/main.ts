import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router"
import Crafter from './components/crafter/Crafter.vue'
import Builder from './components/builder/Builder.vue'
import Workspace from './components/workspace/Workspace.vue'
import { EngineInstance, createEngine } from './ecoengine/engine'
import { SKY_CLAIM_PRESET, TERRITORIES } from './model/ecoengine/ecoengine'

const routes = [
    { path: '/crafter/:recipe?', component: Crafter },
    { path: '/builder', component: Builder},
    { path: '/workspace', component: Workspace}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createEngine(TERRITORIES, SKY_CLAIM_PRESET)
EngineInstance!.Start()

createApp(App).use(router).mount('#app')