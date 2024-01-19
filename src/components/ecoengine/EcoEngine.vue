<template>

  <div class="w-full p-9">
    <div class="w-fit mx-auto relative">
      <img class="mx-auto pixelated" :src="'/builder/main-map.webp'"/>
      <div v-for="territory in territories">

      </div>
      <div class="w-[49.75px] h-[83.25px] bottom-[313px] left-[354px] border-2 border-yellow-400 bg-yellow-600 bg-opacity-40 z-10 absolute"></div>
      <div class="w-[37.25px] h-[78.25px] bottom-[978px] left-[353.53px] border-2 border-yellow-400 bg-yellow-600 bg-opacity-40 z-10 absolute"></div>
    </div>
  </div>

</template>
  
<script lang="ts">
  
  import {EngineInstance, createEngine} from "../../ecoengine/engine"
  import {SKY_CLAIM_PRESET, TERRITORIES} from "../../model/ecoengine/ecoengine"


  export default {
      name: 'EcoEngine',
      props: {
      },
      setup() {
        // Dividir tamanho por 4
        // Dividir Start.X por 2,69
        // Dividir Start.Z por 4,52
        if(EngineInstance == null) {
          createEngine(TERRITORIES, SKY_CLAIM_PRESET);
        }
        EngineInstance!.Start();

        let territories = EngineInstance!.guildMap.territories;

        return { territories }
      },
      components: { }
  }
  </script>
  