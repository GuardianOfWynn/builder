
import { AbilityNode } from "./ability";
import { FixedIdentification } from "./identification";
import { WynnItem } from "./item";
import { DamageModifier, Skill } from "./skill";

export class Build {
    weapon: WynnItem;
    helmet: WynnItem;
    chestplate: WynnItem;
    leggings: WynnItem;
    boots: WynnItem;
    ring1: WynnItem;
    ring2: WynnItem;
    bracelet: WynnItem;
    necklace: WynnItem;
    abilityTree: AbilityNode[];
    stats: BuildStats;
    skills: Skill[];
    baseDamageModifiers: DamageModifier;
}

export class BuildStats {
    stats: FixedIdentification[];
}