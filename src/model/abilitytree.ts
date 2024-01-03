import { Pair } from "../scripts/util";

export const WARRIOR_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/warrior.json")).json() ;
export const WARRIOR_CONNECTORS: AbilityNodeConnector[] = await (await fetch("/builder/trees/warrior_connectors.json")).json() ;

export const MAGE_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/mage.json")).json();
export const ARCHER_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/archer.json")).json();
export const SHAMAN_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/shaman.json")).json();
export const ASSASSIN_ABILITY_TREE: AbilityNode[] = await (await fetch("/builder/trees/assassin.json")).json();

export class AbilityNodeConnector {
    x: number;
    y: number;
    sprite: {
        normal: string;
        activated: string;
    }
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

    if(upConnector !== undefined) {
        console.log("up");
        let resultUp = expand(upConnector!, target, connectors, tree, []);
        if(resultUp.first) {
            return resultUp.second
        }
    }

    if(downConnector !== undefined) {
        console.log("down");
        let resultDown = expand(downConnector!, target, connectors, tree, []);
        if(resultDown.first) {
            return resultDown.second
        }
    }

    if(leftConnector !== undefined) {
        console.log("left");
        let resultLeft = expand(leftConnector!, target, connectors, tree, []);
        if(resultLeft.first) {
            return resultLeft.second
        }
    }

    if(rightConnector !== undefined) {
        console.log("right");
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

    if(!wasVisited(upConnector, visited)) {
        let result = expand(upConnector!, target, connectors, tree, visited);
        if(result.first) {
            return result;
        }
    }

    if(!wasVisited(downConnector, visited)) {
        let result = expand(downConnector!, target, connectors, tree, visited);
        if(result.first) {
            return result;
        }
    }

    if(!wasVisited(leftConnector, visited)) {
        let result = expand(leftConnector!, target, connectors, tree, visited);
        if(result.first) {
            return result;
        }
    }

    if(!wasVisited(rightConnector, visited)){
        let result = expand(rightConnector!, target, connectors, tree, visited);
        if(result.first) {
            return result;
        }
    }

    return { first: false, second: visited } 
}

function wasVisited(connector: AbilityNodeConnector | undefined, visited: AbilityNodeConnector[]): boolean {
    return visited.some(a => connector !== undefined && a.x === connector!.x && a.y === connector!.y);
}

export function getNodeAt(x: number, y: number, tree: AbilityNode[]): AbilityNode | undefined {
    return tree.filter(a => a.coordinates.x == x && a.coordinates.y == y)[0]
}

export function getConnectorAt(x: number, y: number, connectors: AbilityNodeConnector[]): AbilityNodeConnector | undefined {
    return connectors.filter(a => a.x == x && a.y == y)[0]
}