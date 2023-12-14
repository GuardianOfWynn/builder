<template>
  <div class="p-8  font-minecraft">
    <div class="w-2/5">
      <p class="text-3xl text-mc-light-purple mb-4">GsWCrafter</p>
      <div class="flex gap-x-4 w-full mb-4">
        <div class="border-[1px] flex items-center justify-center h-24 w-24 p-2 rounded-md border-purple-600">
          <div v-if="craftType === 'Scroll'"
            class="pixelated inline-block w-16 h-16 bg-scroll bg-professions"></div>
          <div v-if="craftType === 'Food'" class="pixelated inline-block w-16 h-16 bg-food bg-professions">
          </div>
          <div v-if="craftType === 'Potion'"
            class="pixelated inline-block w-16 h-16 bg-potion bg-wynn-icons"></div>
          <div v-if="craftType === 'Ring'"
            class="pixelated inline-block w-[53px] h-[53px] bg-ring bg-accessories"></div>
          <div v-if="craftType === 'Bracelet'"
            class="pixelated inline-block w-[62px] h-[62px] bg-bracelet bg-accessories"></div>
          <div v-if="craftType === 'Necklace'"
            class="pixelated inline-block w-[53px] h-[53px] bg-necklace bg-accessories"></div>
          <div v-if="craftType === 'Helmet'"
            class="pixelated inline-block h-[62px] w-[62px] bg-helmet bg-armours"></div>
          <div v-if="craftType === 'Chestplate'"
            class="pixelated inline-block h-[62px] w-[62px] bg-chestplate bg-armours"></div>
          <div v-if="craftType === 'Leggings'"
            class="pixelated inline-block h-[62px] w-[62px] bg-leggings bg-armours"></div>
          <div v-if="craftType === 'Boots'"
            class="pixelated inline-block h-[62px] w-[62px] bg-boots bg-armours"></div>
        </div>
        <div class="grid grid-cols-5 grid-rows-3 w-full gap-y-1">
          <p class="my-auto text-white">Type</p>
          <CraftTypeCombobox class="col-span-4" 
            @update-craft-type="handleCraftTypeChange" />
          <p class="my-auto text-white">Materials</p>
          <MaterialsCombobox class="col-span-4" 
            :materials="materialRolls"
            @update-craft-materials="handleMaterialsChanged"/>
          <p class="my-auto text-white">Level</p>
          <CraftLevelCombobox class="col-span-4" 
            :levels="levelRolls"
            @update-craft-level="handleCraftLevelChanged" />
        </div>
      </div>
    </div>
    <div class="flex gap-x-12">
      <div class="max-h-full max-w-full  w-2/5">
        <p class="text-xl font-minecraft text-mc-lime mb-2">Ingredients:</p>
        <div class="grid w-full grid-cols-2 gap-2 grid-rows-3 ">
          <div class="w-full">
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(0, 0, value)" />
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(0, 1, value)" />
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(1, 0, value)" />
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(1, 1, value)" />
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(2, 0, value)" />
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(2, 1, value)" />
          </div>
        </div>
      </div>
      <div class="w-1/5 max-h-full">
        <p class="text-xl font-minecraft text-mc-lime mb-2">Effectiveness:</p>
        <div class="grid h-full gap-2 grid-cols-2 grid-rows-3">
          <EffectivenessCard :ingredient="ingredients[0][0]" :effectiveness="effectiveness[0][0]" />
          <EffectivenessCard :ingredient="ingredients[0][1]" :effectiveness="effectiveness[0][1]" />
          <EffectivenessCard :ingredient="ingredients[1][0]" :effectiveness="effectiveness[1][0]" />
          <EffectivenessCard :ingredient="ingredients[1][1]" :effectiveness="effectiveness[1][1]" />
          <EffectivenessCard :ingredient="ingredients[2][0]" :effectiveness="effectiveness[2][0]" />
          <EffectivenessCard :ingredient="ingredients[2][1]" :effectiveness="effectiveness[2][1]" />
        </div>
      </div>
      <div class="w-2/5">

      </div>
    </div>
    <div class="mt-16 grid grid-cols-6 grid-rows-1 gap-x-2 gap-y-2 pb-16">
      <IngredientCard :ing="ingredients[0][0]" />
      <IngredientCard :ing="ingredients[0][1]" />
      <IngredientCard :ing="ingredients[1][0]" />
      <IngredientCard :ing="ingredients[1][1]" />
      <IngredientCard :ing="ingredients[2][0]" />
      <IngredientCard :ing="ingredients[2][1]" />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import "/sprites/WynnIcons.png";
import "/sprites/ProfessionIcon.png";
import "/sprites/AccessorySprites.gif";
import "/sprites/ArmourSprites.png";
import {getBaseCharges, getBaseDamage, getBaseHealth, getBaseDurationOrDurability, getEffectiveness} from "../../scripts/crafter.js"
import MaterialsCombobox from "./MaterialsCombobox.vue";
import CraftLevelCombobox from "./CraftLevelCombobox.vue";
import CraftTypeCombobox from "./CraftTypeCombobox.vue";
import IngredientCombobox from "./IngredientCombobox.vue";
import IngredientCard from "../IngredientCard.vue"
import EffectivenessCard from "./EffectivenessCard.vue"

