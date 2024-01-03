<template>
    <div class="">
        <div v-for="i in 9">
            {{ i }}
        </div>
    </div>
</template>


<script lang="ts">

import { AbilityTree } from '../../model/abilitytree'

export default {
    name: 'AbilityTree',
    props: {
        tree: AbilityTree
    },
    setup(props) {
        const getDepth() = (): number => {
            props.tree?.tree.map(x => x.)
        }
    },
    components: { }
}
</script>