import { NumberRange, WynnClass } from '../scripts/util'
import { AbilityTree } from './abilitytree';

export interface DamageModifier {
    earth?: number;
    earthRaw?: NumberRange;
    fire?: number;
    fireRaw?: NumberRange;
    thunder?: number;
    thunderRaw?: NumberRange;
    water?: number;
    waterRaw?: NumberRange;
    air?: number;
    airRaw?: NumberRange;
    neutral?: number;
    neutralRaw?: NumberRange;
    overall?: number;
    overallRaw?: NumberRange;
    mainAttack?: boolean;
}

export class AbilityDetail {
    parent?: string[];
    parentBoostedStats: string[];
    parentOverridedStats: string[];
    primary?: boolean;
    toggleable?: boolean;
    affectOtherPlayers?: boolean;
    manaCost?: number;
    hitsDealed?: number;
    cooldown?: number;
    damageBoost?: DamageModifier;
    dealedHits?: number;
    applyWhenToggled?: string;
    incrementalSkillId?: string;
    incrementalSkillMultiplier?: string;
    incremental?: {
        minimum: number;
        maximum: number;
        multipliedStats: string[];
    }
    boosts?: {
        resistance?: number;
        mobDamageReduction?: number;
        mobResistance?: number;
        overhealth?: number;
        enemySlowness?: number;
        identifications?: {
            id: string,
            amount: number
        }[]
    };
    identificationTransforming: {
        transformedIds: {
            id: string;
            amount: string;
        }[];
        targetId: string;
        targetAmount: number;
        targetCap: number;
    }[];
}

export class Skill {
    name: string;
    node: string;
    manaCost: string;
    damages: DamageModifier;
    hitsDealt: number;
}

export function parseSkills(tree: AbilityTree): Skill[] {

    let parentSkills: AbilityDetail[] = tree.baseTreeDetails.filter(x => x.primary);
    return [];
}