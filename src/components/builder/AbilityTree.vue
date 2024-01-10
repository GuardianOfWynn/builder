<template>
    <div v-if="baseTree === undefined" class="text-white text-2xl">
        Ability tree unavailable: No weapon selected
    </div>
    <div v-else class="flex gap-x-8 h-full">
        <div :class="[tree === undefined? 'w-1/3' : 'w-fit']"
            class="overflow-y-scroll relative font-minecraft bg-local bg-ability-tree border-solid h-full hide-scroll border-mc-aqua border-[4px]">
            <div
                class="text-white sticky top-0 left-0 right-0 mb-2 text-center py-1 border-b-[4px] bg-ability-tree z-10 border-mc-aqua">
                Ability tree
            </div>
            <div class="p-4 w-1/2">
                <div v-for="i in getDepth()" class="flex">
                    <div v-for="j in 9">
                        <div class="w-10 h-10">
                            <div v-if="hasNode(j, i)" @mouseenter="onHover(getNodeFor(j, i)!)"
                                @mouseleave="onHover(undefined)" @click="toggleNode(getNodeFor(j, i)!)"
                                class="cursor-pointer">
                                <img class="w-10 h-10 object-fill scale-125 pixelated"
                                    v-if="abilityTree!.nodes.some(a => a.coordinates.x == j && a.coordinates.y == i)"
                                    :src="'/builder/sprites/abilitytree/' + getNodeFor(j, i)!.sprite.activated" />
                                <img class="w-10 h-10 object-fill scale-125"
                                    :class="[availableNodes.some(a => a.coordinates.x === j && a.coordinates.y === i) ? 'opacity-100' : 'opacity-50']"
                                    v-else :src="'/builder/sprites/abilitytree/' + getNodeFor(j, i)!.sprite.normal" />
                            </div>
                            <div v-else-if="hasConnector(j, i)">
                                <img class="w-10 h-10 object-fill pixelated"
                                    v-if="abilityTree!.connectors.some(a => a.x == j && a.y == i)"
                                    :src="'/builder/sprites/abilitytree/' + getConnectorFor(j, i)!.type + '_' + getConnectorSpriteVariant(getConnectorFor(j, i)!) + '.png'" />
                                <img class="w-10 h-10 object-fill" v-else
                                    :src="'/builder/sprites/abilitytree/' + getConnectorFor(j, i)!.type + '.svg'" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-y-8 w-fit">
            <div class="text-white border-[1px] rounded-md border-mc-aqua p-4 h-fit">
                <div class=" justify-center gap-x-4 flex">
                    <div v-for="arch in CLASS_ARCHETYPES.get(clazz! as WynnClass)" class="text-center w-1/3">
                        <p :class="'text-xs text-' + ARCHETYPE_DATA.get(arch as Archetype)!.color">
                            {{ ARCHETYPE_DATA.get(arch as Archetype)!.name }}
                        </p>
                        <p class="mb-2">
                            {{ abilityTree!.getNodesOfArchetype(arch as Archetype).length }} / {{ baseTree!.filter(x =>
                                x.archetype !== undefined && x.archetype == arch).length }}
                        </p>
                        <img :src="'/builder/sprites/abilitytree/' + arch + '.svg'" class="pixelated h-6 w-6 mx-auto" />
                    </div>
                </div>
                <p class="mt-4 text-center">Ability Points: {{ abilityTree!.getAvailableAbilityPoints() }} / {{ BASE_ABILITY_POINTS }}</p>
            </div>
            <div v-if="currentHovered !== undefined" class="text-sm w-fit rounded-sm border-[1px] p-4 border-mc-aqua">
                <div class="text-sm">
                    <MinecraftTranslatedText :text="currentHovered.name" />
                </div>
                <MinecraftTranslatedText v-for="line in currentHovered.description" :text="line" />
            </div>
            <div class="text-xs">
                <MinecraftTranslatedText v-for="msg in warns" :text="msg" />
            </div>
        </div>
    </div>
</template>


<script lang="ts">

import { Ref, onMounted, ref, watchEffect } from 'vue';
import { AbilityNode, AbilityTree, AbilityNodeConnector, ConnectorType, makeTree, BASE_ABILITY_POINTS } from '../../model/abilitytree'
import { WynnClass } from '../../scripts/util';
import { ARCHETYPE_DATA, Archetype, CLASS_ARCHETYPES } from '../../model/archetype';
import MinecraftTranslatedText from '../MinecraftTranslatedText.vue';

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
        const warns: Ref<string[]> = ref([]);

        const selectedNodes: Ref<AbilityNode[]> = ref([]);
        const availableNodes: Ref<AbilityNode[]> = ref([]);
        onMounted(() => {
            assemble();
        })

        const getNodeFor = (x: number, y: number): AbilityNode | undefined => props.tree?.filter(a => a.coordinates.x === x && a.coordinates.y === y)[0];
        const hasNode = (x: number, y: number): boolean => getNodeFor(x, y) !== undefined;

        const getConnectorFor = (x: number, y: number): AbilityNodeConnector | undefined => props.connectors?.filter(a => a.x === x && a.y === y)[0]
        const hasConnector = (x: number, y: number): boolean => getConnectorFor(x, y) !== undefined;

        const getDepth = (): number => {
            if(props.tree === undefined) {
                return 0;
            }
            return Math.max(...props.tree.map(x => x.coordinates.y))
        }

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
            if (baseTree.value !== undefined && selectedNodes.value.length === 0) {
                availableNodes.value = [baseTree.value![0]]
            }
            warns.value = [];
            if(tree.getAvailableAbilityPoints() < 0) {
                warns.value.push("&cIllegal ability tree: too many ability points assigned");
            }
            selectedNodes.value.forEach(x => {
                let result = tree.isNodeAvailable(x);
                if (!result.first) {
                    warns.value.push("&cIllegal node &n" + x.name + "&c: " + result.second);
                }
            })
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
            abilityTree, availableNodes, currentHovered, ARCHETYPE_DATA, baseTree, CLASS_ARCHETYPES, warns, BASE_ABILITY_POINTS, onHover, getDepth, getNodeFor, toggleNode, getConnectorFor, hasNode, hasConnector, getConnectorSpriteVariant, selectedNodes
        }
    },
    components: { MinecraftTranslatedText }
}
</script>