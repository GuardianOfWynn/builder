<template>
  <div class="font-minecraft p-32 bg-mc-bg min-w-max flex justify-center" @click="selectedTerritory = null">
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
      <div class="fixed right-4 top-4 z-50">
        <p class="bg-mc-bg text-md text-mc-lime border-2 border-mc-light-purple px-4 py-2 rounded-md cursor-pointer"
          @click.stop="isSelectingRouteViewer = !isSelectingRouteViewer">{{ isSelectingRouteViewer ? 'Cancel routing overview':'Start route viewer'}}</p>
        <div class="bg-mc-bg border-[1px] text-sm border-mc-aqua p-4 mt-2"
          v-if="routeViewerFirstTerritory != null && routeViewerSecondTerritory != null">
          <p class="text-mc-aqua text-lg mb-2">Routing overview</p>
          <p class="text-mc-aqua">From: <span class="text-mc-gray">{{ routeViewerFirstTerritory!.name }}</span></p>
          <p class="text-mc-aqua mb-4">To: <span class="text-mc-gray">{{ routeViewerSecondTerritory!.name }}</span></p>
          <p class="text-mc-aqua mb-4">Style: <span class="text-mc-gray">FASTEST</span></p>
          <p class="text-mc-aqua mb-4">Total territories: <span class="text-mc-gray">{{ currentRoute!.length }}</span></p>
          <div class="text-center bg-mc-red text-white p-2 px-4 w-full rounded-sm cursor-pointer"
            @click="clearRouteViewer">Clear</div>
        </div>
      </div>
      <span v-for="terr in territories" @mouseenter="hoveredTerritory = terr" @mouseleave="hoveredTerritory = null"
        @click.stop="handleTerritoryClick!(terr!)"
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
        :ref="(el) => (connRefs[conn.to.name + ':' + conn.from.name] = el)"
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
      <div class="fixed z-40 left-0 top-0 flex">
        <TerritoryCard class="ml-2 mt-2" v-if="hoveredTerritory !== null" :territory="hoveredTerritory" />
        <p :key="transferTimer" class="text-xl outlined-text text-white p-4">{{'Next resource transfer in ' + (60 - Math.floor(((new Date().getTime() -
            EngineInstance!.lastResourceTransference) / 1000))) + ' seconds' }}</p>
      </div>
      <TerritoryBonuses @hq-changed="" v-if="selectedTerritory !== null" class="absolute z-50"
        :style="{ bottom: selectedTerritory.getTerritoryStartZ() + selectedTerritory.getTerritoryHeight() + 2 + 'px', left: selectedTerritory.getTerritoryStartX() + 'px' }"
        :territory="selectedTerritory" />
    </div>
  </div>
</template>
  
<script lang="ts">

import { Ref, ref, onBeforeUpdate, onMounted } from "vue";
import { Engine, EngineInstance, createEngineFromMap } from "../../ecoengine/engine"
import { RouteStyle, Territory } from "../../ecoengine/territory";
import TerritoryCard from "../ecoengine/TerritoryCard.vue"
import TerritoryBonuses from "./TerritoryBonuses.vue";
import { ResourceType } from "../../ecoengine/resource";
import { importGuildMap } from "../../ecoengine/wynncraft";
import { Pathfinder } from "../../ecoengine/pathfinding/pathfinder";

export default {
  name: 'EcoEngine',
  props: {
  },
  async setup() {
    if (EngineInstance === null) {
        const gMap = await importGuildMap();
        createEngineFromMap(gMap)
      }

      EngineInstance!.Start();

    const connRefs: Ref<any> = ref({})

    const selectedTerritory: Ref<Territory | null> = ref(null);
    const hoveredTerritory: Ref<Territory | null> = ref(null);
    const territories = EngineInstance?.guildMap.territories;

    const count = ref(0);
    const connections: Ref<any[]> = ref([]);
    const transferTimer = ref(0);

    setInterval(() => transferTimer.value++, 1000)

    const isSelectingRouteViewer = ref(false);
    const routeViewerFirstTerritory: Ref<Territory | null> = ref(null);
    const routeViewerSecondTerritory: Ref<Territory | null> = ref(null);
    const currentRoute: Ref<Territory[]> = ref([])

    function handleTerritoryClick(terr: Territory) {
      if (isSelectingRouteViewer.value) {
        selectRouteViewerTerritory(terr);
        return;
      }
      selectedTerritory.value = terr;
    }

    function selectRouteViewerTerritory(territory: Territory) {
      if (!isSelectingRouteViewer.value) {
        return;
      }
      if (routeViewerFirstTerritory.value === null) {
        routeViewerFirstTerritory.value = territory;
      } else {
        routeViewerSecondTerritory.value = territory;
        highlightRouteViewer();
        isSelectingRouteViewer.value = false;
      }
    }

    function clearHighlightedRoutes() {
      for (let [key, _] of Object.entries(connRefs.value)) {
        connRefs.value[key].style.backgroundColor = '#000'
      }
    }

    function highlightRouteViewer() {
      if (routeViewerFirstTerritory.value === null || routeViewerSecondTerritory.value === null) {
        return
      }
      clearHighlightedRoutes();
      let pathfinder = new Pathfinder(routeViewerFirstTerritory.value!, EngineInstance!.guildMap)
      let route = pathfinder.route(routeViewerSecondTerritory.value!, RouteStyle.FASTEST)
      currentRoute.value = route;
      let currentTerritory = routeViewerFirstTerritory.value!
      let highlighted: string[] = [];
      for (let terr of route) {
        highlighted.push(currentTerritory.name + ':' + terr.name)
        highlighted.push(terr.name + ':' + currentTerritory.name)
        currentTerritory = terr
      }
      highlighted.push(currentTerritory.name + ':' + routeViewerSecondTerritory.value!.name);
      highlighted.push(routeViewerSecondTerritory.value!.name + ':' + currentTerritory.name);
      for (let hl of highlighted) {
        connRefs.value[hl].style.backgroundColor = '#00FFFB'
      }
    }

    function clearRouteViewer() {
      isSelectingRouteViewer.value = false;
      clearHighlightedRoutes()
      routeViewerFirstTerritory.value = null;
      routeViewerSecondTerritory.value = null;
    }

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

    return {
      territories,
      hoveredTerritory,
      ResourceType,
      connections,
      selectedTerritory,
      count,
      isSelectingRouteViewer,
      routeViewerFirstTerritory,
      routeViewerSecondTerritory,
      connRefs,
      EngineInstance,
      clearRouteViewer,
      selectRouteViewerTerritory,
      getConnectionAngle,
      getConnectionHeight,
      handleTerritoryClick,
      transferTimer,
      currentRoute,
      clearHighlightedRoutes
    }
  },
  components: { TerritoryCard, TerritoryBonuses }
}
</script>
  