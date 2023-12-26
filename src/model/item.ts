import { DamageBounds } from "../scripts/math";
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
        level: NumberRange;
        dexterity: number;
        defence: number;
        strength: number;
        agility: number;
        intelligence: number;
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