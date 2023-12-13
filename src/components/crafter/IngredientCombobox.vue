<template>
    <Combobox :defaultValue="undefined" nullable @update:modelValue="value => $emit('update-ing', value)" v-model="selectedIng" name="assignee" class="">
        <div class="font-minecraft relative">
          <ComboboxButton v-if="selectedIng != undefined" class="top-2 absolute mx-auto left-0 right-0 flex inset-y-0 justify-center">
            <div class="flex">
              <img v-if="selectedIng.sprite.id == 397" class="w-4 h-4 pixelated object-contain" :src="imgHead()" />
              <img v-else class="w-6 h-6 pixelated object-contain" :src="imgSprite()" />
            </div>
          </ComboboxButton>
          <ComboboxInput :spellcheck="false" class="pt-8 text-sm border-purple-600 border-[1px] h-16 text-white text-center bg-mc-bg rounded-md p-1 px-3 w-full outline-none "
            @change="query = $event.target.value"
            :displayValue="(ing) => {
              return ing === null || ing === undefined || ing.name === undefined ? 'No ingredient' : ing.name
            }"/>
          <ComboboxOptions class="absolute z-10 flex flex-col align-middle">
            <ComboboxOption
              v-for="(ing, i) in filteredIngredients"
              :key="ing.name"
              :value="ing"
            >
              <div v-bind:class="{ 'border-b-0': i != filteredIngredients.length - 1, 'border-t-0': i != 0}" 
                class="cursor-pointer p-1 px-2 bg-mc-bg text-white w-full border-[1px] border-purple-600 hover:bg-purple-900">
                  {{ ing.name }}
              </div>
            </ComboboxOption>
          </ComboboxOptions>
        </div>
      </Combobox>

  </template>
  
  <script>
  import { computed, ref } from "vue";
  import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue' 
  
  export default {
    name: 'IngredientCombobox',
    components: { Combobox,
        ComboboxInput,
        ComboboxButton,
        ComboboxOptions,
        ComboboxOption,
        TransitionRoot 
  },
  emits: ['update-ing'],
  props: {
    ingredient: Object
  },
  async setup(props, { emit }) {

    const ingredients = await fetch("/ings.json");

    emit('update-ing');
    const query = ref('');
    const selectedIng = ref(undefined);
    const imgHead = () => {
      if(selectedIng.value === undefined) {
        return "";
      }
      return new URL(`../../assets/sprites/${selectedIng.value.sprite.head}`, import.meta.url);
    }
    const imgSprite = () =>{
      if(selectedIng.value === undefined) {
        return "";
      }
      return new URL(`../../assets/sprites/${selectedIng.value.sprite.id + "_" + selectedIng.value.sprite.damage + ".webp"}`, import.meta.url);
    }

    const filteredIngredients = computed(() =>
            query.value === ''
            ? ingredients.slice(0, 20)
            : ingredients.filter((ing) => {
                return ing.name.toLowerCase().includes(query.value.toLowerCase())
        }).slice(0,20));     
    return {query, emit, filteredIngredients, selectedIng, imgHead, imgSprite}
  }}
  </script>
  