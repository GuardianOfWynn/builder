import { AbilityTree } from "./abilitytree";
import { FixedIdentification, Identification } from "./identification";
import { WynnBaseItem, WynnCraftedItem, WynnItem, WynnSpecificItem } from "./item";
import { DamageModifier, Skill } from "./skill";

export class SkillPoints {
    agility: number;
    dexterity: number;
    intelligence: number;
    defence: number;
    strength: number;
}

export interface RawDefense {
    air: number, thunder: number, earth: number, fire: number, water: number
}

export interface RawDamage {
    air: number, thunder: number, earth: number, fire: number, water: number, neutral: number;
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

    private getFixedIdentifications(item: WynnBaseItem): FixedIdentification[] {
        if(item.isCrafted) return (item as WynnCraftedItem).identifications.map(x => new FixedIdentification(Identification.identifications.get(x.id)!, x.maximum))
        if(item.isSpecific) return (item as WynnSpecificItem).identifications;
        return (item as WynnItem).identifications.map(x => new FixedIdentification(Identification.identifications.get(x.id)!, x.maximum))

    }

    getBuildStats(): FixedIdentification[] {
        let stats: FixedIdentification[] = [];

        [this.weapon, this.helmet, this.chestplate, this.leggings, this.boots, this.ring1, this.ring2, this.bracelet, this.necklace]
            .forEach(x => {
                if (x === null) {
                    return;
                }
                let identifications: FixedIdentification[] = this.getFixedIdentifications(x)
                identifications.forEach(id => {
                    let idName = id.identification.getId().toLowerCase();
                    if(idName.includes("defence") || idName.includes("damage") ||
                        ["rawintelligence", "rawdefence", "rawagility", "rawstrength", "rawdexterity"].includes(idName)) {
                        return;
                    }
                    this.merge(id, stats);
                })
            });

        return stats;
    }

    getRawDefences(): RawDefense {
        let rawDefs: RawDefense = {
            air: 0,
            thunder: 0,
            earth: 0,
            fire: 0,
            water: 0
        };

        [this.weapon, this.helmet, this.chestplate, this.leggings, this.boots, this.ring1, this.ring2, this.bracelet, this.necklace]
            .forEach(x => {
                if(x !== null) {
                    if(x.isCrafted) {
                        let craftedItem = x as WynnCraftedItem;
                        rawDefs.air = rawDefs.air + craftedItem.defenses.air.maximum;
                        rawDefs.thunder = rawDefs.thunder + craftedItem.defenses.thunder.maximum;
                        rawDefs.earth = rawDefs.earth + craftedItem.defenses.earth.maximum;
                        rawDefs.fire = rawDefs.fire + craftedItem.defenses.fire.maximum;
                        rawDefs.water = rawDefs.water + craftedItem.defenses.water.maximum;
                    } else if(x.isSpecific) {
                        let specificItem = x as WynnSpecificItem;
                        rawDefs.air = rawDefs.air + specificItem.defenses.air;
                        rawDefs.thunder = rawDefs.thunder + specificItem.defenses.thunder;
                        rawDefs.earth = rawDefs.earth + specificItem.defenses.earth;
                        rawDefs.fire = rawDefs.fire + specificItem.defenses.fire;
                        rawDefs.water = rawDefs.water + specificItem.defenses.water;
                    } else {
                        let item = x as WynnItem;
                        rawDefs.air = rawDefs.air + item.defenses.air;
                        rawDefs.thunder = rawDefs.thunder + item.defenses.thunder;
                        rawDefs.earth = rawDefs.earth + item.defenses.earth;
                        rawDefs.fire = rawDefs.fire + item.defenses.fire;
                        rawDefs.water = rawDefs.water + item.defenses.water;
                    }
                }
            });
            return rawDefs;
    }

    getDefences(): FixedIdentification[] {
        let stats: FixedIdentification[] = [];

        [this.weapon, this.helmet, this.chestplate, this.leggings, this.boots, this.ring1, this.ring2, this.bracelet, this.necklace]
            .forEach(x => {
                if (x === null) {
                    return;
                }
                let identifications: FixedIdentification[] = this.getFixedIdentifications(x)
                identifications.forEach(id => {
                    if(id.identification.getId().toLowerCase().includes("defence")) {
                        this.merge(id, stats);
                    }
                })
            });
        return stats;
    }

    getDamages(): FixedIdentification[] {
        let stats: FixedIdentification[] = [];

        [this.weapon, this.helmet, this.chestplate, this.leggings, this.boots, this.ring1, this.ring2, this.bracelet, this.necklace]
            .forEach(x => {
                if (x === null) {
                    return;
                }
                let identifications: FixedIdentification[] = this.getFixedIdentifications(x)
                identifications.forEach(id => {
                    let idName = id.identification.getId().toLowerCase();
                    if(idName.includes("damage") && !idName.includes("raw")) {
                        this.merge(id, stats);
                    }
                })
            });
        return stats;
    }

    getRawDamages(): FixedIdentification[] {
        let stats: FixedIdentification[] = [];

        [this.weapon, this.helmet, this.chestplate, this.leggings, this.boots, this.ring1, this.ring2, this.bracelet, this.necklace]
            .forEach(x => {
                if (x === null) {
                    return;
                }
                let identifications: FixedIdentification[] = this.getFixedIdentifications(x)
                identifications.forEach(id => {
                    let idName = id.identification.getId().toLowerCase();
                    if(idName.includes("damage") && idName.includes("raw")) {
                        this.merge(id, stats);
                    }
                })
            });
        return stats;
    }

    merge(incoming: FixedIdentification, stats: FixedIdentification[]) {
        let previous = incoming;
        if (stats.some(x => x.identification.getId() == incoming.identification.getId())) {
            let index = stats.findIndex(x => x.identification.getId() === incoming.identification.getId())
            previous = stats[index];
            previous.value = previous.value + incoming.value;
            stats.splice(index, 1);
        }
        stats.push(previous);
    }
}

export class BuildStats {
    stats: FixedIdentification[];
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