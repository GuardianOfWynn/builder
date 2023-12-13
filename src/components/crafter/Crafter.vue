<template>
  <div class="p-8  font-minecraft">
    <div class="w-1/3">
      <p class="text-3xl text-mc-light-purple">GsWCrafter</p>
      <div class="flex gap-x-4 w-full">
        <div class="border-[1px] flex items-center justify-center h-24 w-24 p-2 rounded-md border-purple-600">
          <div v-if="selectedCraftType.name === 'Scroll'" class="pixelated inline-block w-16 h-16 bg-scroll bg-professions"></div>
          <div v-if="selectedCraftType.name === 'Food'" class="pixelated inline-block w-16 h-16 bg-food bg-professions"></div>
          <div v-if="selectedCraftType.name === 'Potion'" class="pixelated inline-block w-16 h-16 bg-potion bg-wynn-icons"></div>
          <div v-if="selectedCraftType.name === 'Ring'" class="pixelated inline-block w-[53px] h-[53px] bg-ring bg-accessories"></div>
          <div v-if="selectedCraftType.name === 'Bracelet'" class="pixelated inline-block w-[62px] h-[62px] bg-bracelet bg-accessories"></div>
          <div v-if="selectedCraftType.name === 'Necklace'" class="pixelated inline-block w-[53px] h-[53px] bg-necklace bg-accessories"></div>
          <div v-if="selectedCraftType.name === 'Helmet'" class="pixelated inline-block h-[62px] w-[62px] bg-helmet bg-armours"></div>
          <div v-if="selectedCraftType.name === 'Chestplate'" class="pixelated inline-block h-[62px] w-[62px] bg-chestplate bg-armours"></div>
          <div v-if="selectedCraftType.name === 'Leggings'" class="pixelated inline-block h-[62px] w-[62px] bg-leggings bg-armours"></div>
          <div v-if="selectedCraftType.name === 'Boots'" class="pixelated inline-block h-[62px] w-[62px] bg-boots bg-armours"></div>
        </div>
        <div class="grid grid-cols-5 grid-rows-3 w-full gap-y-1">
          <p class="my-auto text-white">Type</p>
          <CraftTypeCombobox class="col-span-4" @update-craft-type="handleCraftTypeChange"/>
          <p class="my-auto text-white">Materials</p>
          <MaterialsCombobox class="col-span-4" :craftType="selectedCraftType" @update-craft-materials="handleMaterialsChanged"/>
          <p class="my-auto text-white">Level</p>
          <CraftLevelCombobox class="col-span-4" :craftMaterials="selectedMaterials" @update-craft-level="handleCraftLevelChanged"/>
        </div>
      </div>
    </div>
    <div class="flex gap-x-12">
      <div class="max-h-full max-w-full  w-2/5">
        <p class="text-xl font-minecraft text-mc-lime mb-2">Ingredients:</p>
        <div class="grid w-full grid-cols-2 gap-2 grid-rows-3 ">
          <div class="w-full">
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(0,0,value)"/>
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(0,1,value)"/>
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(1,0,value)"/>
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(1,1,value)"/>
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(2,0,value)"/>
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(2,1,value)"/>
          </div>
        </div>
      </div>
      <div class="w-1/5 max-h-full">
        <p class="text-xl font-minecraft text-mc-lime mb-2">Effectiveness:</p>
        <div class="grid h-full gap-2 grid-cols-2 grid-rows-3">
          <EffectivenessCard :ingredient="ingredients[0][0]" :effectiveness="effectiveness[0][0]"/>
          <EffectivenessCard :ingredient="ingredients[0][1]" :effectiveness="effectiveness[0][1]"/>
          <EffectivenessCard :ingredient="ingredients[1][0]" :effectiveness="effectiveness[1][0]"/>
          <EffectivenessCard :ingredient="ingredients[1][1]" :effectiveness="effectiveness[1][1]"/>
          <EffectivenessCard :ingredient="ingredients[2][0]" :effectiveness="effectiveness[2][0]"/>
          <EffectivenessCard :ingredient="ingredients[2][1]" :effectiveness="effectiveness[2][1]"/>
        </div>
      </div>
      <div class="w-2/5">
      
      </div>
    </div>
    <div class="mt-16 grid grid-cols-6 grid-rows-1 gap-x-2 gap-y-2 pb-16">
      <IngredientCard :ing="ingredients[0][0]"/>
      <IngredientCard :ing="ingredients[0][1]"/>
      <IngredientCard :ing="ingredients[1][0]"/>
      <IngredientCard :ing="ingredients[1][1]"/>
      <IngredientCard :ing="ingredients[2][0]"/>
      <IngredientCard :ing="ingredients[2][1]"/>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import "/sprites/WynnIcons.png";
import "/sprites/ProfessionIcon.png";
import "/sprites/AccessorySprites.gif";
import "/sprites/ArmourSprites.png";
import MaterialsCombobox from "./MaterialsCombobox.vue";
import CraftLevelCombobox from "./CraftLevelCombobox.vue";
import CraftTypeCombobox from "./CraftTypeCombobox.vue";
import IngredientCombobox from "./IngredientCombobox.vue";
import IngredientCard from "../IngredientCard.vue"
import EffectivenessCard from "./EffectivenessCard.vue"

