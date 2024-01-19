<template>
  <div vue-dragscroll class="w-fit cursor-grab">
    <div class="text-white">HELLO WORLDLAPOSKDFAPOKFOPASKFPOASDFKAOSPDKFAPSODKF</div>
    <div class="">
      <div class="bg-no-repeat bg-cover bg-map11 w-[1024px] h-[1024px] pixelated"></div>
      <div class="flex">
        <div class="bg-no-repeat bg-cover bg-map21 w-[1536px] h-[1024px] pixelated"></div>
        <div class="bg-no-rzepeat bg-cover bg-map22 w-[2048px] h-[1024px] pixelated"></div>
        <div class="bg-no-repeat bg-cover bg-map23 w-[1024px] h-[1024px] pixelated"></div>
      </div>
      <div class="flex">
        <div class="bg-no-repeat bg-cover bg-map31 w-[1536px] h-[1024px] pixelated"></div>
        <div class="bg-no-repeat bg-cover bg-map32 w-[2048px] h-[1024px] pixelated"></div>
        <div class="bg-no-repeat bg-cover bg-map33 w-[1024px] h-[1024px] pixelated"></div>
      </div>
      <div class="flex">
        <div class="bg-no-repeat bg-cover bg-map41 w-[1536px] h-[1024px] pixelated"></div>
        <div class="bg-no-repeat bg-cover bg-map42 w-[2048px] h-[1024px] pixelated"></div>
        <div class="bg-no-repeat bg-cover bg-map43 w-[1024px] h-[1024px] pixelated"></div>
      </div>
      <div class="flex">
        <div class="bg-no-repeat bg-cover bg-map51 w-[1536px] h-[1024px] pixelated"></div>
        <div class="bg-no-repeat bg-cover bg-map52 w-[2048px] h-[1024px] pixelated"></div>
        <div class="bg-no-repeat bg-cover bg-map53 w-[1024px] h-[1024px] pixelated"></div>
      </div>
      <div class="flex">
        <div class="bg-no-repeat bg-cover bg-map61 w-[1536px] h-[1024px] pixelated"></div>
        <div class="bg-no-repeat bg-cover bg-map62 w-[2048px] h-[1024px] pixelated"></div>
        <div class="bg-no-repeat bg-cover bg-map63 w-[1024px] h-[1024px] pixelated"></div>
      </div>
      <div class="flex">
        <div class="bg-no-repeat bg-cover bg-map71 w-[1536px] h-[1024px] pixelated"></div>
        <div class="bg-no-repeat bg-cover bg-map72 w-[2048px] h-[1024px] pixelated"></div>
        <div class="bg-no-repeat bg-cover bg-map73 w-[1024px] h-[1024px] pixelated"></div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">

import { EngineInstance, createEngine } from "../../ecoengine/engine"
import { SKY_CLAIM_PRESET, TERRITORIES } from "../../model/ecoengine/ecoengine"
import { dragscroll } from 'vue-dragscroll'

export default {
  name: 'EcoEngine',
  props: {
  },
  setup() {
    // Dividir tamanho por 4
    // Dividir Start.X por 2,69
    // Dividir Start.Z por 4,52
    if (EngineInstance == null) {
      createEngine(TERRITORIES, SKY_CLAIM_PRESET);
    }
    EngineInstance!.Start();

    let territories = EngineInstance!.guildMap.territories;

    return { territories }
  },
  components: {}
}
</script>
  