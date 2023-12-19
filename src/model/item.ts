import { ArmorType, AttackSpeed, ItemTier, ItemType, NumberRange, WynnClass } from "../scripts/util";
import { Identification } from "./ingredient";

export class WynnItem {

    name: string;
    tier: ItemTier;
    health: NumberRange;
    set: string | null;
    powderSlots: number;
    type: ItemType;
    attackSpeed: AttackSpeed;
    armorType: ArmorType;
    clazz: WynnClass | null;
    isCrafted: boolean;
    isQuestItem: boolean;
    isUntradable: boolean;
    identifications: Identification[];
    craftedStatus: {
        durability: NumberRange;
        duration: NumberRange;
        charges: number;
    };
    requirements: {
        level: number;
        dexterity: number;
        defence: number;
        strength: number;
        agility: number;
        intelligence: number;
    };
    damages: {
        neutral: NumberRange;
        fire: NumberRange;
        water: NumberRange;
        thunder: NumberRange;
        air: NumberRange;
        earth: NumberRange;
    };
    defenses: {
        fire: NumberRange;
        water: NumberRange;
        thunder: NumberRange;
        air: NumberRange;
        earth: NumberRange;
    };




}