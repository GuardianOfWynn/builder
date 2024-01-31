<template>
  <div class="w-fit" @click.stop="">
    <div class="text-white border-[1px] rounded-md border-mc-aqua w-full h-fit text-md bg-ability-tree">
      <div class="p-2">
        <p class="p-2 border-b-[1px] border-mc-aqua mb-2 text-sm">{{ territory?.name }}</p>
        <div class="flex gap-x-4">
          <div>
            <p class="border-b-[1px] border-mc-aqua mb-2">Actions</p>
            <div class="flex">
              <img :src='"/builder/sprites/paper.png"' class=" mx-auto w-8 h-8 cursor-pointer"
                @mouseenter="moveHqHovered = true" @mouseleave="moveHqHovered = false"
                @click="territory!.claim!.setAsHQ(territory!)" />
            </div>
          </div>
          <div class="flex flex-col gap-y-1">
            <p class="border-b-[1px] border-mc-aqua mb-2">Taxes</p>
            <div class="flex gap-x-2">
              <div class="">
                <div class="flex gap-x-2">
                  <img :src='"/builder/sprites/emerald.png"' class="w-6 h-6 cursor-pointer" />
                  <p class="text-xs my-auto">Tax (%)</p>
                </div>
                <input type="number" v-model="currentTax" class="font-jetbrains text-sm w-28 border-b-2 border-mc-aqua outline-none bg-transparent  " @mousemove.stop="" @click.stop="" />
              </div>
              <div class="">
                <div class="flex gap-x-2">
                  <img :src='"/builder/sprites/emerald.png"' class="w-6 h-6 cursor-pointer" />
                  <p class="text-xs my-auto">Ally Tax (%)</p>
                </div>
                <input type="number" v-model="currentAllyTax" class="font-jetbrains text-sm w-28 border-b-2 border-mc-aqua outline-none bg-transparent  " @mousemove.stop="" @click.stop="" />
              </div>
            </div>
            <div class="">
              <div class="flex gap-x-2">
                <img :src='"/builder/sprites/emerald.png"' class="w-6 h-6 cursor-pointer" />
                <p class="text-xs my-auto">Global tax (%)</p>
              </div>
              <input type="number" v-model="currentGlobalTax" class="font-jetbrains text-sm w-full border-b-2 border-mc-aqua outline-none bg-transparent  " @mousemove.stop="" @click.stop="" />
            </div>
            <div class="w-full text-center text-white border-[1px] border-mc-aqua mt-2 cursor-pointer">Save taxes</div>
            <div class="w-full text-center text-white border-[1px] border-mc-lime cursor-pointer">Save global tax</div>
          </div>
          <div>
            <p class="border-b-[1px] border-mc-aqua mb-2">Bonus</p>
            <div v-for="y of 3" class="flex mt-2 gap-x-2">
              <div v-for="x of 7">
                <div v-if="getBonusByPosition(x - 1, y - 1) !== undefined" class="cursor-pointer"
                  @contextmenu="decreaseBonusLevel" @click.stop="increaseBonusLevel"
                  @mouseenter="hoveredBonus = getBonusByPosition(x - 1, y - 1)!" @mouseleave="hoveredBonus = null">
                  <img :src="'/builder/' + getBonusByPosition(x - 1, y - 1)!.Sprite" class="w-7 h-7 pixelated" />
                </div>
              </div>
            </div>
            <p class="border-b-[1px] border-mc-aqua mt-2 mb-2">Upgrades</p>
            <div class="flex gap-x-2">
              <div v-for="[upgrade, lvl] in territory!.upgrades">
                <div class="cursor-pointer"
                    @contextmenu="decreaseUpgradeLevel" @click.stop="increaseUpgradeLevel"
                    @mouseenter="hoveredUpgrade = UPGRADES.get(upgrade)!" @mouseleave="hoveredUpgrade = null">
                    <img :src="'/builder/' + UPGRADES.get(upgrade)!.Sprite" class="w-7 h-7 pixelated" />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :key="count" v-if="hoveredBonus !== null"
        class="text-sm border-[1px] w-fit h-fit text-mc-lime rounded-md mt-1 bg-mc-bg absolute border-mc-aqua p-2">
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
        <p class="text-mc-gray mt-2">Left-click to increase</p>
        <p class="text-mc-gray mt-2">Right-click to decrease</p>
      </div>
      <div v-if="moveHqHovered"
        class="border-[1px] w-fit h-fit text-mc-lime rounded-md mt-1 bg-mc-bg absolute border-mc-aqua p-2">
        <p class="text-mc-aqua text-md">Set as HQ</p>
        <p class="text-xs text-mc-gray">Set this territory as your guild's headquarters</p>
        <p class="text-mc-aqua text-xs mt-2">HQ Bonuses</p>
        <p class="text-mc-aqua text-xs">- <span class="text-mc-gray">+525% Guild Tower Health</span></p>
        <p class="text-mc-aqua text-xs">- <span class="text-mc-gray">+525% Guild Tower Damage</span></p>
        <p class="text-mc-dark-gray text-xs">Holding more territories and creating links increases the HQ Bonus</p>
        <p class="text-mc-gray text-xs mt-2">To gain resource from your other territories, you must link them to your
          headquarters</p>
      </div>
    </div>
  </div>
