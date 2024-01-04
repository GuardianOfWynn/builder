import { Pair } from "../scripts/util";

export const BASE_ABILITY_POINTS = 45;

export const WARRIOR_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/warrior.json")).json() ;
export const WARRIOR_CONNECTORS: AbilityNodeConnector[] = await (await fetch("/builder/trees/warrior_connectors.json")).json() ;

export const MAGE_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/mage.json")).json();
export const ARCHER_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/archer.json")).json();
export const SHAMAN_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/shaman.json")).json();
export const ASSASSIN_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/assassin.json")).json();

export enum Archetype {
    ACOLYTE = "bloodmagik",
    SUMMONER = "summoner",
    RITUALIST = "ritualist",
    RIFTWALKER = "blitz",
    LIGHT_BENDER = "priest",
    ARCANIST = "arcane",
    BATTLE_MONK = "monk",
    FALLEN = "berserker",
    PALADIN = "tank",
    TRAPPER = "trapper",
    SHARPSHOOTER = "sniper",
    BOLTSLINGER = "boltslinger",
    SHADESTEPPER = "shadestepper",
    TRICKSTER = "trickster",
    ACROBAT = "acrobat"
}

export enum ConnectorType {
    DOWN_LEFT = "connector_down_left",
    DOWN_RIGHT = "connector_right_down",
    RIGHT_DOWN_LEFT = "connector_right_down_left",
    RIGHT_LEFT = "connector_right_left",
    UP_DOWN = "connector_up_down",
    UP_RIGHT_DOWN = "connector_up_right_down",
    CROSS = "connector_up_right_down_left"

}

export enum Direction {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right"
}

export const CONNECTOR_TYPE_DIRECTIONS = new Map<ConnectorType, Direction[]>([
    [ConnectorType.CROSS, [Direction.DOWN, Direction.LEFT, Direction.UP, Direction.RIGHT]],
    [ConnectorType.DOWN_LEFT, [Direction.DOWN, Direction.LEFT]],
    [ConnectorType.DOWN_RIGHT, [Direction.DOWN, Direction.RIGHT]],
    [ConnectorType.RIGHT_DOWN_LEFT, [Direction.RIGHT, Direction.DOWN, Direction.LEFT]],
    [ConnectorType.RIGHT_LEFT, [Direction.RIGHT, Direction.LEFT]],
    [ConnectorType.UP_DOWN, [Direction.UP, Direction.DOWN]],
    [ConnectorType.UP_RIGHT_DOWN, [Direction.RIGHT, Direction.DOWN, Direction.UP]]
]);

export function isDirectionAllowed(connector: ConnectorType, direction: Direction): boolean {
    return CONNECTOR_TYPE_DIRECTIONS.get(connector)!.includes(direction);
}

export class AbilityTree {
    baseTree: AbilityNode[];
    nodes: AbilityNode[];
    connectors: AbilityNodeConnector[];
    availableNodes: AbilityNode[];

    constructor(baseTree: AbilityNode[], nodes: AbilityNode[], connectors: AbilityNodeConnector[], availableNodes: AbilityNode[]) {
        this.baseTree = baseTree;
        this.nodes = nodes;
        this.connectors = connectors;
        this.availableNodes = availableNodes;
    }
    
    getNodesOfArchetype(arch: Archetype): AbilityNode[] {
        return this.nodes.filter(x => x.archetype !== "" && x.archetype === arch);
    }

    getAvailableAbilityPoints(): number {
        return BASE_ABILITY_POINTS - this.nodes.reduce((ac, v) => ac + v.requirements.abilityPoints, 0);
    }

    getLockedAbilities(): AbilityNode[] {
        let locked: AbilityNode[] = [];
        this.nodes.forEach(ab => ab.locks.forEach(lo => {
            if(!locked.some(x => x.id === lo)) {
                locked.push(getAbilityNode(lo, this.baseTree))
            }
        }))
        return locked;
    }

    isNodeAvailable(node: AbilityNode): boolean {
        if(node.requirements.archetype !== undefined && this.getNodesOfArchetype(node.requirements.archetype.name as Archetype).length < node.requirements.archetype.amount) {
            return false;
        }
        if(node.requirements.abilityPoints > this.getAvailableAbilityPoints()) {
            return false;
        }
        if(node.requirements.node !== undefined && !this.nodes.some(x => x.id === node.requirements.node)) {
            return false;
        }
        if(this.getLockedAbilities().some(x => x.id === node.id)) {
            return false;
        }
        return true;
    }
}

export class AbilityNodeConnector {
    x: number;
    y: number;
    type: string;
}

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
    coordinates: {
        x: number;
        y: number;
    }
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

