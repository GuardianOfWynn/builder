<template>
  <div class="flex gap-x-2">
    <div class="border-[1px] flex items-center justify-center h-24 w-24 p-2 rounded-md border-purple-600">
      <ItemTypeIcon :item-type="type" />
    </div>
    <Combobox placeholder="No item" immediate :defaultValue="undefined" nullable @update:modelValue="value => handleUpdate(value)" v-model="selectedItem" name="assignee" class="">
        <div class="font-minecraft relative">
          <ComboboxInput :spellcheck="false" class="text-sm border-purple-600 border-[1px] h-1/2 text-white bg-mc-bg rounded-md p-1 px-3 w-full outline-none "
            @change="query = $event.target.value"
            :displayValue="(item: any) => {
              return item === null || item === undefined || item.name === undefined ? '' : item.name
            }"/>
          <ComboboxOptions class="absolute z-10 flex flex-col align-middle">
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

import { computed, ref, watchEffect } from 'vue';
import ItemTypeIcon from '../ItemTypeIcon.vue';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/vue';
import { ItemType, getItemsOf, getWeapons } from '../../scripts/util';
import { WynnItem } from '../../model/item';

export default {
  name: 'ItemSelector',
  props: {
    itemType: String,
  },
  setup(props, {emit}) {

    const type = ref(props.itemType);
    const query = ref('');
    const itemList = props.itemType === 'weapon' ? getWeapons() : getItemsOf(props.itemType as ItemType);
    const selectedItem = ref(null);

    function handleUpdate(val: WynnItem) {
      type.value = val.type;
      console.log(val.type)
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
  components: { ItemTypeIcon, Combobox, ComboboxInput, ComboboxOptions, ComboboxOption }
}
</script>