import Ingredient from "../model/ingredient";
import { ArmourRecipe, ConsumableRecipe, NumberRange, Recipe, WeaponRecipe, emptyRange } from "../model/recipe";

const isWeapon = (craftType: string) => ["Spear", "Relik", "Wand", "Bow", "Dagger"].includes(craftType);
const isArmour = (craftType: string) => ["Helmet", "Chestplate", "Leggings", "Boots"].includes(craftType);
const isAccessory = (craftType: string) => ["Ring", "Bracelet", "Necklace"].includes(craftType);
const isConsumable = (craftType: string) => ["Potion", "Food", "Scroll"].includes(craftType);

const touching = (x1: number, x2: number, y1: number, y2: number): Boolean => x1 === x2 || (y1 === y2 && (x1 === (x2 - 1) || x1 === (x2 + 1)));
const under = (x1: number, x2: number, y1: number, y2: number): Boolean => y1 === y2 && x1 < x2;
const above = (x1: number, x2: number, y1: number, y2: number): Boolean => y1 === y2 && x1 > x2;
const left = (x1: number, x2: number, y1: number, y2: number): Boolean => x1 === x2 && y2 < y1;
const right = (x1: number, x2: number, y1: number, y2: number): Boolean => x1 === x2 && y2 > y1;

export function getEffectiveness(ingredients: Ingredient[][]): number[][] {
    let effectiveness = [[100,100], [100,100], [100,100]];
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

export function getBaseDurationOrDurability<T extends Recipe>(recipe: T, levelRange: NumberRange): NumberRange {
    let index = getLevelRangeIndex(recipe, levelRange);
    return (recipe instanceof ConsumableRecipe)
        ? (<ConsumableRecipe>recipe).possibleBaseDurationBounds[index]
        : (recipe instanceof WeaponRecipe) 
          ? (<WeaponRecipe>recipe).possibleBaseDurabilityBounds[index]
          : (recipe instanceof ArmourRecipe)
            ? (<ArmourRecipe>recipe).possibleBaseDurabilityBounds[index]
            : new NumberRange(0,0);
}

export function getBaseDamage<T extends Recipe>(recipe: T, levelRange: NumberRange, attackSpeed: "Slow" | "Normal" | "Fast"): NumberRange[] {
    let index = getLevelRangeIndex(recipe, levelRange);
    return (recipe instanceof WeaponRecipe) ?
        (attackSpeed === "Fast" ? (<WeaponRecipe>recipe).possibleBaseFastDamageBounds[index] :
          (attackSpeed === "Normal" ? (<WeaponRecipe>recipe).possibleBaseNormalDamageBounds[index]
            : (<WeaponRecipe>recipe).possibleBaseSlowDamageBounds[index])) 
        : [emptyRange(), emptyRange()];
}

export function getBaseCharges<T extends Recipe>(recipe: T): number {
    return recipe instanceof ConsumableRecipe ? (<ConsumableRecipe>recipe).charges : 0;
}

export function getBaseHealth<T extends Recipe>(recipe: T, levelRange: NumberRange, noIngredients: Boolean) {
    let index = getLevelRangeIndex(recipe, levelRange);
    return (recipe instanceof ConsumableRecipe
        ? (noIngredients ? .possibleBaseHPRBounds[index] : [0,0]) 
        : (isArmour(recipe) ? recipe.possibleBaseHPBounds[index] : [0,0]))
}

export function getLevelRangeIndex(recipe: Recipe, levelRange: NumberRange): number {
    return recipe.possibleBounds.indexOf(levelRange);
}