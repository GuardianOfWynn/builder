<template>
  <div class="">
    <div class="text-white border-[1px] rounded-md border-mc-aqua w-fit h-fit text-md bg-mc-bg">
      <div class="p-2">
        <p class="mb-2">{{ territory?.name }}: Bonuses</p>
        <div class=" grid grid-cols-6 grid-rows-3 gap-y-2 gap-x-2">
          <div v-for="[key, bonus] in bonuses" class="flex" @mouseenter="hoveredBonus = bonus" @mouseleave="hoveredBonus = null">
            <div class="w-8 h-8 bg-yellow-600"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hoveredBonus !== null" class="border-[1px] w-full h-fit text-mc-lime mt-2 bg-mc-bg absolute border-mc-aqua p-2">
  
      {{ hoveredBonus.Name }}

    </div>
  </div>
</template>
      
<script lang="ts">
import { Territory } from '../../ecoengine/territory';
import { BONUSES_MAP, TerritoryBonus } from '../../ecoengine/bonuses';
import { ref, Ref } from 'vue';

export default {
  name: 'TerritoryBonuses',
  props: {
    territory: Territory
  },
  setup(props) {
    const bonuses = ref(BONUSES_MAP);
    const hoveredBonus: Ref<TerritoryBonus | null> = ref(null);
    return { bonuses, hoveredBonus }
  },
  components: {}
}
</script>
      