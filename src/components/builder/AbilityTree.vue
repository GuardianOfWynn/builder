<template>
    <div v-if="abilityTree === undefined">

    </div>
    <div v-else
        class="overflow-y-auto relative font-minecraft bg-local scroll-smooth bg-ability-tree border-solid h-1/3 w-fit hide-scroll border-mc-aqua border-[4px]">
        <div class="text-white sticky top-0 left-0 right-0 mb-2 text-center py-1 border-b-[4px] bg-ability-tree z-10 border-mc-aqua">
            Ability tree
        </div>
        <div class="p-4">
            <div v-for="i in getDepth()" class="flex">
                <div v-for="j in 9">
                    <div class="w-10 h-10">
                        <div v-if="hasNode(j, i)" @click="toggleNode(getNodeFor(j, i)!)" class="cursor-pointer">
                            <img class="w-10 h-10 object-fill scale-125 pixelated"
                                v-if="selectedNodes.some(a => a.coordinates.x == j && a.coordinates.y == i)"
                                :src="'/builder/sprites/abilitytree/' + getNodeFor(j, i)!.sprite.activated" />
                            <img class="w-10 h-10 object-fill scale-125" v-else
                                :src="'/builder/sprites/abilitytree/' + getNodeFor(j, i)!.sprite.normal" />
                        </div>
                        <div v-else-if="hasConnector(j, i)">
                            <img class="w-10 h-10 object-fill pixelated"
                                v-if="activeConnectors.some(a => a.x == j && a.y == i)"
                                :src="'/builder/sprites/abilitytree/' + getConnectorFor(j, i)!.type + '_' + getConnectorSpriteVariant(getConnectorFor(j, i)!) + '.png'" />
                            <img class="w-10 h-10 object-fill" v-else
                                :src="'/builder/sprites/abilitytree/' + getConnectorFor(j, i)!.type + '.svg'" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">

import { Ref, ref, watchEffect } from 'vue';
import { AbilityNode, AbilityNodeConnector, ConnectorType, makeTree } from '../../model/abilitytree'

export default {
    name: 'AbilityTree',
    props: {
        tree: Array<AbilityNode>,
        connectors: Array<AbilityNodeConnector>
    },
    setup(props) {
        const abilityTree: Ref<AbilityNode[] | undefined> = ref(undefined);

        const selectedNodes: Ref<AbilityNode[]> = ref([]);
        const activeConnectors: Ref<AbilityNodeConnector[]> = ref([]);

        const getNodeFor = (x: number, y: number): AbilityNode | undefined => props.tree?.filter(a => a.coordinates.x === x && a.coordinates.y === y)[0];
        const hasNode = (x: number, y: number): boolean => getNodeFor(x, y) !== undefined;

        const getConnectorFor = (x: number, y: number): AbilityNodeConnector | undefined => props.connectors?.filter(a => a.x === x && a.y === y)[0]
        const hasConnector = (x: number, y: number): boolean => getConnectorFor(x, y) !== undefined;

        const getDepth = (): number => Math.max(...props.tree!.map(x => x.coordinates.y))

        const toggleNode = (abilityNode: AbilityNode) => {
            if (selectedNodes.value.some(x => x.id === abilityNode.id)) {
                selectedNodes.value.splice(selectedNodes.value.findIndex(x => x.id === abilityNode.id));
            } else {
                selectedNodes.value.push(abilityNode);
            }
            assemble();
        }

        const assemble = () => {
            let tree = makeTree(selectedNodes.value, props.tree!, props.connectors!);
            activeConnectors.value = tree.connectors;
        }

        const getConnectorSpriteVariant = (connector: AbilityNodeConnector) => {
            let up = [connector.x, connector.y - 1];
            let down = [connector.x, connector.y + 1];
            let left = [connector.x - 1, connector.y];
            let right = [connector.x + 1, connector.y];

            let upActive = selectedNodes.value.some(a => a.coordinates.x === up[0] && a.coordinates.y === up[1])
                || activeConnectors.value.some(a => a.x === up[0] && a.y === up[1]);
            let downActive = selectedNodes.value.some(a => a.coordinates.x === down[0] && a.coordinates.y === down[1])
                || activeConnectors.value.some(a => a.x === down[0] && a.y === down[1]);
            let leftActive = selectedNodes.value.some(a => a.coordinates.x === left[0] && a.coordinates.y === left[1])
                || activeConnectors.value.some(a => a.x === left[0] && a.y === left[1]);
            let rightActive = selectedNodes.value.some(a => a.coordinates.x === right[0] && a.coordinates.y === right[1])
                || activeConnectors.value.some(a => a.x === right[0] && a.y === right[1]);

            if (connector.type == ConnectorType.CROSS) {
                if (rightActive && downActive && leftActive && !upActive) {
                    return "2";
                }
                if (rightActive && !downActive && leftActive && upActive) {
                    return "3";
                }
                if (rightActive && !downActive && leftActive && !upActive) {
                    return "4";
                }
                if (!rightActive && downActive && leftActive && upActive) {
                    return "5";
                }
                if (!rightActive && !downActive && leftActive && upActive) {
                    return "6";
                }
                if (!rightActive && downActive && leftActive && !upActive) {
                    return "7";
                }
                if (rightActive && downActive && !leftActive && upActive) {
                    return "8";
                }
                if (rightActive && !downActive && !leftActive && upActive) {
                    return "9";
                }
                if (rightActive && downActive && !leftActive && !upActive) {
                    return "10";
                }
                if (!rightActive && downActive && !leftActive && upActive) {
                    return "11";
                }
            }
            if (connector.type == ConnectorType.RIGHT_DOWN_LEFT) {
                if (rightActive && !downActive && leftActive) {
                    return "2";
                }

                if (!rightActive && downActive && leftActive) {
                    return "3";
                }
                if (rightActive && downActive && !leftActive) {
                    return "4";
                }
            }
            if (connector.type == ConnectorType.UP_RIGHT_DOWN) {
                if (rightActive && downActive && !upActive) {
                    return "2";
                }
                if (rightActive && !downActive && upActive) {
                    return "3";
                }
                if (!rightActive && downActive && upActive) {
                    return "4";
                }
            }
            return "1";
        }

        watchEffect(() => {
            abilityTree.value = props.tree;
        })

        return {
            abilityTree, getDepth, getNodeFor, toggleNode, getConnectorFor, hasNode, hasConnector, getConnectorSpriteVariant, activeConnectors, selectedNodes
        }
    },
    components: {}
}
</script>