<template>
    <div class="border-[1px] bg-mc-bg font-minecraft w-full h-fit border-mc-aqua rounded-md p-2">
        
    <p v-if="ing === undefined || ing === null || ing.tier === undefined" class="text-mc-dark-gray text-center">No ingredient</p>

    <div v-else>
        <div class="flex justify-center mb-2">
            <img v-if="ing.sprite.includes('.png')" class="w-8 h-8 pixelated object-contain" :src="'/builder/sprites/' + ing.sprite" />
            <img v-else class="w-8 h-8 pixelated object-contain" :src="'/builder/sprites/' + ing.sprite" />
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
                <p v-for="(identification) in ing.identifications">
                    <span :class="identification.minimum <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{ identification.minimum <= 0 ? format(identification.minimum, identification.name) : '+' + format(identification.minimum, identification.name) }}</span>
                    <span :class="identification.minimum <= 0 ? 'text-mc-dark-red' : 'text-mc-dark-green'"> to </span>
                    <span :class="identification.minimum <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{ identification.maximum <= 0 ? format(identification.maximum, identification.name) : '+' + format(identification.maximum, identification.name) }}</span>
                    <span class="text-sm text-mc-gray ml-2">{{ identification.name }}</span>
                </p>
            </div>

            <div>
                <p v-show="ing.effectivenessModifiers.left != 0" :class="ing.effectivenessModifiers.left < 0 ? 'text-mc-red' : 'text-mc-lime'">
                    {{ ing.effectivenessModifiers.left <= 0 ? ing.effectivenessModifiers.left : '+' + ing.effectivenessModifiers.left }}% 
                    <span class="text-mc-gray">Ingredient Effectiveness (To ingredients to the left of this one)</span>
                </p>
                <p v-show="ing.effectivenessModifiers.right != 0" :class="ing.effectivenessModifiers.right < 0 ? 'text-mc-red' : 'text-mc-lime'">
                    {{ ing.effectivenessModifiers.right <= 0 ? ing.effectivenessModifiers.right : '+' + ing.effectivenessModifiers.right }}% 
                    <span class="text-mc-gray">Ingredient Effectiveness (To ingredients to the right of this one)</span>
                </p>
                <p v-show="ing.effectivenessModifiers.touching != 0" :class="ing.effectivenessModifiers.touching < 0 ? 'text-mc-red' : 'text-mc-lime'">
                    {{ ing.effectivenessModifiers.touching <= 0 ? ing.effectivenessModifiers.touching : '+' + ing.effectivenessModifiers.touching }}% 
                    <span class="text-mc-gray">Ingredient Effectiveness (To ingredients touching this one)</span>
                </p>
                <p v-show="ing.effectivenessModifiers.notTouching != 0" :class="ing.effectivenessModifiers.notTouching < 0 ? 'text-mc-red' : 'text-mc-lime'">
                    {{ ing.effectivenessModifiers.notTouching <= 0 ? ing.effectivenessModifiers.notTouching : '+' + ing.effectivenessModifiers.notTouching }}% 
                    <span class="text-mc-gray">Ingredient Effectiveness (To ingredients not touching this one)</span>
                </p>
                <p v-show="ing.effectivenessModifiers.above != 0" :class="ing.effectivenessModifiers.above < 0 ? 'text-mc-red' : 'text-mc-lime'">
                    {{ ing.effectivenessModifiers.above <= 0 ? ing.effectivenessModifiers.above : '+' + ing.effectivenessModifiers.above }}% 
                    <span class="text-mc-gray">Ingredient Effectiveness (To ingredients above this one)</span>
                </p>
                <p v-show="ing.effectivenessModifiers.under != 0" :class="ing.effectivenessModifiers.under < 0 ? 'text-mc-red' : 'text-mc-lime'">
                    {{ ing.effectivenessModifiers.under <= 0 ? ing.effectivenessModifiers.under : '+' + ing.effectivenessModifiers.under }}% 
                    <span class="text-mc-gray">Ingredient Effectiveness (To ingredients under this one)</span>
                </p>
            </div>
    
            <div>
                <span v-show="ing.modifiers.durability != 0" :class="ing.modifiers.durability <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.modifiers.durability <= 0 ? ing.modifiers.durability : '+' + ing.modifiers.durability }} Durability</span>
                <span v-show="ing.modifiers.duration != 0 && ing.modifiers.durability != 0" class="text-mc-gray"> or </span>
                <span v-show="ing.modifiers.duration != 0" :class="ing.modifiers.duration <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.modifiers.duration <= 0 ? ing.modifiers.duration : '+' + ing.modifiers.duration }}s Duration</span>
                <p v-show="ing.modifiers.charges != 0" :class="ing.modifiers.charges <= 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.modifiers.charges <= 0 ? ing.modifiers.charges : '+' + ing.modifiers.charges }} Charges</p>
            </div>

            <div>
                <p v-show="ing.requirements.dexterity != 0" :class="ing.requirements.dexterity > 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.requirements.dexterity <= 0 ? ing.requirements.dexterity : '+' + ing.requirements.dexterity }} Dexterity Min.</p>
                <p v-show="ing.requirements.defence != 0" :class="ing.requirements.defence > 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.requirements.defence <= 0 ? ing.requirements.defence : '+' + ing.requirements.defence }} Defence Min.</p>
                <p v-show="ing.requirements.strength != 0" :class="ing.requirements.strength > 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.requirements.strength <= 0 ? ing.requirements.strength : '+' + ing.requirements.strength }} Strenght Min.</p>
                <p v-show="ing.requirements.intelligence != 0" :class="ing.requirements.intelligence > 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.requirements.intelligence <= 0 ? ing.requirements.intelligence : '+' + ing.requirements.intelligence }} Intelligence Min.</p>
                <p v-show="ing.requirements.agility != 0" :class="ing.requirements.agility > 0 ? 'text-mc-red' : 'text-mc-lime'">{{ ing.requirements.agility <= 0 ? ing.requirements.agility : '+' + ing.requirements.agility }} Agility Min.</p>
            </div>

            <div>
                <p class="text-mc-gray">Crafting Lv. Min: {{ing.level}}</p>
                <div v-for="(value) in ing.skills" class="flex ml-4">
                    <img class="pixelated w-4 h-4 my-auto" :src="'/sprites/' + value.toLowerCase() + '.webp'"/>
                    <span class="my-auto text-mc-gray ml-2"> {{ value }}</span>
                </div>
            </div>

            <div></div>
        </div>

    </div>


    </div>
</template>
  
<script lang="ts">
import Ingredient from "../model/ingredient";
  
  export default {
      name: 'IngredientCard',
      props: {
          ing: Ingredient,
      },
      async setup() {
        
        const dictionary: Map<String, String> = JSON.parse(await (await fetch("/builder/dictionary.json")).json());
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
        return {dictionary, format}
      },
      components: { }
  }
  </script>
  