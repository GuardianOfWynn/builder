<template>
    <div class="border-purple-600 border-[1px] rounded-sm w-fit p-8">
        <div v-for="i in getDepth()" class="flex">
            <div v-for="j in 9">
                <div class="w-12 h-12">
                   
                    <img class="w-12 h-12" v-if="getNodeFor(j, i) !== undefined"
                        :src="'/builder/sprites/abilitytree/' + getNodeFor(j, i)!.sprite.activated" />
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">

import { AbilityNode, AbilityTree } from '../../model/abilitytree'

export default {
    name: 'AbilityTree',
    props: {
        tree: AbilityTree
    },
    setup(props) {
        const getNodeFor = (x: number, y: number): AbilityNode | undefined => props.tree!.tree.filter(a => a.coordinates.x === x && a.coordinates.y === y)[0];
        const getDepth = (): number => Math.max(...props.tree!.tree.map(x => x.coordinates.y))
        return {
            getDepth, getNodeFor
        }
    },
    components: {}
}
</script>