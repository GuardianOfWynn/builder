import Ingredient, { Identification } from "../model/ingredient";
import { ArmourLevelRanges, ArmourRecipePrototype, ConsumableLevelRanges, ConsumableRecipePrototype, LevelRanges, Recipe, RecipePrototype, WeaponLevelRanges, WeaponRecipePrototype, getRecipePrototypeFor } from "../model/recipe";
import { ItemType, CraftedAttackSpeed, NumberRange, isBetween, sumWithMax, WynnClass, MaterialTier, AttackSpeed, Pair, getProfessionForItemType, sum } from "./util";
import { WynnItem } from "../model/item";
import { Ref, warn } from "vue";
import { calculateMaterialMultiplier } from "./math";

export const isWeapon = (craftType: ItemType) => [ItemType.WAND, ItemType.BOW, ItemType.RELIK, ItemType.SPEAR, ItemType.DAGGER].includes(craftType);
export const isArmour = (craftType: ItemType) => [ItemType.HELMET, ItemType.CHESTPLATE, ItemType.LEGGINGS, ItemType.BOOTS].includes(craftType);
export const isAccessory = (craftType: ItemType) => [ItemType.RING, ItemType.BRACELET, ItemType.NECKLACE].includes(craftType);
export const isConsumable = (craftType: ItemType) => [ItemType.POTION, ItemType.FOOD, ItemType.SCROLL].includes(craftType);

const touching = (x1: number, x2: number, y1: number, y2: number): Boolean => y1 === y2 || (x1 === x2 && (y1 === (y2 - 1) || y1 === (y2 + 1)));
const under = (x1: number, x2: number, y1: number, y2: number): Boolean => x1 === x2 && y1 < y2;
const above = (x1: number, x2: number, y1: number, y2: number): Boolean => x1 === x2 && y1 > y2;
const left = (x1: number, x2: number, y1: number, y2: number): Boolean => y1 === y2 && x2 < x1;
const right = (x1: number, x2: number, y1: number, y2: number): Boolean => y1 === y2 && x2 > x1;

export class IngredientSlot {
  ingredient: Ingredient | undefined;
  effectiveness: number;
  x: number;
  y: number;
}


