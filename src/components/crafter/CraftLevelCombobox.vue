<template>
  <Combobox immediate :defaultValue="rolls![0]"
    @update:modelValue="value => $emit('update-craft-level', value)" 
    v-model="selectedLevel" name="assignee" class="h-8">
    <div class="font-minecraft relative flex gap-x-4 ">
      <ComboboxInput :spellcheck="false"
        class="text-md border-purple-600 border-[1px] text-white bg-mc-bg rounded-md p-1 px-3 w-full outline-none "
        :displayValue="(x: any) => x.minimum + '-' + x.maximum"
           />
      <ComboboxOptions class="absolute z-10 flex flex-col right-0 top-0">
        <ComboboxOption v-for="(x, i) in rolls" :key="x.id" :value="x.levelRange">
          <div v-bind:class="{ 'border-b-0': i != rolls.length - 1, 'border-t-0': i != 0 }"
            class="cursor-pointer p-1 px-2 bg-mc-bg text-white w-full border-[1px] border-purple-600 hover:bg-purple-900">
            {{ x.levelRange.minimum + "-" + x.levelRange.maximum }}
          </div>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
  
<script lang="ts">
import { computed, ref, watchEffect, Ref } from "vue";

import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  ComboboxLabel,
} from '@headlessui/vue'
import { NumberRange } from "../../scripts/util";
import { LevelRanges, RecipePrototype } from "../../model/recipe";

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
    recipe: RecipePrototype,
    level: LevelRanges
  },
  setup(props, { emit }) {
    const rolls: Ref<LevelRanges[]> = ref(props.recipe!.levels);
    const selectedLevel: Ref<NumberRange | undefined> = ref(props.level?.levelRange);
    watchEffect(() => {
      rolls.value = props.recipe!.levels;
      selectedLevel.value = props.recipe!.levels[0].levelRange;
      selectedLevel.value = props.level?.levelRange;
    });
    return { emit, selectedLevel, rolls }
  }
}
</script>
  