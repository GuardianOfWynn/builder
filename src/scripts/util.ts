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

export enum AttackSpped {
    SUPER_SLOW = "Super Slow",
    VERY_SLOW = "Very Slow",
    SLOW = "Slow",
    NORMAL = "Normal",
    FAST = "Fast",
    VERY_FAST = "Very Fast",
    SUPER_FAST = "Super Fast"
}

export enum WynnClass {
    SHAMAN = "Shaman",
    ASSASSIN = "Assassin",
    MAGE = "Mage",
    ARCHER = "Archer",
    WARRIOR = "Warrior"
}

export class NumberRange {
    from: number;
    to: number;

    constructor(from: number, to: number) {
        this.from = from;
        this.to = to;
    }

    public static of(from: number, to: number) {
        return new NumberRange(from, to);
    }

    public equals(range: NumberRange) {
        return range.from === this.from && range.to === this.to;
    }

    public isGreaterThan(range: NumberRange) {
        return this.from >= range.from && this.to > range.to;
    }

    public isBetween(range: NumberRange) {
        return this.from >= range.from && this.to <= range.to;
    }
}