<template>
    <div class="flex relative font-minecraft bg-mc-bg min-h-full">
        <div class="fixed z-20">
            <AppsSidebar />
        </div>
        <div class="ml-24 md:p-8 p-4 w-full">
            <div class="flex flex-row justify-between mb-8">
                <p class="text-3xl text-mc-light-purple">GsWBuilder</p>
                <a class="flex p-2 rounded-md cursor-pointer py-3 gap-x-2" href="https://discord.gg/Nt2rPRHxyX"
                    target="_blank">
                    <img src="/discord.png" class="w-10 object-contain" />
                    <p class="my-auto text-xs text-mc-blue">Join our discord</p>
                </a>
            </div>
            <div class="flex w-full gap-x-4">
                <div class="flex w-2/3 gap-x-12 justify-between">
                    <div class="flex flex-col gap-y-4">
                        <ItemSelector @update-item="val => helmet = val" :item-type="'helmet'" />
                        <ItemSelector @update-item="val => chestplate = val" :item-type="'chestplate'" />
                        <ItemSelector @update-item="val => leggings = val" :item-type="'leggings'" />
                        <ItemSelector @update-item="val => boots = val" :item-type="'boots'" />
                        <ItemSelector @update-item="val => handleWeaponChanged(val)" :item-type="'weapon'" />
                    </div>
                    <div class="flex flex-col gap-y-4">
                        <ItemSelector :item-type="'ring'" />
                        <ItemSelector :item-type="'ring'" />
                        <ItemSelector :item-type="'bracelet'" />
                        <ItemSelector :item-type="'necklace'" />
                    </div>
                </div>
                <div class="text-white h-fit w-1/3 border-[1px] border-mc-light-purple">
                    <p class="bg-mc-dark-purple p-2">Stats</p>
                </div>
            </div>
            <div class="mt-10 h-1/3">
                <AbilityTree :clazz="'Shaman/Skyseer'" :connectors="SHAMAN_CONNECTORS" :tree="SHAMAN_ABILITY_TREE"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Ref, ref } from "vue";
import { useRouter } from 'vue-router'
import AppsSidebar from "../AppsSidebar.vue";
import ItemSelector from "./ItemSelector.vue";
import { ARCHER_ABILITY_TREE, ASSASSIN_ABILITY_TREE, ASSASSIN_CONNECTORS,MAGE_CONNECTORS, ARCHER_CONNECTORS, AbilityNode, AbilityNodeConnector,SHAMAN_CONNECTORS, MAGE_ABILITY_TREE, SHAMAN_ABILITY_TREE, WARRIOR_ABILITY_TREE, WARRIOR_CONNECTORS } from "../../model/abilitytree";
import { WynnBaseItem } from "../../model/item";
import { ItemType, WynnClass } from "../../scripts/util";
import AbilityTree from "./AbilityTree.vue";

export default {
    name: 'Builder',
    props: {
    },
    setup() {

        const clazz: Ref<WynnClass | undefined> = ref(undefined);
        const abilityTree: Ref<AbilityNode[] | undefined> = ref(undefined);
        const treeConnectors: Ref<AbilityNodeConnector[] | undefined> = ref(undefined);

        const router = useRouter()

        const helmet = ref(null);
        const helmetPowders = ref("");

        const chestplate = ref(null);
        const chestplatePowders = ref("");

        const leggings = ref(null);
        const leggingsPowders = ref("");

        const boots = ref(null);
        const bootsPowders = ref("");

        const necklace = ref(null);
        const necklacePowders = ref("");

        const bracelet = ref(null);
        const braceletPowders = ref("");

        const ring1 = ref(null);
        const ring1Powders = ref("");

        const ring2 = ref(null);
        const ring2Powders = ref("");

        const weapon = ref(null);
        const weaponPowders = ref("");


        function handleWeaponChanged(weapon: WynnBaseItem) {
            switch(weapon.type) {
                case ItemType.BOW: 
                    abilityTree.value = ARCHER_ABILITY_TREE; 
                    treeConnectors.value = ARCHER_CONNECTORS;
                    clazz.value = WynnClass.ARCHER;
                    break;
                case ItemType.DAGGER: 
                    abilityTree.value = ASSASSIN_ABILITY_TREE;
                    treeConnectors.value = ASSASSIN_CONNECTORS;
                    clazz.value = WynnClass.ASSASSIN;
                    break;
                case ItemType.RELIK: 
                    abilityTree.value = SHAMAN_ABILITY_TREE;
                    treeConnectors.value = SHAMAN_CONNECTORS;
                    clazz.value = WynnClass.SHAMAN;
                    break;
                case ItemType.WAND: 
                    abilityTree.value = MAGE_ABILITY_TREE;
                    treeConnectors.value = MAGE_CONNECTORS;
                    clazz.value = WynnClass.MAGE;
                    break;
                case ItemType.SPEAR:
                    abilityTree.value = WARRIOR_ABILITY_TREE;
                    treeConnectors.value = WARRIOR_CONNECTORS;
                    clazz.value = WynnClass.WARRIOR;
                    break;
                default: 
                    abilityTree.value = undefined;
            }
        }


        function assemble() {

        }

        return { router, helmet, chestplate, leggings, boots, clazz, ring1, ring2, bracelet, necklace, weapon, MAGE_CONNECTORS,MAGE_ABILITY_TREE,SHAMAN_ABILITY_TREE,ARCHER_CONNECTORS,SHAMAN_CONNECTORS, WARRIOR_ABILITY_TREE, ARCHER_ABILITY_TREE,ASSASSIN_CONNECTORS,ASSASSIN_ABILITY_TREE, WARRIOR_CONNECTORS, abilityTree, treeConnectors, handleWeaponChanged}
    },
    components: { AppsSidebar, ItemSelector, AbilityTree, AbilityTree }
}
</script>