export function findPath(root: AbilityNode, target: AbilityNode, connectors: AbilityNodeConnector[], tree: AbilityNode[]): AbilityNodeConnector[] {
    let upConnector = getConnectorAt(root.coordinates.x, root.coordinates.y-1, connectors);
    let downConnector = getConnectorAt(root.coordinates.x, root.coordinates.y+1, connectors);
    let leftConnector = getConnectorAt(root.coordinates.x-1, root.coordinates.y, connectors);
    let rightConnector = getConnectorAt(root.coordinates.x+1, root.coordinates.y, connectors);
    console.log(leftConnector);

    if(upConnector !== undefined) {
        let resultUp = expand(upConnector!, target, connectors, tree, []);
        if(resultUp.first) {
            return resultUp.second
        }
    }

    if(downConnector !== undefined) {
        let resultDown = expand(downConnector!, target, connectors, tree, []);
        if(resultDown.first) {
            return resultDown.second
        }
    }

    if(leftConnector !== undefined) {
        let resultLeft = expand(leftConnector!, target, connectors, tree, []);
        if(resultLeft.first) {
            return resultLeft.second
        }
    }

    if(rightConnector !== undefined) {
        let resultRight = expand(rightConnector!, target, connectors, tree, []);
        if(resultRight.first) {
            return resultRight.second
        }

    }
    return [];
}

function expand(from: AbilityNodeConnector, target: AbilityNode, connectors: AbilityNodeConnector[], tree: AbilityNode[], visited: AbilityNodeConnector[]): Pair<Boolean,AbilityNodeConnector[]> {
    if(from === undefined) {
        return {first: false, second: visited}
    }
    visited.push(from);
    console.log(visited);
    let upNode = getNodeAt(from.x, from.y-1, tree);
    let downNode = getNodeAt(from.x, from.y+1, tree);
    let leftNode = getNodeAt(from.x-1, from.y, tree);
    let rightNode = getNodeAt(from.x+1, from.y, tree);

    if((upNode !== undefined && upNode.id === target.id) 
        || (downNode !== undefined && downNode.id === target.id)
        || (leftNode !== undefined && leftNode.id === target.id)
        || (rightNode !== undefined && rightNode.id === target.id)) {
        return {first: true, second: visited};
    }

    let upConnector = getConnectorAt(from.x, from.y-1, connectors);
    let downConnector = getConnectorAt(from.x, from.y+1, connectors);
    let leftConnector = getConnectorAt(from.x-1, from.y, connectors);
    let rightConnector = getConnectorAt(from.x+1, from.y, connectors);

    if(upConnector !== undefined && isDirectionAllowed(upConnector.type as ConnectorType, Direction.UP) && !wasVisited(upConnector, visited)) {
        let result = expand(upConnector!, target, connectors, tree, visited);
        if(result.first) {
            return result;
        }
    }

    if(downConnector !== undefined && isDirectionAllowed(downConnector.type as ConnectorType, Direction.DOWN) && !wasVisited(downConnector, visited)) {
        let result = expand(downConnector!, target, connectors, tree, visited);
        if(result.first) {
            return result;
        }
    }

    if(rightConnector !== undefined && isDirectionAllowed(rightConnector.type as ConnectorType, Direction.RIGHT) && !wasVisited(rightConnector, visited)){
        let result = expand(rightConnector!, target, connectors, tree, visited);
        if(result.first) {
            return result;
        }
    }

    if(leftConnector !== undefined && isDirectionAllowed(leftConnector.type as ConnectorType, Direction.LEFT) && !wasVisited(leftConnector, visited)) {
        let result = expand(leftConnector!, target, connectors, tree, visited);
        if(result.first) {
            return result;
        }
    }

    return { first: false, second: visited } 
}

export function makeTree(selectedNodes: AbilityNode[], tree: AbilityNode[], connectors: AbilityNodeConnector[]): AbilityTree {
    let paths: AbilityNodeConnector[] = [];
    selectedNodes.forEach(node => {
        if(node.links === null) {
            return;
        }
        node.links.map(x => getAbilityNode(x, tree)).forEach(target => {
            if(selectedNodes.includes(target)) {
                paths.push(...findPath(node, target, connectors, tree));
            }
        })
    });
    return new AbilityTree(tree, selectedNodes, paths, []);
}

export function getAbilityNode(id: string, tree: AbilityNode[]): AbilityNode {
    return tree.filter(x => x.id === id)[0];
}

function wasVisited(connector: AbilityNodeConnector | undefined, visited: AbilityNodeConnector[]): boolean {
    return visited.some(a => a.x === connector!.x && a.y === connector!.y);
}

export function getNodeAt(x: number, y: number, tree: AbilityNode[]): AbilityNode | undefined {
    return tree.filter(a => a.coordinates.x == x && a.coordinates.y == y)[0]
}

export function getConnectorAt(x: number, y: number, connectors: AbilityNodeConnector[]): AbilityNodeConnector | undefined {
    return connectors.filter(a => a.x == x && a.y == y)[0]
}