export default {
    name: 'Crafter',
    async setup() {

      const igs = await fetch("/ings.json");
      const craft_types = await fetch("/craft_types.json");
      const crafts_scroll = await fetch("/crafts/scroll.json");
  
      console.log(JSON.stringify(crafts_scroll));

      const ings = ref(igs);

      const selectedCraftType = ref(craft_types[0]);
      const selectedMaterials = ref(crafts_scroll.crafts[0]);
      const selectedBound = ref(100);

      /* Thanks hpp-eng!
      let mat_tiers = [];
      mat_tiers.push(tierNum % 3 == 0 ? 3 : tierNum % 3);
      mat_tiers.push(Math.floor((tierNum-0.5) / 3)+1);
      let matmult = 1;
      let tierToMult = [0,1,1.25,1.4];
      let tiers = this.mat_tiers.slice();
      let amounts = this.recipe.get("materials").map(x=> x.get("amount"));
      matmult = (tierToMult[tiers[0]]*amounts[0] + tierToMult[tiers[1]]*amounts[1]) / (amounts[0]+amounts[1]);
      */

      const result = ref({
        duration: [0,0],
        charges: 0,
        reqStrenght: 0,
        reqIntelligence: 0,
        reqDexterity: 0,
        reqAgility: 0,
        reqDefence: 0,
        level: [0,0],
        baseHP: [0,0],
        identifications: [new Map(), new Map()],
      });

      const ingredients = reactive([
        [ref({}), ref({})],
        [ref({}), ref({})],
        [ref({}), ref({})]
      ]);

      const effectiveness = reactive([
        [ref(100), ref(100)],
        [ref(100), ref(100)],
        [ref(100), ref(100)]
      ]);

      const touching = (x1, x2, y1, y2) => x1 === x2 || (y1===y2 && (x1 === (x2-1) || x1 === (x2+1)));
      const under = (x1, x2, y1, y2) => y1 === y2 && x1 < x2;
      const above = (x1, x2, y1, y2) => y1 === y2 && x1 > x2;
      const left = (x1, x2, y1, y2) => x1 === x2 && y2 < y1;
      const right = (x1, x2, y1, y2) => x1 === x2 && y2 > y1;

      const handleIngredientUpdated = (x,y,ing) => {
          ingredients[x][y] = ing;
          assemble();
      }

      const handleCraftTypeChange = (value) => {
        if(value === undefined) return;
        selectedCraftType.value = value;
        selectedMaterials
      }

      const handleMaterialsChanged = (value) => {
        if (value === undefined) return;
        selectedMaterials.value = value;
        selectedBound.value = 0;
      }

      const handleCraftLevelChanged = (value) => {
        if(value === undefined) return;
        selectedBound.value = value;
      }

      const recaulculateEffectiveness = () => {
        effectiveness[0][0] = ref(100);
        effectiveness[0][1] = ref(100);
        effectiveness[1][0] = ref(100);
        effectiveness[1][1] = ref(100);
        effectiveness[2][0] = ref(100);
        effectiveness[2][1] = ref(100);
        for(let x1 = 0; x1 < 3; x1++) {
          for(let y1 = 0; y1 < 2; y1++) {

            let currentElement = ingredients[x1][y1];

            if(currentElement === undefined || currentElement === null || currentElement.ingredientPositionModifiers === undefined) {
              continue;
            }

            for(let x2 = 0; x2 < 3; x2++) {
              for(let y2 = 0; y2 < 2; y2++) {
                if(x1 == x2 && y1 == y2) continue;
                if(!touching(x1,x2,y1,y2)) {
                  effectiveness[x2][y2].value += currentElement.ingredientPositionModifiers.notTouching;
                }
                if(touching(x1,x2,y1,y2)) {
                  effectiveness[x2][y2].value += currentElement.ingredientPositionModifiers.touching;
                }
                if(under(x1,x2,y1,y2)) {
                  effectiveness[x2][y2].value += currentElement.ingredientPositionModifiers.under;
                }
                if(above(x1,x2,y1,y2)) {
                  effectiveness[x2][y2].value += currentElement.ingredientPositionModifiers.above;
                }
                if(left(x1,x2,y1,y2)) {
                  effectiveness[x2][y2].value += currentElement.ingredientPositionModifiers.left;
                }
                if(right(x1,x2,y1,y2)) {
                  effectiveness[x2][y2].value += currentElement.ingredientPositionModifiers.right;
                }
              }
            }

          }
        }
      }

      const assemble = () => {
        recaulculateEffectiveness();
        for(let x = 0; x < 3; x++) {
          for(let y = 0; y < 2; y++) {
            let currentIngredient = ingredients[x][y];
            
          }
        }
      }

      return {ings,ingredients, effectiveness,selectedCraftType,selectedMaterials, assemble, handleCraftLevelChanged, handleMaterialsChanged, handleIngredientUpdated, handleCraftTypeChange}
    },
    components: { IngredientCombobox, IngredientCard, IngredientCard, EffectivenessCard, CraftTypeCombobox, MaterialsCombobox, CraftLevelCombobox, IngredientCombobox }
}
</script>
