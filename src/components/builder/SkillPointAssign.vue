<template>

    <div class="flex flex-col justify-center">
        <div class="flex gap-x-2 mx-auto">
            <div>
                <svg class="pixelated" fill="#FFFFFF" width="24px" height="24px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-minus-box-fill"><path d="M18,20H4V19H3V18H2V4H3V3H4V2H18V3H19V4H20V18H19V19H18ZM16,12V10H6V12Z" /></svg>
            </div>
            <p :class="'text-' + baseColor">{{ initial }}</p>
            <div>
                <svg class="pixelated" fill="#FFFFFF" width="24px" height="24px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-plus-box-fill"><path d="M18,20H4V19H3V18H2V4H3V3H4V2H18V3H19V4H20V18H19V19H18ZM12,16V12H16V10H12V6H10V10H6V12H10V16Z" /></svg>
            </div>
        </div>
        <div>
            <span class="text-white" v-if="element === 'Air'">&#10049; Agility</span>
            <span class="text-mc-dark-green" v-if="element === 'Earth'">&#10020; Strength</span>
            <span class="text-mc-red" v-if="element === 'Fire'">&#10041; Defence</span>
            <span class="text-mc-aqua" v-if="element === 'Water'">&#10045; Intelligence</span>
            <span class="text-mc-yellow" v-if="element === 'Thunder'">&#10022; Dexterity</span>
        </div>
    </div>

</template>

<script lang="ts">

import { Ref, mergeProps, onMounted, ref, watchEffect } from 'vue';
import { AbilityNode, AbilityTree, AbilityNodeConnector, ConnectorType, makeTree, BASE_ABILITY_POINTS } from '../../model/abilitytree'
import { Element, WynnClass } from '../../scripts/util';
import { ARCHETYPE_DATA, Archetype, CLASS_ARCHETYPES } from '../../model/archetype';

export default {
    name: 'SkillPointAssign',
    props: {
        initial: Number,
        element: String
    },
    setup(props) {

        const baseColor = ref("");
        const skill = ref("");

        switch (props.element as Element) {
            case Element.AIR:
                baseColor.value = "white";
                skill.value = "&#10049; Agility";
                break;
            case Element.THUNDER:
                baseColor.value = "mc-yellow";
                skill.value = "&#10022; Dexterity";
                break;
            case Element.WATER:
                baseColor.value = "mc-aqua";
                skill.value = "&#10045; Intelligence";
                break;
            case Element.EARTH:
                baseColor.value = "mc-dark-green";
                skill.value = "&#10020; Strength"
                break;
            default:
                baseColor.value = "mc-red";
                skill.value = "&#10041; Defence";
                break;

        }
        return {baseColor, skill}

    },
    components: {}
}
</script>