export default {
  name: 'Crafter',
  async setup() {

    const spearCrafts = await (await fetch("/builder/crafts/spear.json")).json();
    const helmetCrafts = await (await fetch("/builder/crafts/helmet.json")).json();
    const chestplateCrafts = await (await fetch("/builder/crafts/chestplate.json")).json();
    const leggingsCrafts = await (await fetch("/builder/crafts/leggings.json")).json();
    const bootsCrafts = await (await fetch("/builder/crafts/boots.json")).json();
    const foodCrafts = await (await fetch("/builder/crafts/food.json")).json();
    const potionCrafts = await (await fetch("/builder/crafts/potion.json")).json();
    const scrollCrafts = await (await fetch("/builder/crafts/scroll.json")).json();
    const ingredientList = await (await fetch("/builder/ings.json")).json();
    const craftTypes = await (await fetch("/builder/craft_types.json")).json();

    const craftType = ref(craftTypes[0]);
    const materials = ref(scrollCrafts.crafts[0]);
    const level = ref([1,3]);
    const attackSpeed = ref("Slow");

    const materialRolls = ref(scrollCrafts.crafts);
    const levelRolls = ref(scrollCrafts.crafts[0].possibleBounds);

    const ingredients = reactive([
      [ref(undefined), ref(undefined)],
      [ref(undefined), ref(undefined)],
      [ref(undefined), ref(undefined)]
    ]);

    const effectiveness = reactive([
      [ref(100), ref(100)],
      [ref(100), ref(100)],
      [ref(100), ref(100)]
    ]);

    function getMaterialsFor(craftType) {
      switch (craftType) {
        case "Helmet": return helmetCrafts.crafts;
        case "Chestplate": return chestplateCrafts.crafts;
        case "Leggings": return leggingsCrafts.crafts;
        case "Boots": return bootsCrafts.crafts;
        case "Potion": return potionCrafts.crafts;
        case "Food": return foodCrafts.crafts;
        case "Scroll": return scrollCrafts.crafts;
        default: return "";
      }
    }

    function handleIngredientUpdated(x,y,ingredient) {
      ingredients[x][y].value = ingredient;
      assemble();
    }

    function handleCraftTypeChange(val) {
      if (val === undefined) { 
        return;
      }
      materialRolls.value = getMaterialsFor(val);
      materials.value = materialRolls.value[0];
      levelRolls.value = materials.value.possibleBounds;
      craftType.value = val;
      level.value = materials.value.possibleBounds[0];
    }

    function handleMaterialsChanged(material) {
      if (material === undefined) {
        return;
      }
      materials.value = material;
      level.value = materials.value.possibleBounds[0];
      levelRolls.value = materials.value.possibleBounds;
    }

    function handleCraftLevelChanged(lvl) {
      if (lvl === undefined) {
        return;
      }
      level.value = lvl;
    }

    const noIngredients = () => ingredients.flat(1).every(x => x === undefined);

    const assemble = () => {

      let effec = getEffectiveness(ingredients);
      
      effectiveness[0][0].value = effec[0][0];
      effectiveness[0][1].value = effec[0][1];
      effectiveness[1][0].value = effec[1][0];
      effectiveness[1][1].value = effec[1][1];
      effectiveness[2][0].value = effec[2][0];
      effectiveness[2][1].value = effec[2][1];

      let materialTierMultiplier = 1;

      let baseDurabilityOrDuration = getBaseDurationOrDurability(craftType.value, materials.value, level.value);
      let baseCharges = getBaseCharges(materials.value);
      let baseHp = getBaseHealth(craftType.value, materials.value, level.value, noIngredients());
      let baseDamage = getBaseDamage(craftType.value, materials.value, level.value, attackSpeed.value);

      const result = {
        duration: baseDurabilityOrDuration,
        baseDamage: baseDamage,
        charges: baseCharges,
        reqStrenght: 0,
        reqIntelligence: 0,
        reqDexterity: 0,
        reqAgility: 0,
        reqDefence: 0,
        level: level.value,
        baseHP: baseHp,
        rolls: [new Map(), new Map()],
      };

      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 2; y++) {

          let currentIngredient = ingredients[x][y];
          if(currentIngredient === undefined || currentIngredient.name === undefined) {
            continue;
          }

          let multiplier = effectiveness[x][y]/100;
          let unwrapped = currentIngredient;

          result.reqStrenght += unwrapped.itemOnlyIDs.strengthRequirement *multiplier;
          result.reqIntelligence += unwrapped.itemOnlyIDs.intelligenceRequirement*multiplier;
          result.reqAgility += unwrapped.itemOnlyIDs.agilityRequirement*multiplier;
          result.reqDefence += unwrapped.itemOnlyIDs.defenceRequirement*multiplier;
          result.reqDexterity += unwrapped.itemOnlyIDs.dexterityRequirement*multiplier;
          
        }
      }
    }

    return { ingredientList, ingredients, effectiveness, craftType, materials, materialRolls, levelRolls, assemble, handleCraftLevelChanged, handleMaterialsChanged, handleIngredientUpdated, handleCraftTypeChange }
  },
  components: { IngredientCombobox, IngredientCard, IngredientCard, EffectivenessCard, CraftTypeCombobox, MaterialsCombobox, CraftLevelCombobox, IngredientCombobox }
}
</script>
