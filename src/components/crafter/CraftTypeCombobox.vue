<template>
    <Combobox immediate :defaultValue="types[0]" @update:modelValue="value => $emit('update-craft-type', value)" v-model="selectedType" name="assignee" class="h-8">
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
              v-for="(x, i) in filteredTypes"
              :key="x.name"
              :value="x"
            >
              <div v-bind:class="{ 'border-b-0': i != filteredTypes.length - 1, 'border-t-0': i != 0}" 
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
  import craft_types from "../../assets/craft_types.json";
  import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'
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
    name: 'CraftTypeCombobox',
    components: { 
      Combobox,
      ComboboxInput,
      ComboboxButton,
      ComboboxOptions,
      ComboboxOption,
      TransitionRoot, ComboboxLabel },
    emits: ['update-craft-type'],
    props: {
  },
  setup(props, { emit }) {
    emit('update-craft-type');
    const types = ref(craft_types);
    const query = ref('');
    const selectedType = ref(undefined);
    const filteredTypes = computed(() =>
            query.value === ''
            ? craft_types.slice(0, 20)
            : craft_types.filter((x) => {
                return x.name.toLowerCase().includes(query.value.toLowerCase())
        }).slice(0,20));     
    return {query, emit, filteredTypes, selectedType, types}
  }}
  </script>
  