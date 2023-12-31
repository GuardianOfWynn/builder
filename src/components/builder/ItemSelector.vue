<template>
  <div class="flex gap-x-2">
    <div class="relative">
      <div class="border-[1px] my-auto pixel-corners flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] to-mc-bg h-20 w-20 p-2"
        :class="selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'mythic' ? 'from-mc-dark-purple' 
        : selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'legendary' ? 'from-mc-aqua'
        : selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'fabled' ? 'from-mc-red'
        : selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'set' ? 'from-mc-lime'
        : selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'rare' ? 'from-mc-light-purple'
        : selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'unique' ? 'from-mc-yellow'
        : selectedItem !== null && !selectedItem?.isCrafted && (<WynnItem><unknown>selectedItem).tier == 'normal' ? 'from-white' 
        : selectedItem !== null && !selectedItem?.isCrafted ? 'from-mc-dark-aqua' : 'from-mc-bg'
        ">
        <ItemIcon :item="selectedItem" class=""/>
      </div>
    </div>
    <Combobox placeholder="No item" immediate :defaultValue="undefined" nullable @update:modelValue="handleUpdate" v-model="selectedItem" name="assignee" class="">
        <div class="font-minecraft relative">
          <ComboboxInput :spellcheck="false" class="text-md border-b-4 border-t-0 border-x-0 border-purple-600 border-[1px] h-1/2 text-white bg-mc-bg p-1 px-3 w-full outline-none "
            @change="query = $event.target.value"
            :displayValue="(item: any) => {
              return item === null || item === undefined || item.name === undefined ? '' : item.name
            }"/>
          <ComboboxOptions class="absolute z-30 flex flex-col align-middle">
            <ComboboxOption
              v-for="(item, i) in filteredItems"
              :key="item.id"
              :value="item"
            >
              <div v-bind:class="{ 'border-b-0': i != filteredItems.length - 1, 'border-t-0': i != 0}" 
                class="cursor-pointer p-1 px-2 bg-mc-bg text-white w-full border-[1px] border-purple-600 hover:bg-purple-900">
                  {{ item.name }}
              </div>
            </ComboboxOption>
          </ComboboxOptions>
        </div>
      </Combobox>
  </div>
</template>

<script lang="ts">

import { Ref, computed, ref, watchEffect } from 'vue';
import ItemTypeIcon from '../ItemTypeIcon.vue';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/vue';
import { ItemTier, ItemType, getItemsOf, getWeapons } from '../../scripts/util';
import { WynnBaseItem, WynnItem } from '../../model/item';
import ItemIcon from '../ItemIcon.vue';

export default {
  name: 'ItemSelector',
  props: {
    itemType: String,
  },
  emits: ['update-item'],
  setup(props, {emit}: any) {

    const type = ref(props.itemType);
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
        }).slice(0,20)); 

      return {selectedItem, filteredItems, query, type, emit, handleUpdate}
  },
  components: { ItemTypeIcon, Combobox, ComboboxInput, ComboboxOptions, ComboboxOption, ItemIcon }
}
</script>