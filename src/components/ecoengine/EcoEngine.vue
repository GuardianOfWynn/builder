<template>
  <div class="min-w-max">
    <div class="relative">
      <div>
        <div class="grid grid-cols-9 grid-rows-6 w-fit">
          <div class=" col-span-3 bg-no-repeat bg-cover bg-map21 w-[1536px] h-[1024px] pixelated"></div>
          <div class=" col-span-4 bg-no-repeat bg-cover bg-map22 w-[2048px] h-[1024px] pixelated"></div>
          <div class="  col-span-2 bg-no-repeat bg-cover bg-map23 w-[1024px] h-[1024px] pixelated"></div>
          <div class="  col-span-3 bg-no-repeat bg-cover bg-map31 w-[1536px] h-[1024px] pixelated"></div>
          <div class=" col-span-4 bg-no-repeat bg-cover bg-map32 w-[2048px] h-[1024px] pixelated"></div>
          <div class=" col-span-2 bg-no-repeat bg-cover bg-map33 w-[1024px] h-[1024px] pixelated"></div>
          <div class=" col-span-3 bg-no-repeat bg-cover bg-map41 w-[1536px] h-[1024px] pixelated"></div>
          <div class=" col-span-4 bg-no-repeat bg-cover bg-map42 w-[2048px] h-[1024px] pixelated"></div>
          <div class=" col-span-2 bg-no-repeat bg-cover bg-map43 w-[1024px] h-[1024px] pixelated"></div>
          <div class=" col-span-3 bg-no-repeat bg-cover bg-map51 w-[1536px] h-[1024px] pixelated"></div>
          <div class=" col-span-4 bg-no-repeat bg-cover bg-map52 w-[2048px] h-[1024px] pixelated"></div>
          <div class=" col-span-2 bg-no-repeat bg-cover bg-map53 w-[1024px] h-[1024px] pixelated"></div>
          <div class=" col-span-3 bg-no-repeat bg-cover bg-map61 w-[1536px] h-[1024px] pixelated"></div>
          <div class=" col-span-4 bg-no-repeat bg-cover bg-map62 w-[2048px] h-[1024px] pixelated"></div>
          <div class=" col-span-2 bg-no-repeat bg-cover bg-map63 w-[1024px] h-[1024px] pixelated"></div>
          <div class=" col-span-3 bg-no-repeat bg-cover bg-map71 w-[1536px] h-[1024px] pixelated"></div>
          <div class=" col-span-4 bg-no-repeat bg-cover bg-map72 w-[2048px] h-[1024px] pixelated"></div>
          <div class=" col-span-2 bg-no-repeat bg-cover bg-map73 w-[1024px] h-[1024px] pixelated"></div>
        </div>
      </div>
      <div class="absolute bottom-[4343px] left-[562px] bg-yellow-500 w-32 h-32">gSw</div>
    </div>

  </div>
</template>
  
<script lang="ts">

import { EngineInstance, createEngine } from "../../ecoengine/engine"
import { SKY_CLAIM_PRESET, TERRITORIES } from "../../model/ecoengine/ecoengine"

export default {
  name: 'EcoEngine',
  props: {
  },
  setup() {
    if (EngineInstance == null) {
      createEngine(TERRITORIES, SKY_CLAIM_PRESET);
    }

    EngineInstance!.Start();


    

    let nTerrs: any[] = [];
    return { nTerrs }
  },
  components: {}
}
</script>
  