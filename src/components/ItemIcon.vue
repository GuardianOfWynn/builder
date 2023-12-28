<template>
    <div class="flex items-center justify-center h-20 z-10 w-20">
        <img class="pixelated w-full h-full object-contain" v-if="item !== null && item != undefined" :src="'/builder/sprites/' + getSprite()"/>    
    </div>
</template>

<script lang="ts">

import {PropType, ref,watchEffect} from 'vue';
import { WynnItem } from '../model/item';
import { isArmour } from '../scripts/crafter';

export default {
  name: 'ItemTypeIcon',
  props: {
    item: { 
      type: null as unknown as PropType<WynnItem | null>,
      default: null, required: true
    }
  },
  setup(props) {

    const item = ref(props.item);
    
    function getSprite() {
        if(isArmour(item.value?.type!)) {
          console.log(item.value?.armorType + "_" + item.value?.type + ".webp")
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