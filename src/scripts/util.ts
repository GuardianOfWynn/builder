export const crafter_url = ''

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

export enum Profession {
    WEAPONSMITHING = "Weaponsmithing",
    WOODWORKING = "Woodworking",
    SCRIBING = "Scribing",
    ALCHEMISM = "Alchemism",
    COOKING = "Cooking",
    ARMOURING = "Armouring",
    TAILORING = "Tailoring",
    JEWELING = "Jeweling"
}

export function getProfessionForItemType(itemType: ItemType) {
    switch(itemType) {
        case ItemType.BOOTS: case ItemType.LEGGINGS: return Profession.TAILORING;
        case ItemType.CHESTPLATE: case ItemType.HELMET: return Profession.ARMOURING;
        case ItemType.NECKLACE: case ItemType.RING: case ItemType.BRACELET: return Profession.JEWELING;
        case ItemType.RELIK: case ItemType.BOW: case ItemType.WAND: return Profession.WOODWORKING;
        case ItemType.SPEAR: case ItemType.DAGGER: return Profession.WEAPONSMITHING;
        case ItemType.SCROLL: return Profession.SCRIBING;
        case ItemType.FOOD: return Profession.COOKING;
        case ItemType.POTION: return Profession.ALCHEMISM;
    }
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
}

export class Pair<T, U> {
    first: T;
    second: U;
}

export function isBetween(range1: NumberRange, range: NumberRange): boolean {
    return range1.minimum >= range.minimum && range1.maximum <= range.maximum;
}

export function isGreaterThan(range1: NumberRange, range: NumberRange): boolean {
    return range1.minimum >= range.minimum && range1.maximum > range.maximum;
}

export function sum(range: NumberRange, value: number): NumberRange {
    return new NumberRange(range.minimum + value, range.maximum + value);
}

export function isEmpty(range: NumberRange): boolean {
    return range.maximum === 0 && range.maximum === 0;
}