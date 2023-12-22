import Ingredient, { Identification } from "../model/ingredient";
import { ArmourLevelRanges, ArmourRecipePrototype, ConsumableLevelRanges, ConsumableRecipePrototype, LevelRanges, Recipe, RecipePrototype, WeaponLevelRanges, WeaponRecipePrototype, getRecipePrototypeFor } from "../model/recipe";
import { ItemType, CraftedAttackSpeed, NumberRange, isBetween, sumWithMax, WynnClass, MaterialTier, AttackSpeed } from "./util";
import { WynnItem } from "../model/item";
import { Ref } from "vue";
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

export interface IngredientSlot {
  ingredient: Ingredient | undefined,
  x: number,
  y: number
}


export function assembleCraft(recipe: Recipe): WynnItem {
  let effectivenessMatrix = getEffectivenessMatrix(recipe.ingredients);

  let item = new WynnItem();

  let materialMultiplier = calculateMaterialMultiplier(recipe.prototype.material1Amount, recipe.prototype.material2Amount, recipe.material1Tier, recipe.material2Tier);
  item.isCrafted = true;
  let baseCharges = getBaseCharges(recipe.craftType, recipe.prototype);
  let baseDurability = getBaseDurationOrDurability(recipe.craftType, recipe.prototype, recipe.level, recipe.ingredients.every(x => x.ingredient === undefined));
  item.craftedStatus = {
    durability: isConsumable(recipe.craftType) ? new NumberRange(0, 0) : new NumberRange(baseDurability.minimum * materialMultiplier, baseDurability.maximum * materialMultiplier),
    duration: !isConsumable(recipe.craftType) ? new NumberRange(0, 0) : new NumberRange(baseDurability.minimum * materialMultiplier, baseDurability.maximum * materialMultiplier),
    charges: baseCharges
  }

  let baseHealth = getBaseHealth(recipe.craftType, recipe.prototype, recipe.level, recipe.ingredients.every(x => x.ingredient === undefined))
  console.log(baseHealth);
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

    if (slot.ingredient === undefined) {
      return;
    }

    let effectivenessMultiplier = effectivenessMatrix[slot.y][slot.x] / 100;
    let ingredient = slot.ingredient;

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
      item.craftedStatus.charges = Math.max(1, item.craftedStatus.charges + ingredient.modifiers.charges);
      item.craftedStatus.duration = sumWithMax(item.craftedStatus.duration, ingredient.modifiers.duration, 10);
    } else {
      item.craftedStatus.durability = sumWithMax(item.craftedStatus.durability, ingredient.modifiers.durability, 1);
    }

    // Implement powders on weapons and armours

    // Identifications calc
    ingredient.identifications.forEach(identification => {
      let index = identifications.findIndex(x => x.id === identification.id);
      if (index === -1) {
        identifications.push({
          id: identification.id,
          name: identification.name,
          maximum: identification.maximum * effectivenessMultiplier,
          minimum: identification.minimum * effectivenessMultiplier
        })
      } else {
        identifications[index].maximum += identification.maximum * effectivenessMultiplier;
        identifications[index].minimum += identification.minimum * effectivenessMultiplier;
      }
    });
  })

  item.identifications = identifications;

  return item;

}

