<template>
    <div class="border-[1px] bg-mc-bg font-minecraft w-full h-fit border-mc-aqua rounded-md p-2">
        
    <p v-if="item === undefined" class="text-mc-dark-gray text-center">No item</p>

    <div v-else class="text-sm">
        <div class="flex items-center justify-center h-24 w-24 p-2 rounded-md mx-auto">
            <div v-if="item.type === 'Scroll'" class="pixelated inline-block w-16 h-16 bg-scroll bg-professions"></div>
            <div v-if="item.type === 'Food'" class="pixelated inline-block w-16 h-16 bg-food bg-professions">
            </div>
            <div v-if="item.type === 'Potion'" class="pixelated inline-block w-16 h-16 bg-potion bg-wynn-icons"></div>
            <div v-if="item.type === 'Ring'" class="pixelated inline-block w-[53px] h-[53px] bg-ring bg-accessories"></div>
            <div v-if="item.type === 'Bracelet'"
              class="pixelated inline-block w-[62px] h-[62px] bg-bracelet bg-accessories"></div>
            <div v-if="item.type === 'Necklace'"
              class="pixelated inline-block w-[53px] h-[53px] bg-necklace bg-accessories"></div>
            <div v-if="item.type === 'Helmet'" class="pixelated inline-block h-[62px] w-[62px] bg-helmet bg-armours"></div>
            <div v-if="item.type === 'Chestplate'"
              class="pixelated inline-block h-[62px] w-[62px] bg-chestplate bg-armours"></div>
            <div v-if="item.type === 'Leggings'" class="pixelated inline-block h-[62px] w-[62px] bg-leggings bg-armours">
            </div>
            <div v-if="item.type === 'Boots'" class="pixelated inline-block h-[62px] w-[62px] bg-boots bg-armours"></div>
          </div>

        <p class="text-md text-mc-gray mr-2 text-center">{{item.name}}</p>
        <p class="text-sm text-mc-dark-aqua text-center mb-2">Crafted {{item.type}}</p>

        <p v-show="item.health.maximum !== 0 && item.health.minimum !== 0" class="text-mc-dark-red">Health: <span class="text-white">{{ Math.floor(item.health.minimum) + " - " + Math.floor(item.health.maximum) }}</span></p>
        <p class=" text-mc-gray" v-show="item.clazz !== undefined">Class Req: {{ item.clazz }}</p>
        <p class=" text-mc-gray">Combat Lv. Min: {{ item.requirements.level }}</p>

        <div v-show="!isConsumable(item.type)" class="text-mc-gray">
            <p v-show="item.requirements.dexterity != 0">Dexterity Min: {{Math.floor(item.requirements.dexterity)}}</p>
            <p v-show="item.requirements.defence != 0">Defence Min: {{Math.floor(item.requirements.defence)}}</p>
            <p v-show="item.requirements.strength != 0">Strength Min: {{Math.floor(item.requirements.strength)}}</p>
            <p v-show="item.requirements.intelligence != 0">Intelligence Min: {{Math.floor(item.requirements.intelligence)}}</p>
            <p v-show="item.requirements.agility != 0">Agility Min: {{Math.floor(item.requirements.agility)}}</p>
        </div>

        <div class="text-left mt-4 gap-y-4 flex flex-col text-sm">
            <div>
                <p v-for="(identification) in item.identifications">
                    <span :class="identification.minimum <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{ Math.floor(identification.minimum) <= 0 ? format(Math.floor(identification.minimum), identification.id) : '+' + format(Math.floor(identification.minimum), identification.id) }}</span>
                    <span :class="identification.minimum <= 0 ? 'text-mc-dark-red' : 'text-mc-dark-green'"> to </span>
                    <span :class="identification.minimum <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{ Math.floor(identification.maximum) <= 0 ? format(Math.floor(identification.maximum), identification.id) : '+' + format(Math.floor(identification.maximum), identification.id) }}</span>
                    <span class="text-sm text-mc-gray ml-2">{{ identification.name }}</span>
                </p>
            </div>

            <div v-if="item.isCrafted" class="text-sm text-mc-gray">
                <div>
                    <span v-show="item.craftedStatus.charges != 0">Charges: {{ Math.floor(item.craftedStatus.charges) }}</span><br>
                    <span v-show="!isEmpty(item.craftedStatus.durability)">Durability: {{ Math.floor(item.craftedStatus.durability.minimum) }} - {{ Math.floor(item.craftedStatus.durability.maximum) }}</span>
                    <span v-show="!isEmpty(item.craftedStatus.duration)">Duration: {{ Math.floor(item.craftedStatus.duration.minimum) }}s - {{ Math.floor(item.craftedStatus.duration.maximum) }}s</span>
                    
                </div>
            </div>
        </div>
    </div>


    </div>
</template>
  
<script lang="ts">
import { ref, watchEffect } from "vue";
import Ingredient from "../model/ingredient";
import { WynnItem } from "../model/item";
import { ItemTier, isEmpty } from "../scripts/util";
import { isConsumable } from "../scripts/crafter";
  
  export default {
      name: 'ItemCard',
      props: {
          item: WynnItem,
      },
      async setup(props) {
        
        const item = ref(props.item);

        watchEffect(() => {
            item.value = props.item;
        })

        const format = (val, id) => {
            if (id === "POISON") {
                return val + "/3s"
            }
        
            switch (id) {
                case "POISON": case "MANASTEAL": case "LIFESTEAL": return val + "/3s";
                case "MANAREGEN": return val + "/5s";
                case "ATTACKSPEED": return val + " tier";
                default:
            }

            if(!id.includes("RAW") && !id.includes("POINTS") && !id.includes("HEALTHBONUS")) {
                return val + "%";
            }
            return val
        }
        return {item, format, isEmpty, isConsumable}
      },
      components: { }
  }
  </script>
  