export function assembleCraft(recipe: Recipe): Pair<WynnItem, string[]> {
  let effectivenessMatrix = getEffectivenessMatrix(recipe.ingredients);
  let warnings: string[] = []; 

  let item = new WynnItem();
  item.name = recipe.hash;
  item.isCrafted = true;

  let targetProf = getProfessionForItemType(recipe.craftType);

  let materialMultiplier = calculateMaterialMultiplier(recipe.prototype.material1Amount, recipe.prototype.material2Amount, recipe.material1Tier, recipe.material2Tier);
  let baseCharges = getBaseCharges(recipe.craftType, recipe.prototype);
  let baseDurability = getBaseDurationOrDurability(recipe.craftType, recipe.prototype, recipe.level, recipe.ingredients.every(x => x.ingredient === undefined));
  item.craftedStatus = {
    durability: isConsumable(recipe.craftType) ? new NumberRange(0, 0) : new NumberRange(baseDurability.minimum * materialMultiplier, baseDurability.maximum * materialMultiplier),
    duration: !isConsumable(recipe.craftType) ? new NumberRange(0, 0) : new NumberRange(baseDurability.minimum * materialMultiplier, baseDurability.maximum * materialMultiplier),
    charges: baseCharges
  }

  let baseHealth = getBaseHealth(recipe.craftType, recipe.prototype, recipe.level, recipe.ingredients.every(x => x.ingredient === undefined))
  item.health = new NumberRange(baseHealth.minimum * materialMultiplier, baseHealth.maximum * materialMultiplier);

  item.requirements = {
    strength: 0,
    agility: 0,
    dexterity: 0,
    intelligence: 0,
    defence: 0,
    level: 0
  }

  let baseDamage = getBaseDamage(recipe.craftType, recipe.prototype, recipe.level);
  item.damages = {
    air: new NumberRange(0, 0),
    earth: new NumberRange(0, 0),
    fire: new NumberRange(0, 0),
    neutral: baseDamage,
    thunder: new NumberRange(0, 0),
    water: new NumberRange(0, 0)
  }

  item.type = recipe.craftType;

  switch (recipe.craftType) {
    case ItemType.SPEAR:
      item.clazz = WynnClass.WARRIOR;
      break;

    case ItemType.BOW:
      item.clazz = WynnClass.ARCHER;
      break;

    case ItemType.WAND:
      item.clazz = WynnClass.MAGE;
      break;

    case ItemType.RELIK:
      item.clazz = WynnClass.SHAMAN;
      break;

    case ItemType.DAGGER:
      item.clazz = WynnClass.ASSASSIN;
      break;
  }

  let identifications: Identification[] = [];
  recipe.ingredients.forEach(slot => {

    if (slot.ingredient === undefined || slot.ingredient === null) {
      return;
    }

    let effectivenessMultiplier = effectivenessMatrix[slot.y][slot.x] / 100;
    let ingredient = slot.ingredient;

    if(ingredient.level > recipe.level.levelRange.maximum) {
      let warning = "WARNING: " + ingredient.name + " requires combat level " + ingredient.level;
      if(!warnings.includes(warning)) {
        warnings.push(warning);
      }
    }

    if(!ingredient.skills.includes(targetProf)) {
      let warning = "WARNING: " + ingredient.name + " cannot be used for " + targetProf;
      if(!warnings.includes(warning)) {
        warnings.push(warning);
      }
    }

    if (ingredient.level > item.requirements.level) {
      item.requirements.level = ingredient.level;
    }

    // Requirements calc
    item.requirements.agility += ingredient.requirements.agility * effectivenessMultiplier;
    item.requirements.defence += ingredient.requirements.defence * effectivenessMultiplier;
    item.requirements.strength += ingredient.requirements.strength * effectivenessMultiplier;
    item.requirements.dexterity += ingredient.requirements.dexterity * effectivenessMultiplier;
    item.requirements.intelligence += ingredient.requirements.intelligence * effectivenessMultiplier;

    // Duration/durability calc
    if (isConsumable(recipe.craftType)) {
      item.craftedStatus.charges = item.craftedStatus.charges + ingredient.modifiers.charges;
      item.craftedStatus.duration = sum(item.craftedStatus.duration, ingredient.modifiers.duration);
    } else {
      item.craftedStatus.durability = sum(item.craftedStatus.durability, ingredient.modifiers.durability);
    }
    
    // Implement powders on weapons and armours

    // Identifications calc
    ingredient.identifications.forEach(identification => {
      let index = identifications.findIndex(x => x.id === identification.id);
      if (index === -1) {
        identifications.push({
          id: identification.id,
          name: identification.name,
          maximum: Math.floor(identification.maximum * effectivenessMultiplier),
          minimum: Math.floor(identification.minimum * effectivenessMultiplier)
        })
      } else {
        identifications[index].maximum += Math.floor(identification.maximum * effectivenessMultiplier);
        identifications[index].minimum += Math.floor(identification.minimum * effectivenessMultiplier);
      }
    });
  })

  if(isConsumable(recipe.craftType)) {
    item.craftedStatus.duration = NumberRange.of(Math.max(10, item.craftedStatus.duration.minimum), Math.max(10, item.craftedStatus.duration.maximum));
    item.craftedStatus.charges = Math.max(1, item.craftedStatus.charges);
  } else {
    item.craftedStatus.durability = NumberRange.of(Math.max(1, item.craftedStatus.durability.minimum), Math.max(1, item.craftedStatus.durability.maximum));
  }

  item.identifications = identifications;

  return {
    first: item,
    second: warnings
  };

}