</template>
      
<script lang="ts">
import { Territory } from '../../ecoengine/territory';
import { BONUSES_MAP, TerritoryBonus, BonusLevel } from '../../ecoengine/bonuses';
import { ref, Ref, watchEffect } from 'vue';
import { ResourceType } from '../../ecoengine/resource';
import { TerritoryUpgrade, UPGRADES, UpgradeLevel } from '../../ecoengine/upgrades';
import * as bonus from '../../ecoengine/bonuses';

export default {
  name: 'TerritoryBonuses',
  props: {
    territory: Territory
  },
  emits: ['hq-changed'],
  setup(props) {
    const bonuses = ref(BONUSES_MAP);
    const hoveredBonus: Ref<TerritoryBonus | null> = ref(null);
    const hoveredUpgrade: Ref<TerritoryUpgrade | null> = ref(null);
    const moveHqHovered = ref(false);
    const count = ref(0);
    const currentTax = ref(0);
    const currentAllyTax = ref(0);
    const currentGlobalTax = ref(0);

    watchEffect(() => {
      if(props.territory === undefined || props.territory === null) {
        currentTax.value = 0;
        currentAllyTax.value = 0;
        currentGlobalTax.value = 0;
        return;
      }
      currentTax.value = props.territory!.tax;
      currentAllyTax.value = props.territory!.allyTax;
    })

    const bonusesPositioning = ref([
      {
        column: 0,
        row: 0,
        bonus: bonus.STRONGER_MINIONS
      },
      {
        column: 1,
        row: 0,
        bonus: bonus.MULTI_HIT,
      },
      {
        column: 2,
        row: 0,
        bonus: bonus.TOWER_AURA,
      },
      {
        column: 3,
        row: 0,
        bonus: bonus.TOWER_VOLLEY,
      },
      {
        column: 0,
        row: 1,
        bonus: bonus.GATHERING_XP,
      },
      {
        column: 1,
        row: 1,
        bonus: bonus.MOB_XP,
      },
      {
        column: 2,
        row: 1,
        bonus: bonus.MOB_DAMAGE,
      },
      {
        column: 3,
        row: 1,
        bonus: bonus.PVP_DAMAGE,
      },
      {
        column: 4,
        row: 1,
        bonus: bonus.XP_SEEKING,
      },
      {
        column: 5,
        row: 1,
        bonus: bonus.TOME_SEEKING,
      },
      {
        column: 6,
        row: 1,
        bonus: bonus.EMERALD_SEEKING,
      },
      {
        column: 0,
        row: 2,
        bonus: bonus.LARGER_RESOURCE_STORAGE,
      },
      {
        column: 1,
        row: 2,
        bonus: bonus.LARGER_EMERALD_STORAGE,
      },
      {
        column: 2,
        row: 2,
        bonus: bonus.EFFICIENT_RESOURCES,
      },
      {
        column: 3,
        row: 2,
        bonus: bonus.EFFICIENT_EMERALDS,
      },
      {
        column: 4,
        row: 2,
        bonus: bonus.RESOURCE_RATE,
      },
      {
        column: 5,
        row: 2,
        bonus: bonus.EMERALD_RATE,
      }
    ])

    function getBonusByPosition(x: number, y: number): TerritoryBonus | undefined {
      return bonusesPositioning.value.filter(a => a.column == x && a.row == y)[0]?.bonus
    }

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

    function decreaseUpgradeLevel() {
      let currentStats = props.territory!.upgrades.get(hoveredUpgrade.value!.Id)!
      if (currentStats.level <= 0) {
        return;
      }
      currentStats.level = currentStats.level - 1;
      props.territory?.upgrades.set(hoveredUpgrade.value!.Id, currentStats)
      count.value++;
    }

    function increaseUpgradeLevel() {
      let currentStats = props.territory!.upgrades.get(hoveredUpgrade.value!.Id)!
      if (currentStats.level >= hoveredUpgrade.value!.Levels.length - 1) {
        return;
      }
      currentStats.level = currentStats.level + 1;
      props.territory?.upgrades.set(hoveredUpgrade.value!.Id, currentStats)
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

    return { bonuses, hoveredBonus, bonusesPositioning, hoveredUpgrade, currentTax, currentAllyTax, UPGRADES, currentGlobalTax, decreaseBonusLevel, getBonusByPosition, translateResourceName, increaseBonusLevel, decreaseUpgradeLevel, increaseUpgradeLevel, getLevelObject, count, moveHqHovered }
  },
  components: {}
}
</script>
      