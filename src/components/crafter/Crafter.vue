<template>
  <div class="p-8  font-minecraft">
    <div class="w-full">
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
        <div class="grid grid-cols-5 grid-rows-3 w-fit gap-x-2 gap-y-1">
          <p class="my-auto text-white">Type</p>
          <CraftTypeCombobox class="col-span-4" @update-craft-type="handleItemTypeChange" />
          <p class="my-auto text-white">Materials</p>
          <MaterialsCombobox class="col-span-4" :recipePrototypes="recipeRolls"
            @update-craft-materials="handleMaterialsChanged" />
          <p class="my-auto text-white">Level</p>
          <CraftLevelCombobox class="col-span-4" :recipe="recipe" @update-craft-level="handleCraftLevelChanged" />
        </div>
        <div class="grid grid-cols-7 gap-x-1 gap-y-1 text-mc-gray">
          <p class="my-auto col-span-3">{{ recipe.material1 }} tier: </p>
          <MaterialTierSelector @updade-tier="value => handleMaterial1TierChanged(value)" class="my-auto col-span-4" :tier="material1Tier" />
          <p class="my-auto col-span-3" >{{ recipe.material2 }} tier: </p>
          <MaterialTierSelector @updade-tier="value => handleMaterial2TierChanged(value)" class="my-auto col-span-4" :tier="material2Tier" />
          <p class="col-span-3">Attack Speed: </p>
          <AttackSpeedSelector :tier="attackSpeed" class="col-span-4"/>
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
      <div class="w-2/5 max-h-full">
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
        <p class="text-xl font-minecraft text-mc-lime mb-2">Result:</p>
        <ItemCard :item="result"/>
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
import { onMounted, reactive, ref, Ref, UnwrapNestedRefs } from "vue";
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
import { RecipePrototype, LevelRanges, getRecipePrototypeFor, SCROLL_RECIPES, Recipe, ConsumableRecipePrototype, ArmourRecipePrototype, WeaponRecipePrototype, WeaponLevelRanges, ConsumableLevelRanges } from "../../model/recipe"
import { IngredientSlot, assembleCraft, isWeapon, isArmour, isConsumable, isAccessory } from "../../scripts/crafter"
import { ItemType, CraftedAttackSpeed, NumberRange, MaterialTier } from "../../scripts/util"
import { WynnItem } from "../../model/item";
import ItemCard from "../ItemCard.vue";
import MaterialTierSelector from "./MaterialTierSelector.vue";
import AttackSpeedSelector from "./AttackSpeedSelector.vue";

export default {
  name: 'Crafter',
  async setup() {
    
    onMounted(() => {
      assemble();
    })

    const ingredientList: Ingredient[] = await (await fetch("/builder/ingredients.json")).json();
    const craftTypes: ItemType[] = Object.values(ItemType);

    const craftType: Ref<ItemType> = ref(craftTypes[12]);
    const recipe: Ref<RecipePrototype> = ref(SCROLL_RECIPES[0]);
    const level = ref(recipe.value.levels[0]);
    const attackSpeed = ref('Normal');
    const recipeRolls: Ref<RecipePrototype[]> = ref(SCROLL_RECIPES);
    const levelRolls: Ref<LevelRanges[]> = ref(SCROLL_RECIPES[0].levels);
    const result: Ref<WynnItem | undefined> = ref(undefined);
    const material1Tier = ref(MaterialTier.TIER_1);
    const material2Tier = ref(MaterialTier.TIER_1);

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

    function getAttackSpeed(val: string) {
      return val === 'Slow' ? CraftedAttackSpeed.SLOW : val === 'Normal' ? CraftedAttackSpeed.NORMAL : CraftedAttackSpeed.FAST;
    } 

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
      assemble();
    }

    function handleMaterial1TierChanged(tier: number) {
      material1Tier.value = tier === 1 ? MaterialTier.TIER_1 : tier === 2 ? MaterialTier.TIER_2 : MaterialTier.TIER_3;
      console.log(tier);
      assemble();
    }

    function handleMaterial2TierChanged(tier: MaterialTier) {
      material2Tier.value = tier === 1 ? MaterialTier.TIER_1 : tier === 2 ? MaterialTier.TIER_2 : MaterialTier.TIER_3;
      material2Tier.value = tier;
      assemble();
    }

    function handleMaterialsChanged(val: RecipePrototype) {
      if (val === undefined) {
        return;
      }
      recipe.value = val;
      level.value = recipe.value.levels[0];
      levelRolls.value = recipe.value.levels;
      assemble();
    }

    function handleCraftLevelChanged(lvl: NumberRange) {
      if (lvl === undefined) {
        return;
      }
      level.value.levelRange = lvl;
      assemble();
    }

    const assemble = () => {
        result.value = assembleCraft(new Recipe(
          recipe.value,
          ingredients, 
          craftType.value,
          material1Tier.value,
          material2Tier.value,
          getAttackSpeed(attackSpeed.value),
          level.value
        ));
    }

    return { ingredientList, ingredients, attackSpeed, handleMaterial1TierChanged, handleMaterial2TierChanged, material1Tier, material2Tier, result, effectiveness, recipe, craftType, recipeRolls, levelRolls, assemble, handleCraftLevelChanged, handleMaterialsChanged, handleIngredientUpdated, handleItemTypeChange }
  },
  components: { CraftLevelCombobox, MaterialsCombobox, EffectivenessCard, CraftTypeCombobox, IngredientCombobox, IngredientCard, ItemCard, MaterialTierSelector, MaterialTierSelector, AttackSpeedSelector }
}
</script>
