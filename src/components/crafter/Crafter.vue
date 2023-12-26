<template>
  <div class="p-4 md:p-8 font-minecraft md:w-4/5 mx-auto">
    <div class="w-full">
    <div class="flex flex-row justify-between mb-8">
      <p class="text-3xl text-mc-light-purple">GsWCrafter</p>
      <a class="flex p-2 rounded-md cursor-pointer py-3 gap-x-2" href="https://discord.gg/Nt2rPRHxyX" target="_blank">
        <img src="/discord.png" class="w-10 object-contain"/>
        <p class="my-auto text-xs text-mc-blue">Join our discord</p>
      </a>
    </div>
      <div class="flex flex-col md:flex-row gap-x-8 w-full mb-4">
        <div class="flex flex-col gap-x-2">
          <div class="flex gap-x-2">
            <div class="border-[1px] flex items-center justify-center h-24 w-24 p-2 rounded-md border-purple-600">
              <div v-if="craftType === 'Scroll'" class="pixelated inline-block w-16 h-16 bg-scroll bg-professions">
              </div>
              <div v-if="craftType === 'Food'" class="pixelated inline-block w-16 h-16 bg-food bg-professions">
              </div>
              <div v-if="craftType === 'Potion'" class="pixelated inline-block w-16 h-16 bg-potion bg-wynn-icons"></div>
              <div v-if="craftType === 'Ring'" class="pixelated inline-block w-[53px] h-[53px] bg-ring bg-accessories">
              </div>
              <div v-if="craftType === 'Spear'" class="">
                <img src="/sprites/spear.webp" alt="">
              </div>
              <div v-if="craftType === 'Dagger'" class="">
                <img src="/sprites/dagger.webp" alt="">
              </div>
              <div v-if="craftType === 'Relik'">
                <img src="/sprites/relik.webp" alt="">
              </div>
              <div v-if="craftType === 'Bow'">
                <img src="/sprites/bow.webp" alt="">
              </div>
              <div v-if="craftType === 'Wand'">
                <img src="/sprites/wand.webp" alt="">
              </div>
              <div v-if="craftType === 'Bracelet'"
                class="pixelated inline-block w-[62px] h-[62px] bg-bracelet bg-accessories"></div>
              <div v-if="craftType === 'Necklace'"
                class="pixelated inline-block w-[53px] h-[53px] bg-necklace bg-accessories"></div>
              <div v-if="craftType === 'Helmet'" class="pixelated inline-block h-[62px] w-[62px] bg-helmet bg-armours">
              </div>
              <div v-if="craftType === 'Chestplate'"
                class="pixelated inline-block h-[62px] w-[62px] bg-chestplate bg-armours"></div>
              <div v-if="craftType === 'Leggings'"
                class="pixelated inline-block h-[62px] w-[62px] bg-leggings bg-armours">
              </div>
              <div v-if="craftType === 'Boots'" class="pixelated inline-block h-[62px] w-[62px] bg-boots bg-armours">
              </div>
            </div>
            <div class="grid grid-cols-5 grid-rows-3 w-fit gap-x-2 gap-y-1">
              <p class="my-auto text-white">Type</p>
              <CraftTypeCombobox :craft-type="craftType" class="col-span-4" @update-craft-type="handleItemTypeChange" />
              <p class="my-auto text-white">Materials</p>
              <MaterialsCombobox :selected-prototype="recipe" class="col-span-4" :recipePrototypes="recipeRolls"
                @update-craft-materials="handleMaterialsChanged" />
              <p class="my-auto text-white">Level</p>
              <CraftLevelCombobox :level="level" class="col-span-4" :recipe="recipe"
                @update-craft-level="handleCraftLevelChanged" />
            </div>
          </div>
          <div class="max-h-full max-w-full md:mt-4 w-full">
            <p class="text-xl font-minecraft text-mc-lime mb-2">Ingredients:</p>
            <div class="grid w-full grid-cols-2 gap-2 grid-rows-3 ">
              <div class="w-full">
                <IngredientCombobox :ingredient="ingredients[0].ingredient"
                  @update-ing="value => handleIngredientUpdated(0, value)" />
              </div>
              <div>
                <IngredientCombobox :ingredient="ingredients[1].ingredient"
                  @update-ing="value => handleIngredientUpdated(1, value)" />
              </div>
              <div>
                <IngredientCombobox :ingredient="ingredients[2].ingredient"
                  @update-ing="value => handleIngredientUpdated(2, value)" />
              </div>
              <div>
                <IngredientCombobox :ingredient="ingredients[3].ingredient"
                  @update-ing="value => handleIngredientUpdated(3, value)" />
              </div>
              <div>
                <IngredientCombobox :ingredient="ingredients[4].ingredient"
                  @update-ing="value => handleIngredientUpdated(4, value)" />
              </div>
              <div>
                <IngredientCombobox :ingredient="ingredients[5].ingredient"
                  @update-ing="value => handleIngredientUpdated(5, value)" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="grid grid-cols-7 md:mt-0 mt-4 gap-x-1 gap-y-1 text-mc-gray">
            <p class="my-auto col-span-3">{{ recipe.material1 }} tier: </p>
            <MaterialTierSelector @updade-tier="value => handleMaterial1TierChanged(value)" class="my-auto col-span-4"
              :tier="material1Tier" />
            <p class="my-auto col-span-3">{{ recipe.material2 }} tier: </p>
            <MaterialTierSelector @updade-tier="value => handleMaterial2TierChanged(value)" class="my-auto col-span-4"
              :tier="material2Tier" />
            <p v-if="isWeapon(craftType)" class="col-span-3">Attack Speed: </p>
            <AttackSpeedSelector v-if="isWeapon(craftType)" :tier="attackSpeed" class="col-span-4" />
          </div>
          <div class="w-full md:mt-4 mt-4 max-h-full">
            <p class="text-xl font-minecraft text-mc-lime mb-2">Effectiveness:</p>
            <div class="grid h-full gap-2 grid-cols-2 grid-rows-3">
              <EffectivenessCard :slot="ingredients[0]" />
              <EffectivenessCard :slot="ingredients[1]" />
              <EffectivenessCard :slot="ingredients[2]" />
              <EffectivenessCard :slot="ingredients[3]" />
              <EffectivenessCard :slot="ingredients[4]" />
              <EffectivenessCard :slot="ingredients[5]" />
            </div>
          </div>
        </div>
        <div class="flex md:flex-row flex-col gap-x-12">
            <div class="w-full h-full md:mt-0 mt-4">
              <ItemCard :item="result" />
            </div>
          </div>
      </div>
    </div>
    <div @click="clipboardRecipe()"
      class="rounded-md md:mt-24 text-center w-64 mt-8 border-mc-aqua border-[1px] text-mc-light-purple px-3 p-2 h-fit mx-auto my-auto cursor-pointer">
      Copy recipe link
    </div>
    <div class="mt-24 w-full" v-show="warnings.length > 0">
      <p class="text-center text-mc-red" v-for="warn in warnings">
        {{ warn }}
      </p>
    </div>
    <div class="mt-16 grid grid-cols-2 md:grid-cols-6 grid-rows-3 md:grid-rows-1 gap-x-2 gap-y-2 pb-16">
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
import { RecipePrototype, LevelRanges, getRecipePrototypeFor, SCROLL_RECIPES, Recipe } from "../../model/recipe"
import { IngredientSlot, assembleCraft, getEffectivenessMatrix, decodeRecipe, encodeRecipe, isValidHash, isWeapon } from "../../scripts/crafter"
import { ItemType, CraftedAttackSpeed, NumberRange, MaterialTier } from "../../scripts/util"
import { WynnItem } from "../../model/item";
import ItemCard from "../ItemCard.vue";
import MaterialTierSelector from "./MaterialTierSelector.vue";
import AttackSpeedSelector from "./AttackSpeedSelector.vue";
import { useRoute } from 'vue-router'

