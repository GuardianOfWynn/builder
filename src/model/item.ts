import { DamageBounds } from "../scripts/math";
import { ArmorType, AttackSpeed, ItemTier, ItemType, NumberRange, WynnClass } from "../scripts/util";
import { Identification } from "./ingredient";

export const ITEMS: WynnItem[] = await (await fetch("/builder/items.json")).json();

export class WynnBaseItem {
    name: string;
    powderSlots: number;
    type: ItemType;
    attackSpeed?: AttackSpeed;
    isCrafted: boolean;
    identifications: Identification[];
    requirements: {
        quest: string;
        dexterity: number;
        defence: number;
        strength: number;
        agility: number;
        intelligence: number;
    };
}

export class WynnCraftedItem extends WynnBaseItem {
    health: NumberRange;
    level: NumberRange;
    craftedStatus: {
        durability: NumberRange;
        duration: NumberRange;
        charges: number;
    };
    damages: {
        neutral: DamageBounds;
        fire: DamageBounds;
        water: DamageBounds;
        thunder: DamageBounds;
        air: DamageBounds;
        earth: DamageBounds;
    };
    defenses: {
        fire: NumberRange;
        water: NumberRange;
        thunder: NumberRange;
        air: NumberRange;
        earth: NumberRange;
    };
}

export class WynnItem extends WynnBaseItem{
    id: string;
    health: Number;
    tier: ItemTier;
    set: string | null;
    armorType: ArmorType;
    isQuestItem: boolean;
    isUntradable: boolean;
    lore: string;
    level: number;
    damages: {
        average: number;
        neutral: NumberRange;
        fire: NumberRange;
        water: NumberRange;
        thunder: NumberRange;
        air: NumberRange;
        earth: NumberRange;
    };
    defenses: {
        fire: number;
        water: number;
        thunder: number;
        air: number;
        earth: number;
    };
    majorId?: {
        name: string;
        description: string;
    }
}