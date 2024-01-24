<template>
  <div class="">
    <div class="text-white border-[1px] rounded-md border-mc-aqua w-fit h-fit text-md bg-ability-tree">
      <div class="p-2">
        <p class="p-2 border-b-[1px] border-mc-aqua mb-2 text-sm">{{ territory?.name }}: Bonuses</p>
        <div class=" grid grid-cols-6 grid-rows-3 gap-y-4 gap-x-4">
          <div v-for="[key, bonus] in bonuses" class="flex cursor-pointer" @contextmenu="" @mouseenter="hoveredBonus = bonus" @mouseleave="hoveredBonus = null">
            <img :src="'/builder/' + bonus.Sprite" class="w-8 h-8 pixelated"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hoveredBonus !== null" 
      @contextmenu.stop="decreaseBonusLevel"
      @click.stop="increaseBonusLevel"
      class="text-sm border-[1px] w-full h-fit text-mc-lime rounded-md mt-1 bg-mc-bg absolute border-mc-aqua p-2">
      <p class="text-sm"><span class="text-mc-light-purple">{{ hoveredBonus.Name }}</span>
        <span class="text-mc-gray"> [Lv. {{ territory!.bonuses.get(hoveredBonus.Id)!.level }}]</span>

        <span v-if="hoveredBonus.Levels.size - 1 <= territory!.bonuses.get(hoveredBonus.Id)!.level"></span>
      </p>

      <p class="text-mc-lime mt-2">Cost (per hour):</p>
      <p class="text-mc-lime">- <span class="text-mc-gray">{{ hoveredBonus.Levels.get(territory!.bonuses.get(hoveredBonus.Id)!.level)?.Cost }} {{ translateResourceName(hoveredBonus.UsedResorce)}}</span></p>

    </div>
  </div>
</template>
      
<script lang="ts">
import { Territory } from '../../ecoengine/territory';
import { BONUSES_MAP, TerritoryBonus } from '../../ecoengine/bonuses';
import { ref, Ref } from 'vue';
import { ResourceType } from '../../ecoengine/resource';

export default {
  name: 'TerritoryBonuses',
  props: {
    territory: Territory
  },
  setup(props) {
    const bonuses = ref(BONUSES_MAP);
    const hoveredBonus: Ref<TerritoryBonus | null> = ref(null);

    function decreaseBonusLevel() {
    }

    function increaseBonusLevel() {
    }


    function translateResourceName(res: ResourceType): string {
      switch(res) {
        case ResourceType.EMERALD:
          return 'Emeralds'
        case ResourceType.CROP:
          return 'Crops'
        case ResourceType.FISH:
          return 'Fishes'
        case ResourceType.WOOD:
          return 'Woods'
        case ResourceType.ORE:
          return 'Ores'
      }
    }

    return { bonuses, hoveredBonus, decreaseBonusLevel, translateResourceName, increaseBonusLevel }
  },
  components: {}
}
</script>
      