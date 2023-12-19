<template>
  <div class="p-8  font-minecraft">
    <div class="w-2/5">
      <p class="text-3xl text-mc-light-purple mb-4">GsWCrafter</p>
      <div class="flex gap-x-4 w-full mb-4">
        <div class="border-[1px] flex items-center justify-center h-24 w-24 p-2 rounded-md border-purple-600">
          <div v-if="craftType === 'Scroll'" class="pixelated inline-block w-16 h-16 bg-scroll bg-professions"></div>
          <div v-if="craftType === 'Food'" class="pixelated inline-block w-16 h-16 bg-food bg-professions">
          </div>
          <div v-if="craftType === 'Potion'" class="pixelated inline-block w-16 h-16 bg-potion bg-wynn-icons"></div>
          <div v-if="craftType === 'Ring'" class="pixelated inline-block w-[53px] h-[53px] bg-ring bg-accessories"></div>
          <div v-if="craftType === 'Bracelet'"
            class="pixelated inline-block w-[62px] h-[62px] bg-bracelet bg-accessories"></div>
          <div v-if="craftType === 'Necklace'"
            class="pixelated inline-block w-[53px] h-[53px] bg-necklace bg-accessories"></div>
          <div v-if="craftType === 'Helmet'" class="pixelated inline-block h-[62px] w-[62px] bg-helmet bg-armours"></div>
          <div v-if="craftType === 'Chestplate'"
            class="pixelated inline-block h-[62px] w-[62px] bg-chestplate bg-armours"></div>
          <div v-if="craftType === 'Leggings'" class="pixelated inline-block h-[62px] w-[62px] bg-leggings bg-armours">
          </div>
          <div v-if="craftType === 'Boots'" class="pixelated inline-block h-[62px] w-[62px] bg-boots bg-armours"></div>
        </div>
        <div class="grid grid-cols-5 grid-rows-3 w-full gap-y-1">
          <p class="my-auto text-white">Type</p>
          <CraftTypeCombobox class="col-span-4" @update-craft-type="handleItemTypeChange" />
          <p class="my-auto text-white">Materials</p>
          <MaterialsCombobox class="col-span-4" :recipePrototypes="recipeRolls"
            @update-craft-materials="handleMaterialsChanged" />
          <p class="my-auto text-white">Level</p>
          <CraftLevelCombobox class="col-span-4" :recipe="recipe" @update-craft-level="handleCraftLevelChanged" />
        </div>
      </div>
    </div>
    <div class="flex gap-x-12">
      <div class="max-h-full max-w-full  w-2/5">
        <p class="text-xl font-minecraft text-mc-lime mb-2">Ingredients:</p>
        <div class="grid w-full grid-cols-2 gap-2 grid-rows-3 ">
          <div class="w-full">
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(0, value)" />
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(1, value)" />
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(2, value)" />
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(3, value)" />
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(4, value)" />
          </div>
          <div>
            <IngredientCombobox @update-ing="value => handleIngredientUpdated(5, value)" />
          </div>
        </div>
      </div>
      <div class="w-1/5 max-h-full">
        <p class="text-xl font-minecraft text-mc-lime mb-2">Effectiveness:</p>
        <div class="grid h-full gap-2 grid-cols-2 grid-rows-3">
          <EffectivenessCard :ingredient="ingredients[0].ingredient" :effectiveness="effectiveness[0][0]" />
          <EffectivenessCard :ingredient="ingredients[1].ingredient" :effectiveness="effectiveness[0][1]" />
          <EffectivenessCard :ingredient="ingredients[2].ingredient" :effectiveness="effectiveness[1][0]" />
          <EffectivenessCard :ingredient="ingredients[3].ingredient" :effectiveness="effectiveness[1][1]" />
          <EffectivenessCard :ingredient="ingredients[4].ingredient" :effectiveness="effectiveness[2][0]" />
          <EffectivenessCard :ingredient="ingredients[5].ingredient" :effectiveness="effectiveness[2][1]" />
        </div>
      </div>
      <div class="w-2/5">

      </div>
    </div>
    <div class="mt-16 grid grid-cols-6 grid-rows-1 gap-x-2 gap-y-2 pb-16">
      <IngredientCard :ingredient="ingredients[0].ingredient" />
      <IngredientCard :ingredient="ingredients[1].ingredient" />
      <IngredientCard :ingredient="ingredients[2].ingredient" />
      <IngredientCard :ingredient="ingredients[3].ingredient" />
      <IngredientCard :ingredient="ingredients[4].ingredient" />
      <IngredientCard :ingredient="ingredients[5].ingredient" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, Ref, UnwrapNestedRefs } from "vue";
