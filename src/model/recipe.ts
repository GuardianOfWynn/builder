export class CraftType {
    ratio1: number;
    ratio2: number;
    recipes: Recipe[];
}

export class Recipe {
    name: string;
    multiplier: number;
    powderSlots: number;
    material1: string;
    material2: string;
    charges: number;
    possibleBounds: NumberRange[];
}

export class ArmourRecipe extends Recipe {
    possibleBaseHPBounds: NumberRange[];
    possibleBaseDurabilityBounds: NumberRange[];
}

export class ConsumableRecipe extends Recipe {
    possibleBaseHPRBounds: NumberRange[];
    possibleBaseDurationBounds: NumberRange[];
} 

export class WeaponRecipe extends Recipe {
    possibleBaseSlowDamageBounds: NumberRange[][];
    possibleBaseNormalDamageBounds: NumberRange[][];
    possibleBaseFastDamageBounds: NumberRange[][];
    possibleBaseDurabilityBounds: NumberRange[];
} 

export class NumberRange {
    from: number;
    to: number;

    constructor(from: number, to: number) {
        this.from = from;
        this.to = to;
    }
}

export const emptyRange = () => new NumberRange(0,0);