<template>
    <div class="flex items-center justify-center h-full z-10 w-full">
        <img class="pixelated w-full h-full object-contain" v-if="item !== null && item != undefined" :src="'/builder/sprites/' + getSprite()"/>    
    </div>
</template>

<script lang="ts">

import {PropType, ref, watchEffect} from 'vue';
import { WynnBaseItem } from '../model/item';
import { isArmour } from '../scripts/crafter';

export default {
  name: 'ItemTypeIcon',
  props: {
    item: { 
      type: null as unknown as PropType<WynnBaseItem | null>,
      default: null, required: true
    }
  },
  setup(props) {

    const item = ref(props.item);
    
    function getSprite() {
        if(isArmour(item.value?.type!)) {
            return item.value?.armorType + "_" + item.value?.type + ".webp";
        }
        return item.value?.sprite;
    }

    watchEffect(() => {
        item.value = props.item;
    })

    return {getSprite}
  },
  components: {}
}
</script>