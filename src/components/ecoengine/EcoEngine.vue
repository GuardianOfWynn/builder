<template>
  <div class="font-minecraft min-w-max flex justify-center p-32" @click="selectedTerritory = null">
    <div class="relative">
      <div>
        <div class="grid grid-cols-9 grid-rows-6 w-fit ">
          <div class="col-span-2"></div>
          <div class="col-span-4 bg-no-repeat bg-cover bg-map11 w-[1024px] h-[1024px] pixelated "></div>
          <div class="col-span-2"></div>
          <div class="col-span-3 bg-no-repeat bg-cover bg-map21 w-[1536px] h-[1024px] pixelated"></div>
          <div class="col-span-4 bg-no-repeat bg-cover bg-map22 w-[2048px] h-[1024px] pixelated"></div>
          <div class="col-span-2 bg-no-repeat bg-cover bg-map23 w-[1024px] h-[1024px] pixelated"></div>
          <div class="col-span-3 bg-no-repeat bg-cover bg-map31 w-[1536px] h-[1024px] pixelated"></div>
          <div class="col-span-4 bg-no-repeat bg-cover bg-map32 w-[2048px] h-[1024px] pixelated"></div>
          <div class="col-span-2 bg-no-repeat bg-cover bg-map33 w-[1024px] h-[1024px] pixelated"></div>
          <div class="col-span-3 bg-no-repeat bg-cover bg-map41 w-[1536px] h-[1024px] pixelated"></div>
          <div class="col-span-4 bg-no-repeat bg-cover bg-map42 w-[2048px] h-[1024px] pixelated"></div>
          <div class="col-span-2 bg-no-repeat bg-cover bg-map43 w-[1024px] h-[1024px] pixelated"></div>
          <div class="col-span-3 bg-no-repeat bg-cover bg-map51 w-[1536px] h-[1024px] pixelated"></div>
          <div class="col-span-4 bg-no-repeat bg-cover bg-map52 w-[2048px] h-[1024px] pixelated"></div>
          <div class="col-span-2 bg-no-repeat bg-cover bg-map53 w-[1024px] h-[1024px] pixelated"></div>
          <div class="col-span-3 bg-no-repeat bg-cover bg-map61 w-[1536px] h-[1024px] pixelated"></div>
          <div class="col-span-4 bg-no-repeat bg-cover bg-map62 w-[2048px] h-[1024px] pixelated"></div>
          <div class="col-span-2 bg-no-repeat bg-cover bg-map63 w-[1024px] h-[1024px] pixelated"></div>
          <div class="col-span-3 bg-no-repeat bg-cover bg-map71 w-[1536px] h-[1024px] pixelated"></div>
          <div class="col-span-4 bg-no-repeat bg-cover bg-map72 w-[2048px] h-[1024px] pixelated"></div>
          <div class="col-span-2 bg-no-repeat bg-cover bg-map73 w-[1024px] h-[1024px] pixelated"></div>
        </div>
      </div>
      <span v-for="terr in territories" @mouseenter="hoveredTerritory = terr" @mouseleave="hoveredTerritory = null"
        @click.stop="selectedTerritory = terr;"
        class="cursor-pointer text-center text-lg z-20 text-white my-auto border-4 absolute"
        :style="{ left: terr.getTerritoryStartX() + 'px', bottom: terr.getTerritoryStartZ() + 'px', width: terr.getTerritoryWidth() + 'px', height: terr.getTerritoryHeight() + 'px', borderColor: terr.claim?.guild.color }">
        <div :style="{ opacity: 0.3, width: '100%', height: '100%', backgroundColor: terr.claim?.guild.color }"></div>
        <div class="absolute top-4 bottom-4 left-4 right-4">
          <img class="mx-auto pixelated mb-4 w-8" v-if="terr.HQ" :src="'/builder/guild_headquarters.png'" />
          <p class="text-xl"
            :style="{ color: terr.claim?.guild.color, textShadow: '2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -2px 2px #000' }">
            {{ terr.claim?.guild.tag }}
          </p>
        </div>
      </span>
      <span v-once v-for="conn in connections" class="w-[1.5px] bg-black absolute"
        :style="{ transform: 'rotate(' + getConnectionAngle(conn) + 'rad)', transformOrigin: 'bottom left', height: getConnectionHeight(conn) + 'px', bottom: conn.from!.getTerritoryCenterZ() + 'px', left: conn.from!.getTerritoryCenterX() + 'px' }">

      </span>
      <!--span
        class="fixed right-4 top-4 cursor-pointer border-mc-aqua text-sm bg-slate-800 text-mc-lime flex gap-x-4 rounded-md border-2 p-2 px-4">
        <img src="/builder/wynncraft.png" class="w-6 h-6" />
        <p class="my-auto">Import from WynnCraft</p>
      </span-->
      <span v-if="selectedTerritory != null">
        {{ selectedTerritory.name }} Bonuses and upgrades
      </span>
      <div class="fixed z-40 left-0 top-0">
        <TerritoryCard class="ml-2 mt-2" v-if="hoveredTerritory !== null" :territory="hoveredTerritory" />
      </div>
      <TerritoryBonuses @hq-changed="" v-if="selectedTerritory !== null" class="absolute z-50"
        :style="{ bottom: selectedTerritory.getTerritoryStartZ() + selectedTerritory.getTerritoryHeight() + 2 + 'px', left: selectedTerritory.getTerritoryStartX() + 'px' }"
        :territory="selectedTerritory" />
    </div>
  </div>
</template>
  
<script lang="ts">

import { Ref, ref, onMounted } from "vue";
import { EngineInstance, createEngineFromMap } from "../../ecoengine/engine"
import { SKY_CLAIM_PRESET, TERRITORIES } from "../../model/ecoengine/ecoengine"
import { Territory } from "../../ecoengine/territory";
import TerritoryCard from "../ecoengine/TerritoryCard.vue"
import TerritoryBonuses from "./TerritoryBonuses.vue";
import { ResourceType } from "../../ecoengine/resource";
import { importGuildMap } from "../../ecoengine/wynncraft";

export default {
  name: 'EcoEngine',
  props: {
  },
  async setup() {

    const gMap = await importGuildMap();
    if (EngineInstance === null) {
      createEngineFromMap(gMap)
    }
    EngineInstance!.Start();

    const selectedTerritory: Ref<Territory | null> = ref(null);
    const hoveredTerritory: Ref<Territory | null> = ref(null);
    const territories = EngineInstance?.guildMap.territories;
    const count = ref(0);
    const connections: Ref<any[]> = ref([]);


    territories?.forEach(x => {
      let c = x.connections.map(y => EngineInstance!.guildMap.getTerritory(y))
      c.forEach(a => {
        connections.value.push({
          fromX: x.getTerritoryCenterX(),
          toX: a!.getTerritoryCenterX(),
          fromZ: x.getTerritoryCenterZ(),
          toZ: a!.getTerritoryCenterZ(),
          from: x,
          to: a!
        })
      })
    })

    function getConnectionAngle(conn: any): number {
      return Math.atan2(conn.toX - conn.fromX, conn.toZ - conn.fromZ)
    }

    function getConnectionHeight(conn: any): number {
      return Math.sqrt(Math.pow(conn.fromX - conn.toX, 2) + Math.pow(conn.fromZ - conn.toZ, 2))
    }

    function triggerHQChanged() {

    }

    return { territories, hoveredTerritory, ResourceType, connections, getConnectionAngle, getConnectionHeight, selectedTerritory, count }
  },
  components: { TerritoryCard, TerritoryBonuses }
}
</script>
  