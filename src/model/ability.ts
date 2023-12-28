export class AbilityNode {
    id: number;
    cost: number;
    sprite: number;
    name: string;
    child: number[];
    blocks: number[];
    required: number[];
    archetype: string;
    minArchetype: number;
    depth: number;
}