<template>
  <div class="border-[1px] bg-mc-bg font-minecraft w-full h-fit border-mc-aqua rounded-md p-2">

    <p v-if="item === undefined" class="text-mc-dark-gray text-center">No item</p>
    <div v-else class="text-sm">
      <p class="text-center" :class="[item.isCrafted ? 'text-mc-dark-aqua' : 'text-mc-gray']">{{ item.name }}</p>
      <ItemTypeIcon :item-type="item.type"/>
      <p v-if="item.isCrafted" class="text-sm text-mc-dark-aqua text-center mb-2">Crafted {{ item.type }}</p>
      <div v-if="isWeapon(item.type)">
        <p v-show="item.isCrafted && !isEmpty((<WynnCraftedItem><unknown>item).damages.neutral.high) || !isEmpty((<WynnCraftedItem><unknown>item).damages.neutral.low)" class="text-mc-gold">
            &#10019; Neutral <span class="text-white">
            <span v-if="item.isCrafted" class="text-mc-gray">damage: </span> 
              {{ Math.floor((<WynnCraftedItem><unknown>item).damages.neutral.low.minimum) }} - {{Math.floor((<WynnCraftedItem><unknown>item).damages.neutral.low.maximum) }} 
                &#9654; 
              {{ Math.floor((<WynnCraftedItem><unknown>item).damages.neutral.high.minimum) }} - {{ Math.floor((<WynnCraftedItem><unknown>item).damages.neutral.high.maximum) }}
            </span>
        </p>
        <p v-show="!item.isCrafted && !isEmpty((<WynnItem><unknown>item).damages.neutral)" class="text-mc-gold">
            &#10019; Neutral <span class="text-white">
            <span v-if="item.isCrafted" class="text-mc-gray">damage: </span> 
              {{ Math.floor((<WynnItem><unknown>item).damages.neutral.minimum) }} - {{Math.floor((<WynnItem><unknown>item).damages.neutral.maximum) }}
            </span>
        </p>
        <p v-show="item.isCrafted && !isEmpty((<WynnCraftedItem><unknown>item).damages.fire.high) || !isEmpty((<WynnCraftedItem><unknown>item).damages.fire.low)" class="text-mc-red">
            &#10041; Fire <span class="text-white">
            <span class="text-mc-gray">damage: </span> 
              {{ Math.floor((<WynnCraftedItem><unknown>item).damages.fire.low.minimum) }} - {{ Math.floor((<WynnCraftedItem><unknown>item).damages.fire.low.maximum) }} 
                &#9654; 
              {{ Math.floor((<WynnCraftedItem><unknown>item).damages.fire.high.minimum) }} - {{Math.floor((<WynnCraftedItem><unknown>item).damages.fire.high.maximum) }}
            </span>
        </p>
        <p v-show="!item.isCrafted && !isEmpty((<WynnItem><unknown>item).damages.fire)" class="text-mc-red">
            &#10041; Fire <span class="text-white">
            <span class="text-mc-gray">damage: </span> 
              {{ Math.floor((<WynnItem><unknown>item).damages.fire.minimum) }} - {{ Math.floor((<WynnItem><unknown>item).damages.fire.maximum) }} 
            </span>
        </p>
        <p v-show="item.isCrafted && !isEmpty((<WynnCraftedItem><unknown>item).damages.water.high) || !isEmpty((<WynnCraftedItem><unknown>item).damages.water.low)" class="text-mc-aqua">
            &#10045; Water <span class="text-white">
            <span class="text-mc-gray">damage: </span>
            {{ Math.floor((<WynnCraftedItem><unknown>item).damages.water.low.minimum) }} - {{ Math.floor((<WynnCraftedItem><unknown>item).damages.water.low.maximum) }} 
              &#9654; 
            {{ Math.floor((<WynnCraftedItem><unknown>item).damages.water.high.minimum) }} - {{ Math.floor((<WynnCraftedItem><unknown>item).damages.water.high.maximum) }}
          </span>
        </p>
        <p v-show="!item.isCrafted && !isEmpty((<WynnItem><unknown>item).damages.water)" class="text-mc-aqua">
            &#10045; Water <span class="text-white">
            <span class="text-mc-gray">damage: </span>
            {{ Math.floor((<WynnItem><unknown>item).damages.water.minimum) }} - {{ Math.floor((<WynnItem><unknown>item).damages.water.maximum) }} 
          </span>
        </p>
        <p v-show="item.isCrafted && !isEmpty((<WynnCraftedItem><unknown>item).damages.air.high) || !isEmpty((<WynnCraftedItem><unknown>item).damages.air.low)" class="text-white">
            &#10049; Air <span class="text-white">
            <span class="text-mc-gray">damage: </span> 
            {{ Math.floor((<WynnCraftedItem><unknown>item).damages.air.low.minimum) }} - {{Math.floor((<WynnCraftedItem><unknown>item).damages.air.low.maximum) }} 
            &#9654; 
            {{ Math.floor((<WynnCraftedItem><unknown>item).damages.air.high.minimum) }} - {{ Math.floor((<WynnCraftedItem><unknown>item).damages.air.high.maximum) }}
          </span>
        </p>
        <p v-show="!item.isCrafted && !isEmpty((<WynnItem><unknown>item).damages.air)" class="text-white">
            &#10049; Air <span class="text-white">
            <span class="text-mc-gray">damage: </span> 
            {{ Math.floor((<WynnItem><unknown>item).damages.air.minimum) }} - {{Math.floor((<WynnItem><unknown>item).damages.air.maximum) }} 
            </span>
        </p>
        <p v-show="item.isCrafted && !isEmpty((<WynnCraftedItem><unknown>item).damages.thunder.high) || !isEmpty((<WynnCraftedItem><unknown>item).damages.thunder.low)" class="text-mc-yellow">
          &#10022; Thunder <span class="text-white">
            <span class="text-mc-gray">damage: </span> 
            {{ Math.floor((<WynnCraftedItem><unknown>item).damages.thunder.low.minimum) }} - {{Math.floor((<WynnCraftedItem><unknown>item).damages.thunder.low.maximum) }} 
              &#9654; 
            {{ Math.floor((<WynnCraftedItem><unknown>item).damages.thunder.high.minimum) }} - {{ Math.floor((<WynnCraftedItem><unknown>item).damages.thunder.high.maximum) }}
          </span>
        </p>
        <p v-show="!item.isCrafted && !isEmpty((<WynnItem><unknown>item).damages.thunder)" class="text-mc-yellow">
          &#10022; Thunder <span class="text-white">
            <span class="text-mc-gray">damage: </span> 
            {{ Math.floor((<WynnItem><unknown>item).damages.thunder.minimum) }} - {{Math.floor((<WynnItem><unknown>item).damages.thunder.maximum) }} 
            </span>
        </p>
        <p v-show="item.isCrafted && !isEmpty((<WynnCraftedItem><unknown>item).damages.earth.high) || !isEmpty((<WynnCraftedItem><unknown>item).damages.earth.low)" class="text-mc-dark-green">
            &#10020; Earth <span class="text-white">
            <span class="text-mc-gray">damage: </span> 
            {{ Math.floor((<WynnCraftedItem><unknown>item).damages.earth.low.minimum) }} - {{ Math.floor((<WynnCraftedItem><unknown>item).damages.earth.low.maximum) }} 
            &#9654; 
            {{ Math.floor((<WynnCraftedItem><unknown>item).damages.earth.high.minimum) }} - {{ Math.floor((<WynnCraftedItem><unknown>item).damages.earth.high.maximum) }}
          </span>
        </p>
        <p v-show="!item.isCrafted && !isEmpty((<WynnItem><unknown>item).damages.earth)" class="text-mc-dark-green">
            &#10020; Earth <span class="text-white">
            <span class="text-mc-gray">damage: </span> 
            {{ Math.floor((<WynnItem><unknown>item).damages.earth.minimum) }} - {{ Math.floor((<WynnItem><unknown>item).damages.earth.maximum) }} 
            </span>
        </p>
      </div>
      <p v-show="item.isCrafted && (<WynnCraftedItem><unknown>item).health.maximum !== 0 && (<WynnCraftedItem><unknown>item).health.minimum !== 0" class="text-mc-dark-red">Health:
         <span class="text-white">{{ Math.floor((<WynnCraftedItem><unknown>item).health.minimum) + " - " + Math.floor((<WynnCraftedItem><unknown>item).health.maximum) }}</span>
      </p>
      <p v-show="!item.isCrafted && (<WynnItem><unknown>item).health !== 0" class="text-mc-dark-red">Health: 
        <span class="text-white">{{ Math.floor((<WynnItem><unknown>item).health as number) }}</span>
      </p>
      <p class=" text-mc-gray" v-show="getWynnClass(item.type) !== undefined">Class Req: {{ getWynnClass(item.type) }}</p>
      <p v-if="item.isCrafted" class=" text-mc-gray">Combat Lv. Min: {{ (<WynnCraftedItem><unknown>item).level.minimum }} - {{ (<WynnCraftedItem><unknown>item).level.maximum }}</p>
      <p v-else="!item.isCrafted" class=" text-mc-gray">Combat Lv. Min: {{ (<WynnItem><unknown>item).level }}</p>

      <div v-show="!isConsumable(item.type)" class="text-mc-gray">
        <p v-show="item.requirements.dexterity != 0">Dexterity Min: {{ Math.floor(item.requirements.dexterity) }}</p>
        <p v-show="item.requirements.defence != 0">Defence Min: {{ Math.floor(item.requirements.defence) }}</p>
        <p v-show="item.requirements.strength != 0">Strength Min: {{ Math.floor(item.requirements.strength) }}</p>
        <p v-show="item.requirements.intelligence != 0">Intelligence Min: {{ Math.floor(item.requirements.intelligence) }}
        </p>
        <p v-show="item.requirements.agility != 0">Agility Min: {{ Math.floor(item.requirements.agility) }}</p>
      </div>

      <div class="text-left mt-4 gap-y-4 flex flex-col text-sm">
        <div>
          <p v-show="identification.minimum !== 0 || identification.maximum !== 0"
            v-for="(identification) in item.identifications">
            <span :class="identification.minimum <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{
              Math.floor(identification.minimum) <= 0 ? format(Math.floor(identification.minimum), identification.id)
              : '+' + format(Math.floor(identification.minimum), identification.id) }}</span>
                <span :class="identification.maximum <= 0 ? 'text-mc-dark-red' : 'text-mc-dark-green'"> to </span>
                <span :class="identification.maximum <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{
                  Math.floor(identification.maximum) <= 0 ? format(Math.floor(identification.maximum), identification.id)
                  : '+' + format(Math.floor(identification.maximum), identification.id) }}</span>
                    <span class="text-sm text-mc-gray ml-2">{{ identification.name }}</span>
          </p>
        </div>

        <div v-if="item.isCrafted" class="text-sm text-mc-gray">
          <div>
            <span v-show="(<WynnCraftedItem><unknown>item).craftedStatus.charges != 0">Charges: <span class="text-white text-md">{{
              Math.floor((<WynnCraftedItem><unknown>item).craftedStatus.charges) }}</span></span><br>
            <span v-show="!isEmpty((<WynnCraftedItem><unknown>item).craftedStatus.durability)">Durability: <span class="text-white text-md">{{
              Math.floor((<WynnCraftedItem><unknown>item).craftedStatus.durability.minimum) }} - {{
    Math.floor((<WynnCraftedItem><unknown>item).craftedStatus.durability.maximum) }}</span></span>
            <span v-show="!isEmpty((<WynnCraftedItem><unknown>item).craftedStatus.duration)">Duration: <span class="text-white text-md">{{
              Math.floor((<WynnCraftedItem><unknown>item).craftedStatus.duration.minimum) }}s - {{ Math.floor((<WynnCraftedItem><unknown>item).craftedStatus.duration.maximum)
  }}s</span></span>

          </div>
        </div>
      </div>
    </div>


  </div>
</template>
  
<script lang="ts">
import { ref, watchEffect } from "vue";
import Ingredient from "../model/ingredient";
import { WynnCraftedItem, WynnItem } from "../model/item";
import { ItemTier, isEmpty, format, getWynnClass } from "../scripts/util";
import { isConsumable, isWeapon } from "../scripts/crafter";
import ItemTypeIcon from "./ItemTypeIcon.vue";

export default {
  name: 'ItemCard',
  props: {
    item: Object,
  },
  async setup(props) {

    const item = ref(props.item);

    watchEffect(() => {
      item.value = props.item;
    })

    return { item, format, isEmpty, isConsumable, isWeapon, getWynnClass }
  },
  components: { ItemTypeIcon }
}
</script>
  