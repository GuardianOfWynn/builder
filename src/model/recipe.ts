import { ItemType, NumberRange } from "../scripts/util";

export const SPEAR_RECIPES: WeaponRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/spear.json")).json();
export const BOW_RECIPES: WeaponRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/bow.json")).json();
export const RELIK_RECIPES: WeaponRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/relik.json")).json();
export const WAND_RECIPES: WeaponRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/wand.json")).json();
export const DAGGER_RECIPES: WeaponRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/dagger.json")).json();
export const HELMET_RECIPES: ArmourRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/helmet.json")).json();
export const CHESTPLATE_RECIPES: ArmourRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/chestplate.json")).json();
export const LEGGINGS_RECIPES: ArmourRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/leggings.json")).json();
export const BOOTS_RECIPES: ArmourRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/boots.json")).json();
export const RING_RECIPES: ArmourRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/ring.json")).json();
export const BRACELET_RECIPES: ArmourRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/bracelet.json")).json();
export const NECKLACE_RECIPES: ArmourRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/necklace.json")).json();
export const POTION_RECIPES: ConsumableRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/potion.json")).json();
export const FOOD_RECIPES: ConsumableRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/food.json")).json();
export const SCROLL_RECIPES: ConsumableRecipePrototype[] = await (await fetch("/builder/recipe_prototypes/scroll.json")).json();

export function getRecipePrototypeFor(type: ItemType): RecipePrototype[] {
    switch(type) {
        case ItemType.SPEAR: return SPEAR_RECIPES;
        case ItemType.DAGGER: return DAGGER_RECIPES;
        case ItemType.BOW: return BOW_RECIPES;
        case ItemType.RELIK: return RELIK_RECIPES;
        case ItemType.WAND: return WAND_RECIPES;
        case ItemType.HELMET: return HELMET_RECIPES;
        case ItemType.CHESTPLATE: return CHESTPLATE_RECIPES;
        case ItemType.LEGGINGS: return LEGGINGS_RECIPES;
        case ItemType.BOOTS: return BOOTS_RECIPES;
        case ItemType.RING: return RING_RECIPES;
        case ItemType.BRACELET: return BRACELET_RECIPES;
        case ItemType.NECKLACE: return NECKLACE_RECIPES;
        case ItemType.FOOD: return FOOD_RECIPES;
        case ItemType.POTION: return POTION_RECIPES;
        case ItemType.SCROLL: return SCROLL_RECIPES;
        default: return SCROLL_RECIPES;
    }
}

export class RecipePrototype {
    name: string;
    material1: string;
    material2: string;
    material1Amount: string;
    material2Amount: string;
    levels: LevelRanges[];

    constructor(name: string, material1: string, material2: string) {
        this.name = name;
        this.material1 = material1;
        this.material2 = material2;
    }
}

export class ArmourRecipePrototype extends RecipePrototype {
    levelRange: ArmourLevelRanges;

    constructor(name: string, material1: string, material2: string, range: ArmourLevelRanges) {
        super(name, material1, material2);
        this.levelRange = range;
    }
}

export class WeaponRecipePrototype extends RecipePrototype {
    levelRange: WeaponLevelRanges;

    constructor(name: string, material1: string, material2: string, range: WeaponLevelRanges) {
        super(name, material1, material2);
        this.levelRange = range;
    }
}

export class ConsumableRecipePrototype extends RecipePrototype {
    levelRange: ConsumableLevelRanges;

    constructor(name: string, material1: string, material2: string, range: ConsumableLevelRanges) {
        super(name, material1, material2);
        this.levelRange = range;
    }
} 

export class LevelRanges {
    id: string;
    levelRange: NumberRange;
}

export class WeaponLevelRanges extends LevelRanges {
    damageRange: NumberRange;
    durabilityRange: NumberRange;
} 

export class ArmourLevelRanges extends LevelRanges {
    hpRange: NumberRange;
    durabilityRange: NumberRange;
}

export class ConsumableLevelRanges extends LevelRanges {
    hpRange: NumberRange;
    durationRange: NumberRange;
}