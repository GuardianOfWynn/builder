<template>
    <div v-if="abilityTree === undefined">

    </div>
    <div v-else class="flex gap-x-8 h-1/3">
        <div
            class="overflow-y-auto relative font-minecraft bg-local bg-ability-tree border-solid h-FULL w-fit hide-scroll border-mc-aqua border-[4px]">
            <div
                class="text-white sticky top-0 left-0 right-0 mb-2 text-center py-1 border-b-[4px] bg-ability-tree z-10 border-mc-aqua">
                Ability tree
            </div>
            <div class="p-4">
                <div v-for="i in getDepth()" class="flex">
                    <div v-for="j in 9">
                        <div class="w-10 h-10">
                            <div v-if="hasNode(j, i)" @mouseenter="onHover(getNodeFor(j, i)!)"
                                @mouseleave="onHover(undefined)" @click="toggleNode(getNodeFor(j, i)!)"
                                class="cursor-pointer">
                                <img class="w-10 h-10 object-fill scale-125 pixelated"
                                    v-if="abilityTree.nodes.some(a => a.coordinates.x == j && a.coordinates.y == i)"
                                    :src="'/builder/sprites/abilitytree/' + getNodeFor(j, i)!.sprite.activated" />
                                <img class="w-10 h-10 object-fill scale-125"
                                    :class="[availableNodes.includes(getNodeFor(j, i)!) ? 'opacity-100' : 'opacity-50']"
                                    v-else :src="'/builder/sprites/abilitytree/' + getNodeFor(j, i)!.sprite.normal" />
                            </div>
                            <div v-else-if="hasConnector(j, i)">
                                <img class="w-10 h-10 object-fill pixelated"
                                    v-if="abilityTree.connectors.some(a => a.x == j && a.y == i)"
                                    :src="'/builder/sprites/abilitytree/' + getConnectorFor(j, i)!.type + '_' + getConnectorSpriteVariant(getConnectorFor(j, i)!) + '.png'" />
                                <img class="w-10 h-10 object-fill" v-else
                                    :src="'/builder/sprites/abilitytree/' + getConnectorFor(j, i)!.type + '.svg'" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-white border-[1px] border-mc-aqua p-4 flex w-1/3 h-fit justify-center gap-x-4">
            <div v-for="arch in archetypes.get(clazz!)" class="text-center w-1/3">
                <p
                    :class="'text-' + ARCHETYPE_DATA.get(arch as Archetype)!.color">
                        {{ ARCHETYPE_DATA.get(arch as Archetype)!.name }}
                </p>
                <p class="mb-2">
                    {{ abilityTree!.getNodesOfArchetype(arch as Archetype).length }} / {{ baseTree!.filter(x => x.archetype !== undefined && x.archetype == arch).length }}
                </p>
                <img :src="'/builder/sprites/abilitytree/' + arch + '.svg'" class="pixelated h-10 w-10 mx-auto"/>
            </div>
        </div>
    </div>
</template>


<script lang="ts">

import { Ref, ref, watchEffect } from 'vue';
import { AbilityNode, AbilityTree, AbilityNodeConnector, ConnectorType, makeTree } from '../../model/abilitytree'
import { WynnClass } from '../../scripts/util';
import { ARCHETYPE_DATA, Archetype } from '../../model/archetype';

export default {
    name: 'AbilityTree',
    props: {
        tree: Array<AbilityNode>,
        clazz: String,
        connectors: Array<AbilityNodeConnector>
    },
    setup(props) {
        const abilityTree: Ref<AbilityTree | undefined> = ref(undefined);
        const currentHovered: Ref<AbilityNode | undefined> = ref(undefined)
        const baseTree: Ref<AbilityNode[] | undefined> = ref(props.tree);

        const selectedNodes: Ref<AbilityNode[]> = ref([]);
        const availableNodes: Ref<AbilityNode[]> = ref([]);

        const archetypes = new Map([
            ['Warrior/Knight', ['berserker', 'monk', 'tank']],
            ['Archer/Hunter', ['boltslinger', 'trapper', 'sniper']],
            ['Mage/Dark Wizard', ['blitz', 'priest', 'arcane']],
            ['Assassin/Ninja', ['shadestepper', 'trickster', 'acrobat']],
            ['Shaman/Skyseer', ['summoner', 'ritualist', 'bloodmagik']],
        ]);

        const getNodeFor = (x: number, y: number): AbilityNode | undefined => props.tree?.filter(a => a.coordinates.x === x && a.coordinates.y === y)[0];
        const hasNode = (x: number, y: number): boolean => getNodeFor(x, y) !== undefined;

        const getConnectorFor = (x: number, y: number): AbilityNodeConnector | undefined => props.connectors?.filter(a => a.x === x && a.y === y)[0]
        const hasConnector = (x: number, y: number): boolean => getConnectorFor(x, y) !== undefined;

        const getDepth = (): number => Math.max(...props.tree!.map(x => x.coordinates.y))

        const toggleNode = (abilityNode: AbilityNode) => {
            if (selectedNodes.value.some(x => x.id === abilityNode.id)) {
                selectedNodes.value.splice(selectedNodes.value.findIndex(x => x.id === abilityNode.id), 1);
            } else {
                selectedNodes.value.push(abilityNode);
            }
            assemble();
        }

        const onHover = (abilityNode: AbilityNode | undefined) => {
            currentHovered.value = abilityNode;
        }

        const assemble = () => {
            let tree = makeTree(selectedNodes.value, props.tree!, props.connectors!);
            availableNodes.value = tree.getAvailableNodes();
            selectedNodes.value = tree.nodes;
            abilityTree.value = tree;
        }

        const getConnectorSpriteVariant = (connector: AbilityNodeConnector) => {
            let up = [connector.x, connector.y - 1];
            let down = [connector.x, connector.y + 1];
            let left = [connector.x - 1, connector.y];
            let right = [connector.x + 1, connector.y];

            let upActive = selectedNodes.value.some(a => a.coordinates.x === up[0] && a.coordinates.y === up[1])
                || abilityTree.value!.connectors.some(a => a.x === up[0] && a.y === up[1]);
            let downActive = selectedNodes.value.some(a => a.coordinates.x === down[0] && a.coordinates.y === down[1])
                || abilityTree.value!.connectors.some(a => a.x === down[0] && a.y === down[1]);
            let leftActive = selectedNodes.value.some(a => a.coordinates.x === left[0] && a.coordinates.y === left[1])
                || abilityTree.value!.connectors.some(a => a.x === left[0] && a.y === left[1]);
            let rightActive = selectedNodes.value.some(a => a.coordinates.x === right[0] && a.coordinates.y === right[1])
                || abilityTree.value!.connectors.some(a => a.x === right[0] && a.y === right[1]);

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
            baseTree.value = props.tree;
            assemble();
        })

        return {
            abilityTree, availableNodes, currentHovered, archetypes, ARCHETYPE_DATA, baseTree, onHover, getDepth, getNodeFor, toggleNode, getConnectorFor, hasNode, hasConnector, getConnectorSpriteVariant, selectedNodes
        }
    },
    components: {}
}
</script>