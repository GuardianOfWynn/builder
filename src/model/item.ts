import { ArmorType, AttackSpped, ItemTier, ItemType, NumberRange, WynnClass } from "../scripts/util";

export class WynnItem {

    name: string;
    tier: ItemTier;
    health: Number;
    set: string | null;
    powderSlots: number;
    type: ItemType;
    attackSpeed: AttackSpped;
    armorType: ArmorType;
    clazz: WynnClass | null;
    isCrafted: boolean;
    isQuestItem: boolean;
    isUntradable: boolean;
    craftedStatus: {
        durability: NumberRange;
        duration: NumberRange;
        charges: number;
    }
    requirements: {
        level: Number;
        dexterity: Number;
        defence: Number;
        strength: Number;
        agility: Number;
        intelligence: Number;
    }
    damages: {
        neutral: NumberRange;
        fire: NumberRange;
        water: NumberRange;
        thunder: NumberRange;
        air: NumberRange;
        earth: NumberRange;
    }
    defenses: {
        fire: NumberRange;
        water: NumberRange;
        thunder: NumberRange;
        air: NumberRange;
        earth: NumberRange;
    }




}