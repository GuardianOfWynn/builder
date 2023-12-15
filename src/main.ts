import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { NumberRange } from './scripts/util';

//createApp(App).mount('#app')

const a = async() => {



    let data: Array<String> = await(await fetch("/builder/all_recipes.json")).json();
    console.log(JSON.stringify(data.filter(x => x.includes("Boots"))));
}

a();