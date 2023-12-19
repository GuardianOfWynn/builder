import Ingredient from "../model/ingredient";
import { ArmourLevelRanges, ArmourRecipePrototype, ConsumableLevelRanges, ConsumableRecipePrototype, Recipe, RecipePrototype, WeaponLevelRanges, WeaponRecipePrototype } from "../model/recipe";
import { ItemType, CraftedAttackSpeed, NumberRange, isBetween, MaterialTier, AttackSpped } from "./util";
import { WynnItem } from "../model/item";
import { Ref } from "vue";

const isWeapon = (craftType: ItemType) => [ItemType.WAND, ItemType.BOW, ItemType.RELIK, ItemType.SPEAR, ItemType.DAGGER].includes(craftType);
const isArmour = (craftType: ItemType) => [ItemType.HELMET, ItemType.CHESTPLATE, ItemType.LEGGINGS, ItemType.BOOTS].includes(craftType);
const isAccessory = (craftType: ItemType) => [ItemType.RING, ItemType.BRACELET, ItemType.NECKLACE].includes(craftType);
const isConsumable = (craftType: ItemType) => [ItemType.POTION, ItemType.FOOD, ItemType.SCROLL].includes(craftType);

const touching = (x1: number, x2: number, y1: number, y2: number): Boolean => y1 === y2 || (x1 === x2 && (y1 === (y2 - 1) || y1 === (y2 + 1)));
const under = (x1: number, x2: number, y1: number, y2: number): Boolean => x1 === x2 && y1 < y2;
const above = (x1: number, x2: number, y1: number, y2: number): Boolean => x1 === x2 && y1 > y2;
const left = (x1: number, x2: number, y1: number, y2: number): Boolean => y1 === y2 && x2 < x1;
const right = (x1: number, x2: number, y1: number, y2: number): Boolean => y1 === y2 && x2 > x1;

export interface IngredientSlot {
  ingredient: Ingredient | undefined,
  x: number,
  y: number
}


export function assembleCraft(recipe: Recipe): WynnItem {
  let effectivenessMatrix = getEffectivenessMatrix(recipe.ingredients);

  let item = new WynnItem();

  let baseDurability = getBaseDurationOrDurability(recipe.prototype, recipe.level.levelRange);
  item.craftedStatus.durability = baseDurability;
  item.craftedStatus.duration = baseDurability;

  let baseDamage = getBaseDamage(recipe.prototype, recipe.level.levelRange);
  item.damages.neutral = baseDamage;

  if(recipe.prototype instanceof ArmourRecipePrototype) {
    item.defenses = {
      air: new NumberRange(0,0),
      earth: new NumberRange(0,0),
      thunder: new NumberRange(0,0),
      water: new NumberRange(0,0),
      fire: new NumberRange(0,0)
    };
    item.craftedStatus.durability = new NumberRange(0,0);
  }
  if(recipe.prototype instanceof ArmourRecipePrototype) {

  }

  ingredients.forEach(ingredients => {

  })
}


export function getEffectivenessMatrix(ingredients: IngredientSlot[]): number[][] {
  let effectiveness = [[100, 100], [100, 100], [100, 100]];
  ingredients.forEach(ingredient => {

    if(ingredient.ingredient === undefined) {
      return;
    }

    ingredients.forEach(target => {
      
      if (!touching(ingredient.x, target.x, ingredient.y, target.y)) {
        effectiveness[target.y][target.x] += ingredient.ingredient!.effectivenessModifiers.notTouching;
      }
      if (touching(ingredient.x, target.x, ingredient.y, target.y)) {
        effectiveness[target.y][target.x] += ingredient.ingredient!.effectivenessModifiers.touching;
      }
      if (under(ingredient.x, target.x, ingredient.y, target.y)) {
        effectiveness[target.y][target.x] += ingredient.ingredient!.effectivenessModifiers.under;
      }
      if (above(ingredient.x, target.x, ingredient.y, target.y)) {
        effectiveness[target.y][target.x] += ingredient.ingredient!.effectivenessModifiers.above;
      }
      if (left(ingredient.x, target.x, ingredient.y, target.y)) {
        effectiveness[target.y][target.x] += ingredient.ingredient!.effectivenessModifiers.left;
      }
      if (right(ingredient.x, target.x, ingredient.y, target.y)) {
        effectiveness[target.y][target.x] += ingredient.ingredient!.effectivenessModifiers.right;
      }
    })
  });
  return effectiveness;
}

export function getBaseDurationOrDurability<T extends RecipePrototype>(recipe: T, levelRange: NumberRange): NumberRange {
  return (recipe instanceof ConsumableRecipePrototype)
    ? (<ConsumableLevelRanges[]>(<ConsumableRecipePrototype>recipe).levels).filter(x => x.levelRange.equals(levelRange))[0].durationRange
    : (recipe instanceof WeaponRecipePrototype)
      ? (<WeaponLevelRanges[]>(<WeaponRecipePrototype>recipe).levels).filter(x => x.levelRange.equals(levelRange))[0].durabilityRange
      : (recipe instanceof ArmourRecipePrototype)
        ? (<ArmourLevelRanges[]>(<ArmourRecipePrototype>recipe).levels).filter(x => x.levelRange.equals(levelRange))[0].durabilityRange
        : NumberRange.of(0, 0);
}

export function getBaseDamage<T extends RecipePrototype>(recipe: T, levelRange: NumberRange): NumberRange {
  return (recipe instanceof WeaponRecipePrototype)
    ? (<WeaponLevelRanges[]>(<WeaponRecipePrototype>recipe).levels).filter(x => x.levelRange.equals(levelRange))[0].damageRange
    : NumberRange.of(0, 0);
}

export function getBaseCharges<T extends RecipePrototype>(recipe: T): number {

  if (recipe! instanceof ConsumableRecipePrototype) {
    return 0;
  }

  if(isBetween(recipe.levels[0].levelRange, NumberRange.of(1,29))) {
    return 1;
  }

  if(isBetween(recipe.levels[0].levelRange, NumberRange.of(30,69))) {
    return 2;
  }

  if(isBetween(recipe.levels[0].levelRange, NumberRange.of(70,105))) {
    return 3;
  }

  return 0;
}

export function getBaseHealth<T extends RecipePrototype>(recipe: T, levelRange: NumberRange, noIngredients: Boolean) {
  return (recipe instanceof ConsumableRecipePrototype && noIngredients)
    ? (<ConsumableLevelRanges[]>(<ConsumableRecipePrototype>recipe).levels).filter(x => x.levelRange.equals(levelRange))[0].hpRange
    : (recipe instanceof ArmourRecipePrototype)
      ? (<ArmourLevelRanges[]>(<ArmourRecipePrototype>recipe).levels).filter(x => x.levelRange.equals(levelRange))[0].hpRange
      : NumberRange.of(0,0);
}