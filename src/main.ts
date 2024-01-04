import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router"
import Crafter from './components/crafter/Crafter.vue'
import Builder from './components/builder/Builder.vue'
import Ingredient from './model/ingredient'
import {ITEMS, WynnItem} from './model/item'
import { WARRIOR_ABILITY_TREE, WARRIOR_CONNECTORS, findPath } from './model/abilitytree'
import { parseStyleToComponents } from './scripts/util/color_code_translator'

const routes = [
    { path: '/crafter/:recipe?', component: Crafter },
    { path: '/builder', component: Builder}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

console.log(parseStyleToComponents("&a&lFodase &6&lOK?"));

createApp(App).use(router).mount('#app')