import { WynnClass } from '../scripts/util'

export interface DamageModifier {
            neutral: number;
            neutralRaw: number;
            earth: number;
            earthRaw: number;
            fire: number;
            fireRaw: number;
            thunder: number;
            thunderRaw: number;
            water: number;
            waterRaw: number;
}

export class Skill {
    clazz: WynnClass;
    abilityId: string;
    baseManaCost: number;
    name: string;
    changingNameSkills: {
        abilityId: string;
        newName: string;
    }[];
    manaCostAbilities: {
        ability: string,
        costIncrease: number;
    }[];
    damageModifierAbilities: {
        abilityId: string,
        damageModifier: DamageModifier
    }[];
}