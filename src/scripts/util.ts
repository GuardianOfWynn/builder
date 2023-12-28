import Ingredient from '../model/ingredient'

export const crafter_url = ''

export enum CraftedAttackSpeed {
    SLOW = "slow",
    NORMAL = "normal",
    FAST = "fast",
}

export enum ItemType {
    BOW = "bow",
    SPEAR = "spear",
    DAGGER = "dagger",
    RELIK = "relik",
    WAND = "wand",
    HELMET = "helmet",
    CHESTPLATE = "chestplate",
    LEGGINGS = "leggings",
    BOOTS = "boots",
    RING = "ring",
    NECKLACE = "necklace",
    BRACELET = "bracelet",
    SCROLL = "scroll",
    POTION = "potion",
    FOOD = "food"
}

export enum ItemTier {
    MYTHIC = "mythic",
    FABLED = "fabled",
    LEGENDARY = "legendary",
    SET = "set",
    RARE = "rare",
    UNIQUE = "unique",
    NORMAL = "normal",
}

export enum ArmorType {
    HELMET = "helmet",
    CHESTPLATE = "chestplate",
    LEGGINGS = "leggings",
    BOOTS = "boots"
}

export enum AttackSpeed {
    SUPER_SLOW = "super_slow",
    VERY_SLOW = "very_slow",
    SLOW = "slow",
    NORMAL = "normal",
    FAST = "fast",
    VERY_FAST = "very_fast",
    SUPER_FAST = "super_fast"
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

export enum Element {
    FIRE = "Fire",
    AIR = "Air",
    THUNDER = "Thunder",
    WATER = "Water",
    EARTH = "Earth"
}

export function getWynnClass(itemType: ItemType): WynnClass | undefined {
    switch(itemType) {
        case ItemType.BOW : return WynnClass.ARCHER;
        case ItemType.RELIK : return WynnClass.SHAMAN;
        case ItemType.WAND : return WynnClass.MAGE;
        case ItemType.SPEAR : return WynnClass.WARRIOR;
        case ItemType.DAGGER : return WynnClass.ASSASSIN;
        default: return undefined;
    }
}

export function format(value: number, id: String): string {
    if (id === "POISON") {
        return value + "/3s"
      }

      switch (id) {
        case "POISON": case "MANASTEAL": case "LIFESTEAL": return value + "/3s";
        case "MANAREGEN": return value + "/5s";
        case "ATTACKSPEED": return value + " tier";
        default:
      }

      if (!id.includes("RAW") && !id.includes("POINTS") && !id.includes("HEALTHBONUS") && !id.includes("JUMP")) {
        return value + "%";
      }
      return value.toString();
}

export function getPowderElement(ingredient: Ingredient): Element | undefined {
    if(!ingredient.isPowder) {
        return undefined
    }
    switch(ingredient.name.split(" ")[0]) {
        case "Water": Element.WATER;
        case "Fire": Element.FIRE;
        case "Earth": Element.EARTH;
        case "Air": Element.AIR;
        case "Thunder": Element.THUNDER;
    }
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

export function multiplyRange(range: NumberRange, value: number): NumberRange {
    return new NumberRange(range.minimum*value, range.maximum*value);
}

export function isEmpty(range: NumberRange): boolean {
    return range.minimum === 0 && range.maximum === 0;
}