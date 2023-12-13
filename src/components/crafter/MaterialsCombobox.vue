<template>
    <Combobox immediate :defaultValue="crafts_scroll.crafts[0]" @update:modelValue="value => $emit('update-craft-materials', value)" v-model="selectedMats" name="assignee" class="h-8">
        <div class="font-minecraft relative flex gap-x-4 ">
          <!--<ComboboxButton v-if="selectedIng != undefined" class="top-2 absolute mx-auto left-0 right-0 flex inset-y-0 justify-center">
            <div class="flex">
              <img v-if="selectedIng.sprite.id == 397" class="w-4 h-4 pixelated object-contain" :src="require('../assets/sprites/' + selectedIng.sprite.head)" />
              <img v-else class="w-6 h-6 pixelated object-contain" :src="require('../assets/sprites/' + selectedIng.sprite.id + '_' + selectedIng.sprite.damage + '.webp')" />
            </div>
          </ComboboxButton>-->
          <ComboboxInput :spellcheck="false" class="text-md border-purple-600 border-[1px] text-white bg-mc-bg rounded-md p-1 px-3 w-full outline-none "
            @change="query = $event.target.value"
            :displayValue="(x) => x.name"/>
          <ComboboxOptions class="absolute z-10 flex flex-col right-0 top-0">
            <ComboboxOption
              v-for="(x) in filteredMaterials"
              :key="x.name"
              :value="x"
            >
              <div v-bind:class="{ 'border-b-0': i != filteredMaterials.length - 1, 'border-t-0': i != 0}" 
                class="cursor-pointer p-1 px-2 bg-mc-bg text-white w-full border-[1px] border-purple-600 hover:bg-purple-900">
                  {{ x.name }}
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
ComboboxLabel,
} from '@headlessui/vue' 
  
  export default {
    name: 'MaterialsCombobox',
    components: { 
      Combobox,
      ComboboxInput,
      ComboboxButton,
      ComboboxOptions,
      ComboboxOption,
      TransitionRoot, ComboboxLabel },
    emits: ['update-craft-materials'],
    props: {
      craftType: Object
    },
  async setup(props, { emit }) {
    emit('update-craft-materials');

    const crafts_spears = await fetch("/crafts/spear.json");
    const crafts_helmet = await fetch( "/crafts/helmet.json");
    const crafts_chestplate = await fetch( "/crafts/chestplate.json");
    const crafts_leggings = await fetch( "/crafts/leggings.json");
    const crafts_boots = await fetch( "/crafts/boots.json");
    const crafts_food = await fetch( "/crafts/food.json");
    const crafts_potion = await fetch( "/crafts/potion.json");
    const crafts_scroll = await fetch( "/crafts/scroll.json");

    const query = ref('');
    const selectedMats = ref(undefined);

    const materials = () => {
      switch(props.craftType.name) {
        case "Helmet": return crafts_helmet.crafts;
        case "Chestplate": return crafts_chestplate.crafts;
        case "Leggings": return crafts_leggings.crafts;
        case "Boots": return crafts_boots.crafts;
        case "Potion": return crafts_potion.crafts;
        case "Food": return crafts_food.crafts;
        case "Scroll": return crafts_scroll.crafts;
      }
    }

    const filteredMaterials = computed(() =>
            query.value === ''
            ? materials()
            : materials().filter((x) => {
                return x.name.toLowerCase().includes(query.value.toLowerCase())
        }));     
    return {query, emit,filteredMaterials , materials, selectedMats,crafts_scroll}
  }}
  </script>
  