export default {
  name: 'Crafter',
  async setup() {

    onMounted(() => {
      assemble();
    })

    const route = useRoute();
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
    const warnings: Ref<string[]> = ref([]);

    let first = true;

    const ingredients: UnwrapNestedRefs<IngredientSlot[]> = reactive([
      { ingredient: undefined, x: 0, y: 0, effectiveness: (100) },
      { ingredient: undefined, x: 1, y: 0, effectiveness: (100) },
      { ingredient: undefined, x: 0, y: 1, effectiveness: (100) },
      { ingredient: undefined, x: 1, y: 1, effectiveness: (100) },
      { ingredient: undefined, x: 0, y: 2, effectiveness: (100) },
      { ingredient: undefined, x: 1, y: 2, effectiveness: (100) },
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

    const clipboardRecipe = async () => {
      try {
        await navigator.clipboard.writeText('https://guardianofwynn.github.io/builder/#/' + (result.value === undefined ? '' : result.value!.name));
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }

    const assemble = () => {
      if (first) {
        if (route.path !== "/" && isValidHash(route.path.slice(1))) {
          let recipeStr = route.path.slice(1);
          let decoded = decodeRecipe(recipeStr, ingredientList);
          recipe.value = decoded.prototype;
          ingredients[0].ingredient = decoded.ingredients[0].ingredient;
          ingredients[1].ingredient = decoded.ingredients[1].ingredient;
          ingredients[2].ingredient = decoded.ingredients[2].ingredient;
          ingredients[3].ingredient = decoded.ingredients[3].ingredient;
          ingredients[4].ingredient = decoded.ingredients[4].ingredient;
          ingredients[5].ingredient = decoded.ingredients[5].ingredient;
          craftType.value = decoded.craftType;
          material1Tier.value = decoded.material1Tier;
          material2Tier.value = decoded.material2Tier;
          attackSpeed.value = decoded.attackSpeed === CraftedAttackSpeed.SLOW ? 'Slow' : decoded.attackSpeed === CraftedAttackSpeed.FAST ? 'Fast' : 'Normal';
          level.value = decoded.level;
        }
        first = false;
      }

      let effectMatrix = getEffectivenessMatrix(ingredients);
      ingredients[0].effectiveness = (effectMatrix[0][0]);
      ingredients[1].effectiveness = (effectMatrix[0][1]);
      ingredients[2].effectiveness = (effectMatrix[1][0]);
      ingredients[3].effectiveness = (effectMatrix[1][1]);
      ingredients[4].effectiveness = (effectMatrix[2][0]);
      ingredients[5].effectiveness = (effectMatrix[2][1]);

      let rec = new Recipe(
        recipe.value,
        ingredients,
        craftType.value,
        material1Tier.value,
        material2Tier.value,
        getAttackSpeed(attackSpeed.value),
        level.value
      );


      let res = assembleCraft(rec);
      warnings.value = res.second;
      result.value = res.first;

    }

    return { ingredientList, warnings, ingredients, attackSpeed, isWeapon, clipboardRecipe, handleMaterial1TierChanged, handleMaterial2TierChanged, material1Tier, level, material2Tier, result, recipe, craftType, recipeRolls, levelRolls, assemble, handleCraftLevelChanged, handleMaterialsChanged, handleIngredientUpdated, handleItemTypeChange }
  },
  components: { CraftLevelCombobox, MaterialsCombobox, EffectivenessCard, CraftTypeCombobox, IngredientCombobox, IngredientCard, ItemCard, MaterialTierSelector, MaterialTierSelector, AttackSpeedSelector }
}
</script>
