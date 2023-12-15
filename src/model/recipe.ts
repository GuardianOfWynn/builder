import { NumberRange } from "../scripts/util";

export class CraftType {
    ratio1: number;
    ratio2: number;
    recipes: Recipe[];
}

export class RecipePrototype {
    name: string;
    multiplier: number;
    powderSlots: number;
    material1: string;
    material2: string;
    charges: number;

    constructor(name: string, material1: string, material2: string, multiplier: number, powderSlots: number, charges: number) {
        this.name = name;
        this.material1 = material1;
        this.material2 = material2;
        this.multiplier = multiplier;
        this.powderSlots = powderSlots;
        this.charges = charges;
    }
}

export class ArmourRecipe extends RecipePrototype {
    levelRange: ArmourLevelRanges;

    constructor(name: string, material1: string, material2: string, multiplier: number, powderSlots: number, charges: number, range: ArmourLevelRanges) {
        super(name, material1, material2, multiplier, powderSlots, charges);
        this.levelRange = range;
    }
}

export class ConsumableRecipe extends RecipePrototype {
    levelRange: ConsumableLevelRanges;

    constructor(name: string, material1: string, material2: string, multiplier: number, powderSlots: number, charges: number, range: ConsumableLevelRanges) {
        super(name, material1, material2, multiplier, powderSlots, charges);
        this.levelRange = range;
    }
} 

export class WeaponPrototype extends RecipeRecipePrototype {
    possibleBaseSlowDamageBounds: NumberRange[][];
    possibleBaseNormalDamageBounds: NumberRange[][];
    possibleBaseFastDamageBounds: NumberRange[][];
    possibleBaseDurabilityBounds: NumberRange[];
} 

export class LevelRanges {
    id: string;
    levelRange: NumberRange;
}

export class ArmourLevelRanges extends LevelRanges {
    baseHpRange: NumberRange;
    baseDurabilityRange: NumberRange;
}

export class ConsumableLevelRanges extends LevelRanges {
    baseHpRange: NumberRange;
    baseDurabilityRange: NumberRange;
}

export const emptyRange = () => new NumberRange(0,0);