export function getEffectivenessMatrix(ingredients: IngredientSlot[]): number[][] {
  let effectiveness = [[100, 100], [100, 100], [100, 100]];
  ingredients.forEach(ingredient => {

    if (ingredient.ingredient === undefined) {
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
    if (value.ingredient === undefined) {
      return "00";
    }
    return accumulator + value.ingredient.id;
  }, "");
  let prototypeIndex = getRecipePrototypeFor(recipe.craftType).indexOf(recipe.prototype);
  let attackSpeed = recipe.attackSpeed === CraftedAttackSpeed.SLOW ? "1" : recipe.attackSpeed === CraftedAttackSpeed.FAST ? "3" : "2"; 
  let lvlIndex = recipe.prototype.levels.indexOf(recipe.level);
  let encoded = recipe.craftType + "-" + ingredients + "-" + attackSpeed + "-" + prototypeIndex + "-" + lvlIndex + "-" + recipe.material1Tier.toString() + recipe.material2Tier.toString();
  return encoded;
}

export function isValidHash(encoded: string): boolean {
  let splited = encoded.split("-")
  return splited.length === 6 // Encoded recipe must have 6 sections
    && Object.values(ItemType).includes(splited[0].toLowerCase().charAt(0).toUpperCase() + splited[0].toLowerCase().slice(1) as ItemType) // ItemType
    && splited[1].length === 12 // Six ingredients, each ingredient ID has 2 characters
    && !isNaN(parseInt(splited[2])) && parseInt(splited[2]) >= 1 && parseInt(splited[2]) <= 3 // Attack speed: Fast (1), Normal (2), Slow (3)
    && !isNaN(parseInt(splited[3])) && parseInt(splited[3]) >= 0 || parseInt(splited[3]) <= 11 // Prototype index
    && !isNaN(parseInt(splited[4])) && parseInt(splited[4]) >= 0 || parseInt(splited[4]) <= 3 //  Level index
    && !isNaN(parseInt(splited[5])) && splited[5].length === 2 && parseInt(splited[5].charAt(0)) >= 1 &&
        parseInt(splited[5].charAt(0)) <= 3 && parseInt(splited[5].charAt(1)) >= 1 && parseInt(splited[5].charAt(1)) <= 3; // Material tiers

}

export function decodeRecipe(encoded: string, ingredients: Ingredient[]): Recipe {
  let splited = encoded.split("-");
  let urlItemType = splited[0].toLowerCase().charAt(0).toUpperCase() + splited[0].toLowerCase().slice(1);
  let itemType = Object.values(ItemType).includes(urlItemType as ItemType) ? urlItemType as ItemType : ItemType.SCROLL
  let ingredientsStr = splited[1];
  let attackSpeed = splited[2] === "1" ? CraftedAttackSpeed.SLOW : splited[2] == "3" ? CraftedAttackSpeed.FAST : CraftedAttackSpeed.NORMAL
  let parsedProtypeIndex = parseInt(splited[3]);
  let prototypeIndex = isNaN(parsedProtypeIndex) || parsedProtypeIndex < 0 || parsedProtypeIndex > 11 ? 0 : parsedProtypeIndex;
  let parsedLvlIndex = parseInt(splited[4]);
  let mat1Tier = splited[5].charAt(0);
  let mat2Tier = splited[5].charAt(1);
  let prototype = getRecipePrototypeFor(itemType as ItemType)[prototypeIndex];
  let lvlIndex = isNaN(parsedLvlIndex) || parsedLvlIndex < 0 || parsedLvlIndex > 3 || parsedLvlIndex > prototype.levels.length - 1 ? 0 : parsedLvlIndex;
  let recipe: Recipe = {
    ingredients: [],
    attackSpeed: attackSpeed,
    craftType: itemType,
    effectivenessMatrix: [[]],
    prototype: prototype,
    material1Tier: mat1Tier === "2" ? MaterialTier.TIER_2 : mat1Tier === "3" ? MaterialTier.TIER_3 : MaterialTier.TIER_1,
    material2Tier: mat2Tier === "2" ? MaterialTier.TIER_2 : mat2Tier === "3" ? MaterialTier.TIER_3 : MaterialTier.TIER_1,
    level: prototype.levels[lvlIndex]
  }
  let positions = [
    { id: ingredientsStr.substring(0, 2), x: 0, y: 0, ingredient: <Ingredient | undefined>undefined },
    { id: ingredientsStr.substring(2, 4), x: 1, y: 0, ingredient: <Ingredient | undefined>undefined },
    { id: ingredientsStr.substring(4, 6), x: 0, y: 1, ingredient: <Ingredient | undefined>undefined },
    { id: ingredientsStr.substring(6, 8), x: 1, y: 1, ingredient: <Ingredient | undefined>undefined },
    { id: ingredientsStr.substring(8, 10), x: 0, y: 2, ingredient: <Ingredient | undefined>undefined },
    { id: ingredientsStr.substring(10, 12), x: 1, y: 2, ingredient: <Ingredient | undefined>undefined },
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
      x: pos.x,
      y: pos.y
    })
  });
  recipe.effectivenessMatrix = getEffectivenessMatrix(recipe.ingredients);

  return recipe;

}