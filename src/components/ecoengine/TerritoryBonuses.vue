<template>
  <div class="">
    <div class="text-white border-[1px] rounded-md border-mc-aqua w-fit h-fit text-md bg-ability-tree">
      <div class="p-2">
        <p class="p-2 border-b-[1px] border-mc-aqua mb-2 text-sm">{{ territory?.name }}</p>
        <div class="flex gap-x-4">
          <div>
            <p class="border-b-[1px] border-mc-aqua mb-2">Actions</p>
            <div class="flex">
              <img :src='"/builder/sprites/paper.png"' class=" mx-auto w-8 h-8 cursor-pointer" @mouseenter="moveHqHovered = true" @mouseleave="moveHqHovered = false" @click="territory!.claim!.setAsHQ(territory!)"/> 
            </div>
          </div>
          <div>
            <p class="border-b-[1px] border-mc-aqua mb-2">Bonus</p>
            <div class=" grid grid-cols-6 grid-rows-3 gap-y-4 gap-x-4">
              <div v-for="[key, bonus] in bonuses" class="flex cursor-pointer" @contextmenu="decreaseBonusLevel"
                @click.stop="increaseBonusLevel" @mouseenter="hoveredBonus = bonus" @mouseleave="hoveredBonus = null">
                <img :src="'/builder/' + bonus.Sprite" class="w-8 h-8 pixelated" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :key="count" v-if="hoveredBonus !== null"
      class="text-sm border-[1px] w-full h-fit text-mc-lime rounded-md mt-1 bg-mc-bg absolute border-mc-aqua p-2">
      <p class="text-sm"><span class="text-mc-light-purple">{{ hoveredBonus.Name }}</span>
        <span class="text-mc-gray"> [Lv. {{ territory!.bonuses.get(hoveredBonus.Id)!.level }}]</span>

        <span v-if="hoveredBonus.Levels.size - 1 <= territory!.bonuses.get(hoveredBonus.Id)!.level"
          class="text-mc-dark-gray"> (Max)</span>
      </p>
      <p class="text-xs text-mc-gray" v-for="line in hoveredBonus.Description">
        {{ line }}
      </p>
      <p class="text-mc-light-purple mt-2">{{ hoveredBonus.Format.replace('{1}', getLevelObject().Value + '') }}</p>
      <p class="text-mc-lime mt-2">Cost (per hour):</p>
      <p class="text-mc-lime">- <span class="text-mc-gray">{{
        hoveredBonus.Levels.get(territory!.bonuses.get(hoveredBonus.Id)!.level)?.Cost }} {{
        translateResourceName(hoveredBonus.UsedResorce) }}</span></p>
    </div>
    <div v-if="moveHqHovered" class="border-[1px] w-full h-fit text-mc-lime rounded-md mt-1 bg-mc-bg absolute border-mc-aqua p-2">
      <p class="text-mc-aqua text-md">Set as HQ</p>
      <p class="text-xs text-mc-gray">Set this territory as your guild's headquarters</p>
      <p class="text-mc-aqua text-xs mt-2">HQ Bonuses</p>
      <p class="text-mc-aqua text-xs">- <span class="text-mc-gray">+525% Guild Tower Health</span></p>
      <p class="text-mc-aqua text-xs">- <span class="text-mc-gray">+525% Guild Tower Damage</span></p>
      <p class="text-mc-dark-gray text-xs">Holding more territories and creating links increases the HQ Bonus</p>
      <p class="text-mc-gray text-xs mt-2">To gain resource from your other territories, you must link them to your headquarters</p>
    </div>
  </div>
</template>
      
<script lang="ts">
import { Territory } from '../../ecoengine/territory';
import { BONUSES_MAP, TerritoryBonus, BonusLevel } from '../../ecoengine/bonuses';
import { ref, Ref } from 'vue';
import { ResourceType } from '../../ecoengine/resource';
import { UpgradeLevel } from '../../ecoengine/upgrades';

export default {
  name: 'TerritoryBonuses',
  props: {
    territory: Territory
  },
  emits: ['hq-changed'],
  setup(props) {
    const bonuses = ref(BONUSES_MAP);
    const hoveredBonus: Ref<TerritoryBonus | null> = ref(null);
      const moveHqHovered = ref(false);
    const count = ref(0)

    function decreaseBonusLevel() {
      let currentStats = props.territory!.bonuses.get(hoveredBonus.value!.Id)!
      if (currentStats.level <= 0) {
        return;
      }
      currentStats.level = currentStats.level - 1;
      props.territory?.bonuses.set(hoveredBonus.value!.Id, currentStats)
      count.value++;
    }

    function increaseBonusLevel() {
      let currentStats = props.territory!.bonuses.get(hoveredBonus.value!.Id)!
      if (currentStats.level >= hoveredBonus.value!.Levels.size - 1) {
        return;
      }
      currentStats.level = currentStats.level + 1;
      props.territory?.bonuses.set(hoveredBonus.value!.Id, currentStats)
      count.value++;
    }

    function getLevelObject(): BonusLevel {
      return hoveredBonus.value!.Levels.get(props.territory!.bonuses.get(hoveredBonus.value!.Id)!.level)!
    }


    function translateResourceName(res: ResourceType): string {
      switch (res) {
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

    return { bonuses, hoveredBonus, decreaseBonusLevel, translateResourceName, increaseBonusLevel, getLevelObject, count, moveHqHovered }
  },
  components: {}
}
</script>
      