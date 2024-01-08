import { AbilityTree } from "./abilitytree";
import { FixedIdentification, Identification } from "./identification";
import { WynnBaseItem, WynnItem } from "./item";
import { DamageModifier, Skill } from "./skill";

export class SkillPoints {
    agility: number;
    dexterity: number;
    intelligence: number;
    defence: number;
    strength: number;
}

export class Build {
    weapon: WynnBaseItem | null;
    helmet: WynnBaseItem | null;
    chestplate: WynnBaseItem | null;
    leggings: WynnBaseItem | null;
    boots: WynnBaseItem | null;
    ring1: WynnBaseItem | null;
    ring2: WynnBaseItem | null;
    bracelet: WynnBaseItem | null;
    necklace: WynnBaseItem | null;
    abilityTree: AbilityTree | undefined;

    constructor(abilityTree: AbilityTree | undefined, weapon: WynnBaseItem | null, helmet: WynnBaseItem | null, chestplatE: WynnBaseItem | null, leggings: WynnBaseItem | null, boots: WynnBaseItem | null, ring1: WynnBaseItem | null, ring2: WynnBaseItem | null, bracelet: WynnBaseItem | null, necklace: WynnBaseItem | null) {
        this.weapon = weapon;
        this.helmet = helmet;
        this.chestplate = chestplatE;
        this.leggings = leggings;
        this.boots = boots;
        this.ring1 = ring1;
        this.ring2 = ring2;
        this.bracelet = bracelet;
        this.necklace = necklace;
        this.abilityTree = abilityTree;
    }

    getBuildStats(): BuildStats {
        let stats: BuildStats = {
            stats: []
        };

        stats = mergeItemIdentifications(this.weapon, stats);
        stats = mergeItemIdentifications(this.helmet, stats);
        stats = mergeItemIdentifications(this.chestplate, stats);
        stats = mergeItemIdentifications(this.leggings, stats);
        stats = mergeItemIdentifications(this.boots, stats);
        stats = mergeItemIdentifications(this.ring1, stats);
        stats = mergeItemIdentifications(this.ring2, stats);
        stats = mergeItemIdentifications(this.bracelet, stats);
        stats = mergeItemIdentifications(this.necklace, stats);

        return stats;

    }
}

export class BuildStats {
    stats: FixedIdentification[];
}

function mergeItemIdentifications(item: WynnBaseItem | null, stats: BuildStats): BuildStats {
    if (item === null) {
        return stats;
    }
    item.identifications.forEach(id => {
        let previous: FixedIdentification = {
            identification: Identification.identifications.get(id.id)!,
            value: 0
        };
        if (stats.stats.some(x => x.identification.getId() == id.id)) {
            let index = stats.stats.findIndex(x => x.identification.getId() === id.id)
            previous = stats.stats[index];
            previous.value = previous.value + id.maximum;
            stats.stats[index] = previous;
        }
        stats.stats.push(previous);
    })
    return stats;
}

function mergeItemSkillPoints(item: WynnBaseItem, skillPoints: SkillPoints) {
    if (skillPoints.agility < item.requirements.agility) {
        let missing = item.requirements.agility - skillPoints.agility;
        skillPoints.agility += missing;
    }
    if (skillPoints.dexterity < item.requirements.dexterity) {
        let missing = item.requirements.dexterity - skillPoints.dexterity;
        skillPoints.dexterity += missing;
    }
    if (skillPoints.defence < item.requirements.defence) {
        let missing = item.requirements.defence - skillPoints.defence;
        skillPoints.defence += missing;
    }
    if (skillPoints.intelligence < item.requirements.intelligence) {
        let missing = item.requirements.intelligence - skillPoints.intelligence;
        skillPoints.intelligence += missing;
    }
    if (skillPoints.strength < item.requirements.strength) {
        let missing = item.requirements.strength - skillPoints.strength;
        skillPoints.strength += missing;
    }
}