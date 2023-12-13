<template>
  <Combobox immediate :defaultValue="materials.possibleBounds[0]"
    @update:modelValue="value => $emit('update-craft-level', value)" v-model="selectedLevel" name="assignee" class="h-8">
    <div class="font-minecraft relative flex gap-x-4 ">
      <ComboboxInput :spellcheck="false"
        class="text-md border-purple-600 border-[1px] text-white bg-mc-bg rounded-md p-1 px-3 w-full outline-none "
        @change="query = $event.target.value" :displayValue="(x) => x[0] + '-' + x[1]" />
      <ComboboxOptions class="absolute z-10 flex flex-col right-0 top-0">
        <ComboboxOption v-for="(x, i) in filteredLevels" :key="x" :value="x">
          <div v-bind:class="{ 'border-b-0': i != filteredLevels.length - 1, 'border-t-0': i != 0 }"
            class="cursor-pointer p-1 px-2 bg-mc-bg text-white w-full border-[1px] border-purple-600 hover:bg-purple-900">
            {{ x[0] + '-' + x[1] }}
          </div>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
  
<script>
import { computed, ref, watchEffect } from "vue";

import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  ComboboxLabel,
} from '@headlessui/vue'

export default {
  name: 'CraftLevelCombobox',
  components: {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    ComboboxLabel
  },
  emits: ['update-craft-level'],
  props: {
    craftMaterials: Object
  },
  setup(props, { emit }) {
    emit('update-craft-level');
    const query = ref('');
    const materials = ref(props.craftMaterials);
    const selectedLevel = ref(undefined);

    const filteredLevels = computed(() =>
      query.value === ''
        ? props.craftMaterials.possibleBounds
        : props.craftMaterials.possibleBounds.filter((x) => {
          return x.toString().toLowerCase().includes(query.value.toLowerCase())
        }));

    watchEffect(() => selectedLevel.value = props.craftMaterials.possibleBounds[0])
    return { query, emit, filteredLevels, selectedLevel, materials }
  }
}
</script>
  