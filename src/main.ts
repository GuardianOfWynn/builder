import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router"
import Crafter from './components/crafter/Crafter.vue'
import Builder from './components/builder/Builder.vue'
import Ingredient from './model/ingredient'
import {ITEMS, WynnItem} from './model/item'
import { WARRIOR_ABILITY_TREE, WARRIOR_CONNECTORS, findPath } from './model/abilitytree'

const routes = [
    { path: '/crafter/:recipe?', component: Crafter },
    { path: '/builder', component: Builder}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(router).mount('#app')