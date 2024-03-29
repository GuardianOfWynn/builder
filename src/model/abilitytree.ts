import { Pair } from "../scripts/util";
import { Archetype } from "../model/archetype"
import { AbilityDetail } from "./skill";

export const BASE_ABILITY_POINTS = 45;

export const WARRIOR_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/warrior.json")).json() ;
export const WARRIOR_CONNECTORS: AbilityNodeConnector[] = await (await fetch("/builder/trees/warrior_connectors.json")).json() ;

export const MAGE_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/mage.json")).json();
export const MAGE_CONNECTORS: AbilityNodeConnector[] = await (await fetch("/builder/trees/mage_connectors.json")).json();

export const ARCHER_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/archer.json")).json();
export const ARCHER_CONNECTORS: AbilityNodeConnector[] = await (await fetch("/builder/trees/archer_connectors.json")).json();

export const SHAMAN_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/shaman.json")).json();
export const SHAMAN_CONNECTORS: AbilityNodeConnector[] = await (await fetch("/builder/trees/shaman_connectors.json")).json();

export const ASSASSIN_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/assassin.json")).json();
export const ASSASSIN_CONNECTORS: AbilityNodeConnector[] = await (await fetch("/builder/trees/assassin_connectors.json")).json();

export enum ConnectorType {
    DOWN_LEFT = "connector_down_left",
    DOWN_RIGHT = "connector_right_down",
    RIGHT_DOWN_LEFT = "connector_right_down_left",
    RIGHT_LEFT = "connector_right_left",
    UP_DOWN = "connector_up_down",
    UP_RIGHT_DOWN = "connector_up_right_down",
    CROSS = "connector_up_right_down_left",
    UP_LEFT_DOWN = "connector_up_down_left"
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
    [ConnectorType.UP_RIGHT_DOWN, [Direction.RIGHT, Direction.DOWN, Direction.UP]],
    [ConnectorType.UP_LEFT_DOWN, [Direction.UP, Direction.LEFT, Direction.DOWN]]
]);

export function isDirectionAllowed(connector: ConnectorType, direction: Direction): boolean {
    return CONNECTOR_TYPE_DIRECTIONS.get(connector)!.includes(direction);
}

export class AbilityTree {
    baseTree: AbilityNode[];
    toggledBuffs: AbilityNode[];
    baseTreeDetails: AbilityDetail[];
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

    getAvailableNodes(): AbilityNode[] {
        return Array.from(new Set(this.nodes.flatMap(x => x.links)))
            .filter(x => x !== null && x !== undefined && x.trim() !== "")
            .map(x => getAbilityNode(x,this.baseTree))
            .filter(x => x !== undefined)
            .filter(x => !this.nodes.includes(x))
            .filter(node => this.isNodeAvailable(node).first);
    }

    isNodeAvailable(node: AbilityNode): Pair<boolean, string> {
        if(!Array.from(new Set(this.nodes.flatMap(x => x.links))).some(x => x === node.id) && node.id !== this.baseTree[0].id) {
            return { first: false, second: `Node unreachable` };
        }
        if(node.requirements.archetype !== undefined && this.getNodesOfArchetype(node.requirements.archetype.name as Archetype).length < node.requirements.archetype.amount) {
            return { first: false, second: "Not enough archetype required nodes"};
        }
        if(node.requirements.abilityPoints > this.getAvailableAbilityPoints() && !this.nodes.some(x => x.id === node.id)) {
            return { first: false, second: "Not enough ability points"};
        }
        if(node.requirements.node !== undefined && !this.nodes.some(x => x.id === node.requirements.node)) {
            return { first: false, second: `Required node not found` };
        }
        if(this.getLockedAbilities().some(x => x.id === node.id)) {
            return { first: false, second: `Node locked` };
        }
        return { first: true, second: "" };
    }
}

export class AbilityNodeConnector {
    x: number;
    y: number;
    type: string;
}

export class AbilityNode {
    id: string;
    uniqueId: string;
    archetype: string;
    name: string;
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
    };
    sprite: {
        normal: string;
        activated: string;
    };
    description: string[];
    links: string[];
    slot: number;
    locks: string[];
}