import "/sprites/WynnIcons.png";
import "/sprites/ProfessionIcon.png";
import "/sprites/AccessorySprites.gif";
import "/sprites/ArmourSprites.png";
import CraftLevelCombobox from "./CraftLevelCombobox.vue"
import IngredientCombobox from "./IngredientCombobox.vue"
import IngredientCard from "../IngredientCard.vue"
import EffectivenessCard from "./EffectivenessCard.vue"
import MaterialsCombobox from "./MaterialsCombobox.vue"
import CraftTypeCombobox from "./CraftTypeCombobox.vue"
import Ingredient from "../../model/ingredient";
import { RecipePrototype, LevelRanges, getRecipePrototypeFor, SCROLL_RECIPES } from "../../model/recipe"
import { getEffectivenessMatrix, IngredientSlot, getBaseDurationOrDurability, getBaseCharges, getBaseHealth, getBaseDamage } from "../../scripts/crafter"
import { ItemType, CraftedAttackSpeed, NumberRange } from "../../scripts/util"

export default {
  name: 'Crafter',
  async setup() {

    const noIngredients = () => ingredients.flat(1).every(x => x.ingredient === undefined);

    const ingredientList: Ingredient[] = await (await fetch("/builder/ingredients.json")).json();
    const craftTypes: string[] = await (await fetch("/builder/craft_types.json")).json();

    const craftType = ref(craftTypes[0]);
    const recipe: Ref<RecipePrototype> = ref(SCROLL_RECIPES[0]);
    const level = ref(recipe.value.levels[0]);
    const attackSpeed = ref(CraftedAttackSpeed.NORMAL);
    const recipeRolls: Ref<RecipePrototype[]> = ref(SCROLL_RECIPES);
    const levelRolls: Ref<LevelRanges[]> = ref(SCROLL_RECIPES[0].levels);

    const ingredients: UnwrapNestedRefs<IngredientSlot[]> = reactive([
      { ingredient: undefined, x: 0, y: 0 },
      { ingredient: undefined, x: 1, y: 0 },
      { ingredient: undefined, x: 0, y: 1 },
      { ingredient: undefined, x: 1, y: 1 },
      { ingredient: undefined, x: 0, y: 2 },
      { ingredient: undefined, x: 1, y: 2 },
    ]);

    const effectiveness = reactive([
      [ref(100), ref(100)],
      [ref(100), ref(100)],
      [ref(100), ref(100)]
    ]);

    function handleIngredientUpdated(pos: number, ingredient: Ingredient) {
      ingredients[pos].ingredient = ingredient;
      assemble();
    }

    function handleItemTypeChange(val: ItemType) {
      if (val === undefined) {
        return;
      }
      recipeRolls.value = getRecipePrototypeFor(val);
      recipe.value = recipeRolls.value[0];
      levelRolls.value = recipe.value.levels;
      craftType.value = val;
      level.value = recipe.value.levels[0];
    }

    function handleMaterialsChanged(val: RecipePrototype) {
      if (val === undefined) {
        return;
      }
      recipe.value = val;
      level.value = recipe.value.levels[0];
      levelRolls.value = recipe.value.levels;
    }

    function handleCraftLevelChanged(lvl: NumberRange) {
      if (lvl === undefined) {
        return;
      }
      level.value.levelRange = lvl;
    }

    const assemble = () => {

      let effec = getEffectivenessMatrix(ingredients);
      console.log(effec);
      effectiveness[0][0].value = effec[0][0];
      effectiveness[0][1].value = effec[0][1];
      effectiveness[1][0].value = effec[1][0];
      effectiveness[1][1].value = effec[1][1];
      effectiveness[2][0].value = effec[2][0];
      effectiveness[2][1].value = effec[2][1];
      let materialTierMultiplier = 1;
      let baseDurabilityOrDuration = getBaseDurationOrDurability(recipe.value, level.value.levelRange);
      let baseCharges = getBaseCharges(recipe.value);
      let baseHp = getBaseHealth(recipe.value, level.value.levelRange, noIngredients());
      let baseDamage = getBaseDamage(recipe.value, level.value.levelRange);

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

      Array.from(ingredients.values()).forEach(ingredientSlot => {

        if (ingredientSlot.ingredient === undefined || ingredientSlot.ingredient.name === undefined) {
          return;
        }

        let ingredient = ingredientSlot.ingredient;
        let multiplier = effectiveness[ingredientSlot.x][ingredientSlot.y].value;
        result.reqStrenght += ingredient.requirements.strength * multiplier;
        result.reqIntelligence += ingredient.requirements.intelligence * multiplier;
        result.reqAgility += ingredient.requirements.agility * multiplier;
        result.reqDefence += ingredient.requirements.defence * multiplier;
        result.reqDexterity += ingredient.requirements.dexterity * multiplier;

      });
    }

    return { ingredientList, ingredients, effectiveness, recipe, craftType, recipeRolls, levelRolls, assemble, handleCraftLevelChanged, handleMaterialsChanged, handleIngredientUpdated, handleItemTypeChange }
  },
  components: {CraftLevelCombobox, MaterialsCombobox, EffectivenessCard, CraftTypeCombobox, IngredientCombobox, IngredientCard}
}
</script>
