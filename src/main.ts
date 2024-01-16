import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router"
import Crafter from './components/crafter/Crafter.vue'
import Builder from './components/builder/Builder.vue'
import Workspace from './components/workspace/Workspace.vue'
import Ingredient from './model/ingredient'
import {ITEMS, WynnItem} from './model/item'
import { WARRIOR_ABILITY_TREE, WARRIOR_CONNECTORS, findPath } from './model/abilitytree'
import { parseStyleToComponents } from './scripts/color_code_translator'
import { StartEcoEngine } from './wasm/eco-engine'

const routes = [
    { path: '/crafter/:recipe?', component: Crafter },
    { path: '/builder', component: Builder},
    { path: '/workspace', component: Workspace}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

var worker = new Worker('eco_engine_worker.js');
worker.postMessage({ cmd:"ecoEngine"})
createApp(App).use(router).mount('#app')