export function findPath(root: AbilityNode, target: AbilityNode, connectors: AbilityNodeConnector[], tree: AbilityNode[]): AbilityNodeConnector[] {
    let upConnector = getConnectorAt(root.coordinates.x, root.coordinates.y-1, connectors);
    let downConnector = getConnectorAt(root.coordinates.x, root.coordinates.y+1, connectors);
    let leftConnector = getConnectorAt(root.coordinates.x-1, root.coordinates.y, connectors);
    let rightConnector = getConnectorAt(root.coordinates.x+1, root.coordinates.y, connectors);

    if(upConnector !== undefined && isDirectionAllowed(upConnector.type as ConnectorType, Direction.DOWN)) {
        let resultUp = expand(upConnector!, target, connectors, tree, []);
        if(resultUp.first) {
            return resultUp.second;
        }
    }

    if(leftConnector !== undefined && isDirectionAllowed(leftConnector.type as ConnectorType, Direction.RIGHT)) {
        let resultLeft = expand(leftConnector!, target, connectors, tree, []);
        if(resultLeft.first) {
            return resultLeft.second;
        }
    }

    if(rightConnector !== undefined && isDirectionAllowed(rightConnector.type as ConnectorType, Direction.LEFT)) {
        let resultRight = expand(rightConnector!, target, connectors, tree, []);
        if(resultRight.first) {
            return resultRight.second;
        }
    }

    if(downConnector !== undefined && isDirectionAllowed(downConnector.type as ConnectorType, Direction.UP)) {
        let resultDown = expand(downConnector!, target, connectors, tree, []);
        if(resultDown.first) {
            return resultDown.second;
        }
    }

    return [];
}

function expand(from: AbilityNodeConnector, target: AbilityNode, connectors: AbilityNodeConnector[], tree: AbilityNode[], visited: AbilityNodeConnector[]): Pair<Boolean,AbilityNodeConnector[]> {
    if(from === undefined) {
        return {first: false, second: visited}
    }
    visited.push(from);
    let upNode = getNodeAt(from.x, from.y-1, tree);
    let downNode = getNodeAt(from.x, from.y+1, tree);
    let leftNode = getNodeAt(from.x-1, from.y, tree);
    let rightNode = getNodeAt(from.x+1, from.y, tree);

    let connectorType = from.type as ConnectorType;

    if((upNode !== undefined && upNode.id === target.id && isDirectionAllowed(connectorType, Direction.UP)) 
        || (downNode !== undefined && downNode.id === target.id && isDirectionAllowed(connectorType, Direction.DOWN))
        || (leftNode !== undefined && leftNode.id === target.id && isDirectionAllowed(connectorType, Direction.LEFT))
        || (rightNode !== undefined && rightNode.id === target.id && isDirectionAllowed(connectorType, Direction.RIGHT))) {
            return {first: true, second: visited};
    }

    let upConnector = getConnectorAt(from.x, from.y-1, connectors);
    let downConnector = getConnectorAt(from.x, from.y+1, connectors);
    let leftConnector = getConnectorAt(from.x-1, from.y, connectors);
    let rightConnector = getConnectorAt(from.x+1, from.y, connectors);

    // Direction is relative to the connector, thats why we use Direction.DOWN instead of Direction.UP and etc
    if(upConnector !== undefined && isDirectionAllowed(upConnector.type as ConnectorType, Direction.DOWN) && !wasVisited(upConnector, visited)) {
        let result = expand(upConnector!, target, connectors, tree, visited);
        if(result.first) {
            return result;
        }
    }

    if(rightConnector !== undefined && isDirectionAllowed(rightConnector.type as ConnectorType, Direction.LEFT) && !wasVisited(rightConnector, visited)){
        let result = expand(rightConnector!, target, connectors, tree, visited);
        if(result.first) {
            return result;
        }
    }

    if(leftConnector !== undefined && isDirectionAllowed(leftConnector.type as ConnectorType, Direction.RIGHT) && !wasVisited(leftConnector, visited)) {
        let result = expand(leftConnector!, target, connectors, tree, visited);
        if(result.first) {
            return result;
        }
    }


    if(downConnector !== undefined && isDirectionAllowed(downConnector.type as ConnectorType, Direction.UP) && !wasVisited(downConnector, visited)) {
        let result = expand(downConnector!, target, connectors, tree, visited);
        if(result.first) {
            return result;
        }
    }

    // If the current connector couldnt reach the target node, remove it from visited array.
    visited.splice(visited.length - 1, 1);

    return {first: false, second: []}

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