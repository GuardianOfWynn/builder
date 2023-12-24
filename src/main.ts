import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router"
import Crafter from './components/crafter/Crafter.vue'
import Ingredient from './model/ingredient'

const routes = [
    { path: '/crafter/:recipe', component: Crafter },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

async function a() {
    const ingredient: Ingredient[] = await (await fetch('/builder/ingredients.json')).json();
    const newIngredients: Ingredient[] = [];
    ingredient.forEach(x => {
        x.isPowder = false;
        x.powderTier = 0;
        newIngredients.push(x);
    })
    console.log(JSON.stringify(newIngredients));
}

a();

//createApp(App).use(router).mount('#app')