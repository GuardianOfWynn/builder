<template>
    <div class="border-[1px] bg-mc-bg font-minecraft w-full h-fit border-mc-aqua rounded-md p-2">
        
    <p v-if="ing === undefined || ing === null || ing.tier === undefined" class="text-mc-dark-gray text-center">No ingredient</p>

    <div v-else>
        <div class="flex justify-center mb-2">
            <img v-if="ing.sprite.id == 397" class="w-8 h-8 pixelated object-contain" :src="require('../assets/sprites/' + ing.sprite.head)" />
            <img v-else class="w-8 h-8 pixelated object-contain" :src="require('../assets/sprites/' + ing.sprite.id + '_' + ing.sprite.damage + '.webp')" />
        </div>

        <p class="text-md text-mc-gray mr-2 text-center">{{ing.name}}</p>
        <div class="flex justify-center">
            <span v-if="ing.tier==0">
                <span class="text-mc-gray">[<span class="text-mc-dark-gray">✫✫✫</span>]</span>
            </span>
            <span v-else-if="ing.tier===1">
                <span class="text-mc-gold">[<span class="text-mc-yellow">✫<span class="text-mc-dark-gray">✫✫</span></span>]</span>
            </span>
            <span v-else-if="ing.tier===2">
                <span class="text-mc-dark-purple">[<span class="text-mc-light-purple">✫✫<span class="text-mc-dark-gray">✫</span></span>]</span>
            </span>
            <span v-else-if="ing.tier===3">
                <span class="text-mc-dark-aqua">[<span class="text-mc-aqua">✫✫✫</span>]</span>
            </span>
        </div>
        <p class="text-sm text-mc-dark-gray text-center">Crafting ingredient</p>

        <div class="text-left mt-4 gap-y-4 flex flex-col text-xs">
            <div>
                <p v-for="(value, name, index) in ing.identifications">
                    <span :class="value.minimum <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{ value.minimum <= 0 ? format(value.minimum, name) : '+' + format(value.minimum, name) }}</span>
                    <span :class="value.minimum <= 0 ? 'text-mc-dark-red' : 'text-mc-dark-green'"> to </span>
                    <span :class="value.minimum <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{ value.maximum <= 0 ? format(value.maximum, name) : '+' + format(value.maximum, name) }}</span>
                    <span class="text-sm text-mc-gray ml-2"> {{dict.get(name)}}</span>
                </p>
            </div>

            <div>
                <p v-show="ing.ingredientPositionModifiers.left != 0" :class="ing.ingredientPositionModifiers.left < 0 ? 'text-mc-red' : 'text-mc-lime'">
                    {{ ing.ingredientPositionModifiers.left <= 0 ? ing.ingredientPositionModifiers.left : '+' + ing.ingredientPositionModifiers.left }}% 
                    <span class="text-mc-gray">Ingredient Effectiveness (To ingredients to the left of this one)</span>
                </p>
                <p v-show="ing.ingredientPositionModifiers.right != 0" :class="ing.ingredientPositionModifiers.right < 0 ? 'text-mc-red' : 'text-mc-lime'">
                    {{ ing.ingredientPositionModifiers.right <= 0 ? ing.ingredientPositionModifiers.right : '+' + ing.ingredientPositionModifiers.right }}% 
                    <span class="text-mc-gray">Ingredient Effectiveness (To ingredients to the right of this one)</span>
                </p>
                <p v-show="ing.ingredientPositionModifiers.touching != 0" :class="ing.ingredientPositionModifiers.touching < 0 ? 'text-mc-red' : 'text-mc-lime'">
                    {{ ing.ingredientPositionModifiers.touching <= 0 ? ing.ingredientPositionModifiers.touching : '+' + ing.ingredientPositionModifiers.touching }}% 
                    <span class="text-mc-gray">Ingredient Effectiveness (To ingredients touching this one)</span>
                </p>
                <p v-show="ing.ingredientPositionModifiers.notTouching != 0" :class="ing.ingredientPositionModifiers.notTouching < 0 ? 'text-mc-red' : 'text-mc-lime'">
                    {{ ing.ingredientPositionModifiers.notTouching <= 0 ? ing.ingredientPositionModifiers.notTouching : '+' + ing.ingredientPositionModifiers.notTouching }}% 
                    <span class="text-mc-gray">Ingredient Effectiveness (To ingredients not touching this one)</span>
                </p>
                <p v-show="ing.ingredientPositionModifiers.above != 0" :class="ing.ingredientPositionModifiers.above < 0 ? 'text-mc-red' : 'text-mc-lime'">
                    {{ ing.ingredientPositionModifiers.above <= 0 ? ing.ingredientPositionModifiers.above : '+' + ing.ingredientPositionModifiers.above }}% 
                    <span class="text-mc-gray">Ingredient Effectiveness (To ingredients above this one)</span>
                </p>
                <p v-show="ing.ingredientPositionModifiers.under != 0" :class="ing.ingredientPositionModifiers.under < 0 ? 'text-mc-red' : 'text-mc-lime'">
                    {{ ing.ingredientPositionModifiers.under <= 0 ? ing.ingredientPositionModifiers.under : '+' + ing.ingredientPositionModifiers.under }}% 
                    <span class="text-mc-gray">Ingredient Effectiveness (To ingredients under this one)</span>
                </p>
            </div>
    
            <div>
                <span v-show="ing.itemOnlyIDs.durabilityModifier != 0" :class="ing.itemOnlyIDs.durabilityModifier <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.itemOnlyIDs.durabilityModifier <= 0 ? ing.itemOnlyIDs.durabilityModifier : '+' + ing.itemOnlyIDs.durabilityModifier }} Durability</span>
                <span v-show="ing.itemOnlyIDs.durabilityModifier != 0 && ing.consumableOnlyIDs.duration != 0" class="text-mc-gray"> or </span>
                <span v-show="ing.consumableOnlyIDs.duration != 0" :class="ing.consumableOnlyIDs.duration <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.consumableOnlyIDs.duration <= 0 ? ing.consumableOnlyIDs.duration : '+' + ing.consumableOnlyIDs.duration }}s Duration</span>
                <p v-show="ing.consumableOnlyIDs.charges != 0" :class="ing.consumableOnlyIDs.charges <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.consumableOnlyIDs.charges <= 0 ? ing.consumableOnlyIDs.charges : '+' + ing.consumableOnlyIDs.charges }} Charges</p>
            </div>

            <div>
                <p v-show="ing.itemOnlyIDs.dexterityRequirement != 0" :class="ing.itemOnlyIDs.dexterityRequirement > 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.itemOnlyIDs.dexterityRequirement <= 0 ? ing.itemOnlyIDs.dexterityRequirement : '+' + ing.itemOnlyIDs.dexterityRequirement }} Dexterity Min.</p>
                <p v-show="ing.itemOnlyIDs.defenceRequirement != 0" :class="ing.itemOnlyIDs.defenceRequirement > 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.itemOnlyIDs.defenceRequirement <= 0 ? ing.itemOnlyIDs.defenceRequirement : '+' + ing.itemOnlyIDs.defenceRequirement }} Defence Min.</p>
                <p v-show="ing.itemOnlyIDs.strengthRequirement != 0" :class="ing.itemOnlyIDs.strengthRequirement > 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.itemOnlyIDs.strengthRequirement <= 0 ? ing.itemOnlyIDs.strengthRequirement : '+' + ing.itemOnlyIDs.strengthRequirement }} Strenght Min.</p>
                <p v-show="ing.itemOnlyIDs.intelligenceRequirement != 0" :class="ing.itemOnlyIDs.intelligenceRequirement > 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.itemOnlyIDs.intelligenceRequirement <= 0 ? ing.itemOnlyIDs.intelligenceRequirement : '+' + ing.itemOnlyIDs.intelligenceRequirement }} Intelligence Min.</p>
                <p v-show="ing.itemOnlyIDs.agilityRequirement != 0" :class="ing.itemOnlyIDs.agilityRequirement > 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.itemOnlyIDs.agilityRequirement <= 0 ? ing.itemOnlyIDs.agilityRequirement : '+' + ing.itemOnlyIDs.agilityRequirement }} Agility Min.</p>
            </div>

            <div>
                <p class="text-mc-gray">Crafting Lv. Min: {{ing.level}}</p>
                <div v-for="(value) in ing.skills" class="flex ml-4">
                    <img class="pixelated w-4 h-4 my-auto" :src="require('../assets/sprites/' + value.toLowerCase() + '.webp')"/>
                    <span class="my-auto text-mc-gray ml-2"> {{dict.get(value)}}</span>
                </div>
            </div>

            <div></div>
        </div>

    </div>


    </div>
</template>
  
<script>
import { ref } from "vue";
  
  export default {
      name: 'IngredientCard',
      props: {
          ing: Object,
      },
      async setup(props) {
        
        const dictionary = await fetch("/dictionary.json");

        const dict = ref(new Map(Object.entries(dictionary)));
        const format = (val, idName) => {
            if (idName === "POISON") {
                return val + "/3s"
            }
        
            switch (idName) {
                case "POISON": case "MANASTEAL": case "LIFESTEAL": return val + "/3s";
                case "MANAREGEN": return val + "/5s";
                case "ATTACKSPEED": return val + " tier";
                default:
            }

            if(!idName.includes("RAW") && !idName.includes("POINTS")) {
                return val + "%";
            }
        }
        return {dict, format}
      },
      components: { }
  }
  </script>
  