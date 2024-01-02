
import { AbilityNode } from "./ability";
import { FixedIdentification } from "./identification";
import { WynnItem } from "./item";

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
}

export class BuildStats {
    stats: FixedIdentification[];
}