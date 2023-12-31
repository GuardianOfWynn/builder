<template>
  <Combobox immediate :defaultValue="rolls![0]"
    @update:modelValue="value => $emit('update-craft-materials', value)" v-model="selectedMats" name="assignee"
    class="h-8">
    <div class="font-minecraft relative flex gap-x-4 ">
      <ComboboxInput :spellcheck="false"
        class="text-md border-purple-600 border-[1px] text-white bg-mc-bg rounded-md p-1 px-3 w-full outline-none "
        @change="query = $event.target.value" :displayValue="(x: any) => x.name" />
      <ComboboxOptions class="absolute z-10 flex flex-col right-0 top-0">
        <ComboboxOption v-for="(x, i) in filteredMaterials" :key="x.name" :value="x">
          <div v-bind:class="{ 'border-b-0': i != filteredMaterials!.length - 1, 'border-t-0': i != 0 }"
            class="cursor-pointer p-1 px-2 bg-mc-bg text-white w-full border-[1px] border-purple-600 hover:bg-purple-900">
            {{ x.name }}
          </div>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
  
<script lang="ts">
import { computed, ref, watchEffect } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
  ComboboxLabel,
} from '@headlessui/vue'
import { RecipePrototype } from "../../model/recipe";

export default {
  name: 'MaterialsCombobox',
  components: {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot, ComboboxLabel
  },
  emits: ['update-craft-materials'],
  props: {
    recipePrototypes: Array<RecipePrototype>,
    selectedPrototype: RecipePrototype
  },
  async setup(props, { emit }) {
  
    const query = ref('');
    const rolls = ref(props.recipePrototypes);
    const selectedMats = ref(props.selectedPrototype);

    const filteredMaterials = computed(() =>
      query.value === ''
        ? props.recipePrototypes
        : props.recipePrototypes!.filter((x) => {
          return x.name.toLowerCase().includes(query.value.toLowerCase())
        }));

    watchEffect(() => {
      rolls.value = props.recipePrototypes;
      selectedMats.value = rolls.value![0];
      selectedMats.value = props.selectedPrototype;
    });
    return { query, emit, filteredMaterials, selectedMats, rolls }
  }
}
</script>
  