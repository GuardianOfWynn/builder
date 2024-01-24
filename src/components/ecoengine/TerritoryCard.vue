<template>
  <div class="bg-mc-bg text-mc-light-purple border-mc-aqua border-2 w-fit h-fit"
    v-if="territory != null">
    <div class="p-4">
      <p class="text-md text-mc-light-purple mb-2">[{{territory.claim?.guild.tag}}] {{territory.claim?.guild.name}}</p>
      <div :key="count" v-for="res in resourcesFormat">
        <p :class="'text-' + res.color" v-if="terr!.getProducedResourceType(res.type) > 0">
          +{{ terr!.getProducedResourceType(res.type) * 3600 }} {{ res.name }} per hour
        </p>
        <p :class="'text-' + res.color" v-if="terr!.getStoredResource(res.type) > 0">
          {{ terr!.getStoredResource(res.type) }}/{{ res.type === ResourceType.EMERALD ?
            terr!.getEmeraldStorageSize() : terr!.getResourceStorageSize() }} {{ res.name }} stored
        </p>
      </div>
      <p v-if="territory.HQ" class="text-mc-dark-red mt-4">Guild Headquarters</p>
    </div>
    <div class="border-t-2 border-mc-aqua p-2">
      <p>{{ terr!.name }}</p>
    </div>
  </div>
</template>
    
<script lang="ts">
import { ref, watchEffect } from 'vue'
import { ResourceType } from '../../ecoengine/resource';
import { Territory } from '../../ecoengine/territory';


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

    return { ResourceType, resourcesFormat, terr, count }
  },
  components: {}
}
</script>
    