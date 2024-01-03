export const WARRIOR_ABILITY_TREE: AbilityTree = { tree: await (await fetch("/builder/trees/warrior.json")).json() };
export const MAGE_ABILITY_TREE: AbilityTree = { tree: await (await fetch("/builder/trees/mage.json")).json() };
export const ARCHER_ABILITY_TREE: AbilityTree = { tree: await (await fetch("/builder/trees/archer.json")).json() };
export const SHAMAN_ABILITY_TREE: AbilityTree = { tree: await (await fetch("/builder/trees/shaman.json")).json() };
export const ASSASSIN_ABILITY_TREE: AbilityTree = { tree: await (await fetch("/builder/trees/assassin.json")).json() };

export class AbilityNode {
    id: string;
    requirements: {
        node: string;
        abilityPoints: number;
        archetype?: {
            amount: number;
            name: string;
        }
    };
    archetype: string;
    name: string;
    sprite: {
        normal: string;
        activated: string;
    };
    description: string[];
    links: string[];
    required: number[];
    slot: number;
    locks: string[];
}

export class AbilityTree {
    tree: AbilityNode[];
}