<template>
  <div class="bg-mc-bg text-mc-light-purple border-mc-aqua border-2 w-fit h-fit"
    v-if="territory != null"> 
    <div class="p-4">
      <p class="text-sm text-mc-light-purple mb-2">[{{territory.claim?.guild.tag}}] {{territory.claim?.guild.name}}</p>
      <div class="text-sm" :key="count" v-for="res in resourcesFormat">
        <p :class="'text-' + res.color" v-if="terr!.getProducedResourceType(res.type) > 0">
          +{{ terr!.getProducedResourceType(res.type) * 3600 }} {{ res.name }} per hour
        </p>
        <p :class="'text-' + res.color" v-if="terr!.getStoredResource(res.type) > 0">
          {{ terr!.getStoredResource(res.type) }}/{{ res.type === ResourceType.EMERALD ?
            terr!.getEmeraldStorageSize() : terr!.getResourceStorageSize() }} {{ res.name }} stored
        </p>
      </div>
      <p v-if="territory.HQ" class="text-mc-dark-red mt-4 text-sm">Guild Headquarters</p>
      <p class="text-mc-yellow mt-2 text-sm">Treasury: 
        <span v-if="territory.treasury == Treasury.VERY_LOW" class="text-mc-dark-green">Very Low</span>
        <span v-if="territory.treasury == Treasury.LOW" class="text-mc-lime">Low</span>
        <span v-if="territory.treasury == Treasury.MEDIUM" class="text-mc-yellow">Medium</span>
        <span v-if="territory.treasury == Treasury.HIGH" class="text-mc-red">High</span>
        <span v-if="territory.treasury == Treasury.VERY_HIGH" class="text-mc-aqua">Very High</span>
      </p>
      <p class="text-mc-light-purple text-sm">&#10022 Treasury Bonus: 
        <span class="text-white">{{ territory.getTreasuryBonus() * 100 }}%</span>
      </p>
      <p class="text-mc-light-purple mt-2">Upgrades</p>
      <p class="text-mc-light-purple text-xs" v-for="[upg, lvl] in territory.upgrades">
        - <span class="text-white">{{ UPGRADES.get(upg)!.Name }}</span> 
        <span class="text-mc-dark-gray ">[Lv. {{ !lvl.activated ? '1' : lvl.level }}]</span>
        <span class="text-mc-red" v-if="!lvl.activated"> (Unavailable)</span>
      </p>
      <p class="text-mc-light-purple text-xs" v-for="[bon, lvl] in territory.bonuses" v-show="lvl.activated && lvl.level > 0">
        - <span class="text-white">{{ BONUSES_MAP.get(bon)!.Name }}</span>
        <span class="text-mc-dark-gray ">[Lv. {{ lvl.level }}]</span>
        <span class="text-mc-red" v-if="!lvl.activated"> (Unavailable)</span>
      </p>
    </div>
    <div class="border-t-2 border-mc-aqua p-2">
      <p>{{ terr!.name }}</p>
    </div>
  </div>
</template>
    
<script lang="ts">
import { ref, watchEffect } from 'vue'
import { ResourceType } from '../../ecoengine/resource';
import { Territory, Treasury } from '../../ecoengine/territory';
import { UPGRADES } from '../../ecoengine/upgrades';
import { BONUSES_MAP } from '../../ecoengine/bonuses';


export default {
  name: 'TerritoryCard',
  props: {
    territory: Territory
  },
  setup(props) {

    const terr = ref(props.territory);

    // vue reactivity tricky to update component. must refactor this later
    const count = ref(0);

    watchEffect(() => {
      terr.value = props.territory
    })
    const resourcesFormat = ref([
      {
        type: ResourceType.EMERALD,
        color: "mc-lime",
        name: "Emeralds"
      },
      {
        type: ResourceType.ORE,
        color: "white",
        name: "Ores"
      },
      {
        type: ResourceType.WOOD,
        color: "mc-gold",
        name: "Woods"
      },
      {
        type: ResourceType.FISH,
        color: "mc-aqua",
        name: "Fishes"
      },
      {
        type: ResourceType.CROP,
        color: "mc-yellow",
        name: "Crops"
      },
    ])
    setInterval(() => count.value = count.value++, 4000)

    return { ResourceType, resourcesFormat, terr, count, Treasury, UPGRADES, BONUSES_MAP}
  },
  components: {}
}
</script>
    