import Ingredient from "../model/ingredient";
import { ArmourLevelRanges, ArmourRecipePrototype, ConsumableLevelRanges, ConsumableRecipePrototype, RecipePrototype, WeaponLevelRanges, WeaponRecipePrototype } from "../model/recipe";
import { ItemType, CraftedAttackSpeed, NumberRange } from "./util";

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

export function assembleCraft(ingredient: IngredientSlot[], effectivenessMatrix: number[][]): WynnItem {
  
}

export function getEffectivenessMatrix(ingredient: IngredientSlot[]): number[][] {
  let effectiveness = [[100, 100], [100, 100], [100, 100]];
  for (let x1 = 0; x1 < 3; x1++) {
    for (let y1 = 0; y1 < 2; y1++) {

      let current = ingredients[x1][y1];

      if (current === undefined) {
        continue;
      }

      for (let x2 = 0; x2 < 3; x2++) {
        for (let y2 = 0; y2 < 2; y2++) {
          if (x1 == x2 && y1 == y2) continue;
          if (!touching(x1, x2, y1, y2)) {
            effectiveness[x2][y2] += current.effectivenessModifiers.notTouching;
          }
          if (touching(x1, x2, y1, y2)) {
            effectiveness[x2][y2] += current.effectivenessModifiers.touching;
          }
          if (under(x1, x2, y1, y2)) {
            effectiveness[x2][y2] += current.effectivenessModifiers.under;
          }
          if (above(x1, x2, y1, y2)) {
            effectiveness[x2][y2] += current.effectivenessModifiers.above;
          }
          if (left(x1, x2, y1, y2)) {
            effectiveness[x2][y2] += current.effectivenessModifiers.left;
          }
          if (right(x1, x2, y1, y2)) {
            effectiveness[x2][y2] += current.effectivenessModifiers.right;
          }
        }
      }

    }
  }
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

  if(recipe.levels[0].levelRange.isBetween(NumberRange.of(1,29))) {
    return 1;
  }

  if(recipe.levels[0].levelRange.isBetween(NumberRange.of(30,69))) {
    return 2;
  }

  if(recipe.levels[0].levelRange.isBetween(NumberRange.of(70,105))) {
    return 3;
  }

  return 0;
}

export function getBaseHealth<T extends RecipePrototype>(recipe: T, levelRange: NumberRange, noIngredients: Boolean) {
  return (recipe instanceof ConsumableRecipePrototype)
    ? (<ConsumableLevelRanges[]>(<ConsumableRecipePrototype>recipe).levels).filter(x => x.levelRange.equals(levelRange))[0].hpRange
    : (recipe instanceof ArmourRecipePrototype)
      ? (<ArmourLevelRanges[]>(<ArmourRecipePrototype>recipe).levels).filter(x => x.levelRange.equals(levelRange))[0].hpRange
      : NumberRange.of(0,0);
}