export enum CraftedAttackSpeed {
    SLOW = 1,
    NORMAL,
    FAST,
}

export enum ItemType {
    BOW = "Bow",
    SPEAR = "Spear",
    DAGGER = "Dagger",
    RELIK = "Relik",
    WAND = "Wand",
    HELMET = "Helmet",
    CHESTPLATE = "Chestplate",
    LEGGINGS = "Leggings",
    BOOTS = "Boots",
    RING = "Ring",
    NECKLACE = "Necklace",
    BRACELET = "Bracelet",
    SCROLL = "Scroll",
    POTION = "Potion",
    FOOD = "Food"
}

export enum ItemTier {
    MYTHIC = "Mythic",
    FABLED = "Fabled",
    LEGENDARY = "Legendary",
    SET = "Set",
    RARE = "Rare",
    UNIQUE = "Unique",
    NORMAL = "Normal",
}

export enum ArmorType {
    HELMET = "Helmet",
    CHESTPLATE = "Chestplate",
    LEGGINGS = "Leggings",
    BOOTS = "Boots"
}

export enum AttackSpeed {
    SUPER_SLOW = "Super Slow",
    VERY_SLOW = "Very Slow",
    SLOW = "Slow",
    NORMAL = "Normal",
    FAST = "Fast",
    VERY_FAST = "Very Fast",
    SUPER_FAST = "Super Fast"
}

export enum WynnClass {
    SHAMAN = "Shaman/Skyseer",
    ASSASSIN = "Assassin/Ninja",
    MAGE = "Mage/Dark Wizard",
    ARCHER = "Archer/Hunter",
    WARRIOR = "Warrior/Knight"
}

export enum MaterialTier {
    TIER_3 = 3,
    TIER_2 = 2,
    TIER_1 = 1
}

export class NumberRange {
    minimum: number;
    maximum: number;

    constructor(from: number, to: number) {
        this.minimum = from;
        this.maximum = to;
    }

    static of(from: number, to: number): NumberRange {
        return new NumberRange(from, to);
    }

    public equals(range: NumberRange): boolean {
        return range.minimum === this.minimum && range.maximum === this.maximum;
    }

    public isGreaterThan(range: NumberRange): boolean {
        return this.minimum >= range.minimum && this.maximum > range.maximum;
    }

}

export function isBetween(range1: NumberRange, range: NumberRange): boolean {
    return range1.minimum >= range.minimum && range1.maximum <= range.maximum;
}

export function isGreaterThan(range1: NumberRange, range: NumberRange): boolean {
    return range1.minimum >= range.minimum && range1.maximum > range.maximum;
}

export function sumWithMax(range: NumberRange, value: number, max: number): NumberRange {
    return new NumberRange(Math.max(max, range.minimum + value), Math.max(max, range.maximum + value));
}

export function isEmpty(range: NumberRange): boolean {
    return range.maximum === 0 && range.maximum === 0;
}