export function getEffectivenessMatrix(ingredients: IngredientSlot[]): number[][] {
  let effectiveness = [[100, 100], [100, 100], [100, 100]];
  ingredients.forEach(ingredient => {

    if (ingredient.ingredient === undefined || ingredient.ingredient === null) {
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

export function getBaseDurationOrDurability<T extends RecipePrototype>(craftType: ItemType, recipe: T, levelRange: LevelRanges, noIngredients: boolean): NumberRange {
  return (isConsumable(craftType))
    ? (!noIngredients ? (<ConsumableLevelRanges[]>(<ConsumableRecipePrototype><unknown>recipe).levels).filter(x => x.id === levelRange.id)[0].durationRange : new NumberRange(3, 3))
    : ((isWeapon(craftType)))
      ? (<WeaponLevelRanges[]>(<WeaponRecipePrototype><unknown>recipe).levels).filter(x => x.id === levelRange.id)[0].durabilityRange
      : (isArmour(craftType) || isAccessory(craftType))
        ? (<ArmourLevelRanges[]>(<ArmourRecipePrototype><unknown>recipe).levels).filter(x => x.id === levelRange.id)[0].durabilityRange
        : NumberRange.of(12, 12);
}

export function getBaseDamage<T extends RecipePrototype>(craftType: ItemType, recipe: T, levelRange: LevelRanges): NumberRange {
  return (isWeapon(craftType))
    ? (<WeaponLevelRanges[]>(<WeaponRecipePrototype><unknown>recipe).levels).filter(x => x.id === levelRange.id)[0].damageRange
    : NumberRange.of(0, 0);
}

export function getBaseCharges<T extends RecipePrototype>(craftType: ItemType, recipe: T): number {

  if (!isConsumable(craftType)) {
    return 0;
  }

  if (isBetween(recipe.levels[0].levelRange, NumberRange.of(1, 29))) {
    return 1;
  }

  if (isBetween(recipe.levels[0].levelRange, NumberRange.of(30, 69))) {
    return 2;
  }

  if (isBetween(recipe.levels[0].levelRange, NumberRange.of(70, 105))) {
    return 3;
  }

  return 1;
}

export function getBaseHealth<T extends RecipePrototype>(craftType: ItemType, recipe: T, levelRange: LevelRanges, noIngredients: Boolean) {
  return (isConsumable(craftType) && noIngredients)
    ? (<ConsumableLevelRanges[]>(<ConsumableRecipePrototype><unknown>recipe).levels).filter(x => x.id === levelRange.id)[0].hprRange
    : (isArmour(craftType))
      ? (<ArmourLevelRanges[]>(<ArmourRecipePrototype><unknown>recipe).levels).filter(x => x.id === levelRange.id)[0].hpRange
      : NumberRange.of(0, 0);
}

export function encodeRecipe(recipe: Recipe): string {
  let ingredients = recipe.ingredients.reduce((accumulator, value) => {
    if (value.ingredient === undefined || value.ingredient === null) {
      return accumulator + "00";
    }
    return accumulator + value.ingredient.id;
  }, "");
  let prototypeIndex = getRecipePrototypeFor(recipe.craftType).findIndex(x => x.name === recipe.prototype.name);
  let attackSpeed = recipe.attackSpeed === CraftedAttackSpeed.SLOW ? "1" : recipe.attackSpeed === CraftedAttackSpeed.FAST ? "3" : "2"; 
  let lvlIndex = recipe.prototype.levels.findIndex(x => x.id === recipe.level.id);
  let encoded = "CR-" + Object.values(ItemType).indexOf(recipe.craftType) + "-" + ingredients + "-" + attackSpeed + "-" + prototypeIndex + "-" + lvlIndex + "-" + recipe.material1Tier.toString() + recipe.material2Tier.toString();
  return encoded;
}

export function isValidHash(encoded: string): boolean {
  let splited = encoded.split("-")
  return encoded.startsWith("CR") && splited.length === 7 // Encoded recipe must have 6 sections
    && !isNaN(parseInt(splited[1])) && parseInt(splited[1]) >= 0 && parseInt(splited[1]) <= 14 // ItemType
    && splited[2].length === 12 // Six ingredients, each ingredient ID has 2 characters
    && !isNaN(parseInt(splited[3])) && parseInt(splited[3]) >= 1 && parseInt(splited[3]) <= 3 // Attack speed: Fast (1), Normal (2), Slow (3)
    && !isNaN(parseInt(splited[4])) && parseInt(splited[4]) >= 0 || parseInt(splited[4]) <= 11 // Prototype index
    && !isNaN(parseInt(splited[5])) && parseInt(splited[5]) >= 0 || parseInt(splited[5]) <= 3 //  Level index
    && !isNaN(parseInt(splited[6])) && splited[6].length === 2 && parseInt(splited[6].charAt(0)) >= 1 &&
        parseInt(splited[6].charAt(0)) <= 3 && parseInt(splited[6].charAt(1)) >= 1 && parseInt(splited[6].charAt(1)) <= 3; // Material tiers

}

export function decodeRecipe(encoded: string, ingredients: Ingredient[]): Recipe {
  let splited = encoded.split("-");
  let itemTypeIndex = isNaN(parseInt(splited[1])) || parseInt(splited[1]) < 0 || parseInt(splited[1]) > 14 ? 0 : parseInt(splited[1])
  let itemType = Object.values(ItemType).at(itemTypeIndex)
  let ingredientsStr = splited[2];
  let attackSpeed = splited[3] === "1" ? CraftedAttackSpeed.SLOW : splited[3] == "3" ? CraftedAttackSpeed.FAST : CraftedAttackSpeed.NORMAL
  let parsedProtypeIndex = parseInt(splited[4]);
  let prototypeIndex = isNaN(parsedProtypeIndex) || parsedProtypeIndex < 0 || parsedProtypeIndex > 11 ? 0 : parsedProtypeIndex;
  let parsedLvlIndex = parseInt(splited[5]);
  let mat1Tier = splited[6].charAt(0);
  let mat2Tier = splited[6].charAt(1);
  let prototype = getRecipePrototypeFor(itemType as ItemType)[prototypeIndex];
  let lvlIndex = isNaN(parsedLvlIndex) || parsedLvlIndex < 0 || parsedLvlIndex > 3 || parsedLvlIndex > prototype.levels.length - 1 ? 0 : parsedLvlIndex;
  let recipe: Recipe = {
    hash: encoded,
    ingredients: [],
    attackSpeed: attackSpeed,
    craftType: itemType!,
    effectivenessMatrix: [[]],
    prototype: prototype,
    material1Tier: mat1Tier === "2" ? MaterialTier.TIER_2 : mat1Tier === "3" ? MaterialTier.TIER_3 : MaterialTier.TIER_1,
    material2Tier: mat2Tier === "2" ? MaterialTier.TIER_2 : mat2Tier === "3" ? MaterialTier.TIER_3 : MaterialTier.TIER_1,
    level: prototype.levels[lvlIndex]
  }
  let positions = [
    { id: ingredientsStr.substring(0, 2), x: 0, y: 0, effectiveness: 100, ingredient: <Ingredient | undefined>undefined },
    { id: ingredientsStr.substring(2, 4), x: 1, y: 0, effectiveness: 100, ingredient: <Ingredient | undefined>undefined },
    { id: ingredientsStr.substring(4, 6), x: 0, y: 1, effectiveness: 100, ingredient: <Ingredient | undefined>undefined },
    { id: ingredientsStr.substring(6, 8), x: 1, y: 1, effectiveness: 100,ingredient: <Ingredient | undefined>undefined },
    { id: ingredientsStr.substring(8, 10), x: 0, y: 2, ieffectiveness: 100 , ingredient: <Ingredient | undefined>undefined },
    { id: ingredientsStr.substring(10, 12), x: 1, y: 2, effectiveness: 100, ingredient: <Ingredient | undefined>undefined },
  ]
  positions.forEach(pos => {
    ingredients.filter(ing => {
      if (pos.id === "00") {
        return undefined;
      }
      return ing.id === pos.id
    }).forEach(ing => pos.ingredient = ing);
    recipe.ingredients.push({
      ingredient: pos.ingredient,
      effectiveness: pos.effectiveness!,
      x: pos.x,
      y: pos.y
    })
  });
  let effectivenessMatrix = getEffectivenessMatrix(recipe.ingredients)
    recipe.ingredients[0].effectiveness = effectivenessMatrix[0][0];
    recipe.ingredients[1].effectiveness = effectivenessMatrix[0][1];
    recipe.ingredients[2].effectiveness = effectivenessMatrix[1][0];
    recipe.ingredients[3].effectiveness = effectivenessMatrix[1][1];
    recipe.ingredients[4].effectiveness = effectivenessMatrix[2][0];
    recipe.ingredients[5].effectiveness = effectivenessMatrix[2][1];
  recipe.effectivenessMatrix = getEffectivenessMatrix(recipe.ingredients);

  return recipe;

}