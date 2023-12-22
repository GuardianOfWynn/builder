<template>
    <Combobox :defaultValue="undefined" nullable @update:modelValue="value => $emit('update-ing', value)" v-model="selectedIng" name="assignee" class="">
        <div class="font-minecraft relative">
          <ComboboxButton v-if="selectedIng != undefined" class="top-2 absolute mx-auto left-0 right-0 flex inset-y-0 justify-center">
            <div class="flex">
              <img v-if="selectedIng.sprite.includes('.png')" class="w-4 h-4 pixelated object-contain" :src="'/builder/sprites/' + selectedIng.sprite" />
              <img v-else class="w-6 h-6 pixelated object-contain" :src="'/builder/sprites/' + selectedIng.sprite" />
            </div>
          </ComboboxButton>
          <ComboboxInput :spellcheck="false" class="pt-8 text-sm border-purple-600 border-[1px] h-16 text-white text-center bg-mc-bg rounded-md p-1 px-3 w-full outline-none "
            @change="query = $event.target.value"
            :displayValue="(ing: any) => {
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
  
  <script lang="ts">
    import { computed, ref,defineComponent, Ref, onMounted, watchEffect } from "vue";
    import Ingredient from "../../model/ingredient";
    import {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
  } from '@headlessui/vue' 
  
  export default defineComponent({
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
    ingredient: Ingredient
  },
  async setup(props, { emit }: any) {
    const ingredients: Ingredient[] = await(await fetch("/builder/ingredients.json")).json();
    const query = ref('');
    const selectedIng: Ref<Ingredient | undefined> = ref(props.ingredient);

    const filteredIngredients = computed(() =>
            query.value === ''
            ? ingredients.slice(0, 20)
            : ingredients.filter((ing) => {
                return ing.name.toLowerCase().includes(query.value.toLowerCase())
        }).slice(0,20)); 
        
    watchEffect(() => selectedIng.value = props.ingredient);
    return {query, emit, filteredIngredients, selectedIng}
  }})
  </script>
  