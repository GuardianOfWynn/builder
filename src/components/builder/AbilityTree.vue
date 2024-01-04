<template>
    <div v-if="abilityTree === undefined">
        
    </div>
    <div  v-else class="overflow-y-scroll h-1/3 w-fit">
        <div class="bg-ability-tree border-solid font-minecraft border-gray-800 border-[4px] bg-center bg-local">
        <div class="text-white text-center py-1 border-b-[4px] border-gray-800">
            Ability tree
        </div>
        <div class="p-2">
            <div v-for="i in getDepth()" class="flex">
            <div v-for="j in 9">
                <div class="w-10 h-10">
                    <div v-if="hasNode(j, i)" @click="toggleNode(getNodeFor(j, i)!)" class="cursor-pointer">
                        <img class="w-10 h-10 object-fill scale-125 pixelated" v-if="selectedNodes.some(a => a.coordinates.x == j && a.coordinates.y == i)"
                        :src="'/builder/sprites/abilitytree/' + getNodeFor(j, i)!.sprite.activated" />
                        <img class="w-10 h-10 object-fill scale-125" v-else
                        :src="'/builder/sprites/abilitytree/' + getNodeFor(j, i)!.sprite.normal" />
                    </div>
                    <div v-else-if="hasConnector(j, i)">
                        <img class="w-10 h-10 object-fill pixelated" v-if="activeConnectors.some(a => a.x == j && a.y == i)"
                        :src="'/builder/sprites/abilitytree/' + getConnectorFor(j, i)!.type + '_1.png'" />
                        <img class="w-10 h-10 object-fill" v-else
                        :src="'/builder/sprites/abilitytree/' + getConnectorFor(j, i)!.type + '.svg'" />
                    </div>
                    
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>


<script lang="ts">

import { Ref, ref, watchEffect } from 'vue';
import { AbilityNode, AbilityNodeConnector, makeTree } from '../../model/abilitytree'

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
        const hasNode = (x: number, y: number): boolean => getNodeFor(x,y) !== undefined;

        const getConnectorFor = (x: number, y: number): AbilityNodeConnector | undefined => props.connectors?.filter(a => a.x === x && a.y === y)[0]
        const hasConnector = (x: number, y: number): boolean => getConnectorFor(x,y) !== undefined;

        const getDepth = (): number => Math.max(...props.tree!.map(x => x.coordinates.y))

        const toggleNode = (abilityNode: AbilityNode) => {
            if(selectedNodes.value.some(x => x.id === abilityNode.id)) {
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

        watchEffect(() => {
            abilityTree.value=props.tree;
        })

        return {
            abilityTree, getDepth, getNodeFor, toggleNode,getConnectorFor,hasNode,hasConnector,activeConnectors,selectedNodes
        }
    },
    components: {}
}
</script>