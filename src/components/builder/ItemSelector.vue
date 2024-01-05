<template>
  <div>
    <div class="flex gap-x-2">
      <div class="relative">
        <div
          class="scale-90 border-[1px] my-auto pixel-corners flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] to-mc-bg h-20 w-20 p-2"
          :class="selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'mythic' ? 'from-mc-dark-purple'
            : selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'legendary' ? 'from-mc-aqua'
              : selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'fabled' ? 'from-mc-red'
                : selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'set' ? 'from-mc-lime'
                  : selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'rare' ? 'from-mc-light-purple'
                    : selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'unique' ? 'from-mc-yellow'
                      : selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'normal' ? 'from-white'
                        : selectedItem !== null && !selectedItem?.isCrafted ? 'from-mc-dark-aqua' : 'from-mc-bg'
            ">
          <ItemIcon :item="selectedItem" class="" />
        </div>
      </div>
      <div class="">
        <Combobox v-if="rollType == 'generic'" placeholder="No item" immediate :defaultValue="undefined" nullable @update:modelValue="handleUpdate"
          v-model="selectedItem" name="assignee" class="">
          <div class="font-minecraft relative">
            <ComboboxInput :spellcheck="false"
              class="text-md border-b-4 border-t-0 border-x-0 border-purple-600 border-[1px] h-7 text-white bg-mc-bg w-full outline-none "
              @change="query = $event.target.value" :displayValue="(item: any) => {
                return item === null || item === undefined || item.name === undefined ? '' : item.name
              }" />
            <ComboboxOptions class="absolute overflow-y-scroll hide-scroll h-96 z-30 flex flex-col align-middle">
              <ComboboxOption v-for="(item, i) in filteredItems" :key="item.id" :value="item">
                <div v-bind:class="{ 'border-b-0': i != filteredItems.length - 1, 'border-t-0': i != 0 }"
                  class="flex gap-x-2 cursor-pointer p-1 px-2 bg-mc-bg text-white w-full border-[1px] border-purple-600 hover:bg-purple-900">
                  <div class="w-6 h-6 my-auto">
                    <ItemIcon :item="item" />
                  </div>
                  <span>{{ item.name }}</span>
                </div>
              </ComboboxOption>
            </ComboboxOptions>
          </div>
        </Combobox>
        <input v-else-if="rollType == 'crafted'" :v-model="recipeHash" 
          class="text-md border-b-4 border-t-0 border-x-0 border-purple-600 border-[1px] h-7 text-white bg-mc-bg w-full outline-none "/>
        <input v-else-if="rollType == 'specific'" :v-model="specificRoll" 
          class="text-md border-b-4 border-t-0 border-x-0 border-purple-600 border-[1px] h-7 text-white bg-mc-bg w-full outline-none "/>
        <div v-if="!isAccessory(type as ItemType)">
          <input :v-model="powders" placeholder="Powder pattern: t6 f5 w4 a3 e2" class="outline-none bg-mc-bg text-white text-sm px-2 rounded-sm border-[1px] border-purple-600 text0white h-6 mt-2 w-full" />
        </div>
        <div class="w-fit mt-2">
          <RadioGroup  v-model="rollType" class="text-white w-full gap-x-4 flex text-xs">
            <RadioGroupOption v-for="type in Object.values(ItemRollType)" v-slot="{ checked }" :value="type">
              <div class="flex gap-x-2">
                <div class="h-[16px] w-[16px] border-mc-aqua border-[1px]">
                  <div v-if="checked" class="h-[10px] w-[10px] bg-mc-aqua mx-auto mt-[2px]"></div>
                </div>
                <span>{{ type[0].toUpperCase() + type.substring(1) }}</span>
              </div>
            </RadioGroupOption>
          </RadioGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Ref, computed, ref, watch } from 'vue';
import ItemTypeIcon from '../ItemTypeIcon.vue';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { ItemRollType, ItemType, getItemsOf, getWeapons } from '../../scripts/util';
import { WynnBaseItem, WynnItem } from '../../model/item';
import ItemIcon from '../ItemIcon.vue';
import { isAccessory } from '../../scripts/crafter';

export default {
  name: 'ItemSelector',
  props: {
    itemType: String,
  },
  emits: ['update-item'],
  setup(props, { emit }: any) {

    const type = ref(props.itemType);
    const rollType = ref(ItemRollType.GENERIC);
    const specificRoll = ref("");
    const recipeHash = ref("");
    const powders = ref("");
    const query = ref('');
    const itemList = props.itemType === 'weapon' ? getWeapons() : getItemsOf(props.itemType as ItemType);
    const selectedItem: Ref<WynnBaseItem | null> = ref(null);

    function handleUpdate(val: WynnItem) {
      type.value = val.type;
      emit('update-item', val)
    }

    const filteredItems = computed(() =>
      query.value === ''
        ? itemList.slice(0, 20)
        : itemList.filter((i) => {
          return i.name.toLowerCase().includes(query.value.toLowerCase())
        }).slice(0, 20));

    watch(rollType, () => {
      selectedItem.value = null;
    })

    return { selectedItem, filteredItems, query, type, rollType,specificRoll, emit,isAccessory,powders,recipeHash, ItemRollType, handleUpdate }
  },
  components: { ItemTypeIcon, Combobox, ComboboxInput, ComboboxOptions, ComboboxOption, ItemIcon, RadioGroup, RadioGroupLabel, RadioGroupOption }
}
</script>