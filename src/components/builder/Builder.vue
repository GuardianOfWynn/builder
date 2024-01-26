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
            <div class="flex justify-between w-full gap-x-4">
                <div class="w-2/3 ">
                    <div class="flex gap-x-12">
                        <div class="flex flex-col gap-y-4">
                            <ItemSelector @update-item="val => { helmet = val; assemble(); }" :item-type="'helmet'" />
                            <ItemSelector @update-item="val => { chestplate = val; assemble(); }" :item-type="'chestplate'" />
                            <ItemSelector @update-item="val => { leggings = val; assemble(); }" :item-type="'leggings'" />
                            <ItemSelector @update-item="val => { boots = val; assemble(); }" :item-type="'boots'" />
                            <ItemSelector @update-item="val => handleWeaponChanged(val)" :item-type="'weapon'" />
                        </div>
                        <div class="flex flex-col gap-y-4">
                            <ItemSelector :item-type="'ring'" />
                            <ItemSelector :item-type="'ring'" />
                            <ItemSelector :item-type="'bracelet'" />
                            <ItemSelector :item-type="'necklace'" />
                        </div>
                    </div>
                    <div class="text-white flex w-full mt-12">
                        <div class=" flex gap-x-4">
                            <SkillPointAssign :element="'Earth'" :initial="0" />
                            <SkillPointAssign :element="'Thunder'" :initial="0" />
                            <SkillPointAssign :element="'Water'" :initial="0" />
                            <SkillPointAssign :element="'Fire'" :initial="0" />
                            <SkillPointAssign :element="'Air'" :initial="0" />
                        </div>
                    </div>
                </div>
                <div class="text-white h-fit w-1/3 border-[1px] border-mc-light-purple">
                    <p class="bg-mc-dark-purple p-2">Stats</p>
                    <div v-if="build !== undefined" class="p-2">
                        <p v-if="build.getRawDefences().air != 0" :class="[build.getRawDefences().air > 0 ? 'text-mc-lime' : 'text-mc-red']">
                            <span class="text-white">Air defence:</span> {{ build.getRawDefences().air > 0 ? '+' : '' }}{{ build.getRawDefences().air }}
                        </p>
                        <p v-if="build.getRawDefences().thunder != 0" :class="[build.getRawDefences().thunder > 0 ? 'text-mc-lime' : 'text-mc-red']">
                            <span class="text-white">Thunder defence:</span> {{ build.getRawDefences().thunder > 0 ? '+' : '' }}{{ build.getRawDefences().thunder }}
                        </p>
                        <p v-if="build.getRawDefences().water != 0" :class="[build.getRawDefences().water > 0 ? 'text-mc-lime' : 'text-mc-red']">
                            <span class="text-white">Water defence:</span> {{ build.getRawDefences().water > 0 ? '+' : '' }}{{ build.getRawDefences().water }}
                        </p>
                        <p v-if="build.getRawDefences().earth != 0" :class="[build.getRawDefences().earth > 0 ? 'text-mc-lime' : 'text-mc-red']">
                            <span class="text-white">Earth defence:</span> {{ build.getRawDefences().earth > 0 ? '+' : '' }}{{ build.getRawDefences().earth }}
                        </p>
                        <p v-if="build.getRawDefences().fire != 0" :class="[build.getRawDefences().fire > 0 ? 'text-mc-lime' : 'text-mc-red']">
                            <span class="text-white">Fire defence:</span> {{ build.getRawDefences().fire > 0 ? '+' : '' }}{{ build.getRawDefences().fire }}
                        </p>
                        <br/>

                        <div v-if="build.getDamages().length > 0">
                            <p v-for="stat in build.getDamages()">
                                {{ stat.identification.getTranslatedName() }}:
                                <span :class="[stat.value > 0 ? 'text-mc-lime' : 'text-mc-red']">
                                    {{ stat.value > 0 ? '+' : '' }}{{ format(stat.value, stat.identification.getId()) }}
                                </span>
                            </p>
                            <br/>
                        </div>

                        <div v-if="build.getRawDamages().length > 0">
                            <p v-for="stat in build.getRawDamages()">
                                {{ stat.identification.getTranslatedName() }}:
                                <span :class="[stat.value > 0 ? 'text-mc-lime' : 'text-mc-red']">
                                    {{ stat.value > 0 ? '+' : '' }}{{ format(stat.value, stat.identification.getId()) }}
                                </span>
                            </p>
                            <br/>
                        </div>

                        <div v-if="build.getBuildStats().length > 0">
                            <p v-for="stat in build.getBuildStats()">
                                {{ stat.identification.getTranslatedName() }}:
                                <span :class="[stat.value > 0 ? 'text-mc-lime' : 'text-mc-red']">
                                    {{ stat.value > 0 ? '+' : '' }}{{ format(stat.value, stat.identification.getId()) }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="mt-10 w-full h-1/3">
                <AbilityTree :clazz="clazz" :connectors="treeConnectors" :tree="baseTree" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Ref, ref } from "vue";
import { useRouter } from 'vue-router'
import AppsSidebar from "../AppsSidebar.vue";
import ItemSelector from "./ItemSelector.vue";
import { ARCHER_ABILITY_TREE, ASSASSIN_ABILITY_TREE, ASSASSIN_CONNECTORS, MAGE_CONNECTORS, ARCHER_CONNECTORS, AbilityNode, AbilityNodeConnector, SHAMAN_CONNECTORS, MAGE_ABILITY_TREE, SHAMAN_ABILITY_TREE, WARRIOR_ABILITY_TREE, WARRIOR_CONNECTORS, AbilityTree } from "../../model/abilitytree";
import { WynnBaseItem } from "../../model/item";
import { ItemType, WynnClass, format } from "../../scripts/util";
import AbilityTree from "./AbilityTree.vue";
import { Build } from "../../model/build";
import SkillPointAssign from "./SkillPointAssign.vue";

export default {
    name: 'Builder',
    props: {
    },
    setup() {

        const abilityTree: Ref<AbilityTree | undefined> = ref(undefined);

        const clazz: Ref<WynnClass | undefined> = ref(undefined);
        const baseTree: Ref<AbilityNode[] | undefined> = ref(undefined);
        const treeConnectors: Ref<AbilityNodeConnector[] | undefined> = ref(undefined);

        const router = useRouter()

        const helmet: Ref<WynnBaseItem | null> = ref(null);
        const helmetPowders = ref("");

        const chestplate: Ref<WynnBaseItem | null> = ref(null);
        const chestplatePowders = ref("");

        const leggings: Ref<WynnBaseItem | null> = ref(null);
        const leggingsPowders = ref("");

        const boots: Ref<WynnBaseItem | null> = ref(null);
        const bootsPowders = ref("");

        const necklace: Ref<WynnBaseItem | null> = ref(null);
        const necklacePowders = ref("");

        const bracelet: Ref<WynnBaseItem | null> = ref(null);
        const braceletPowders = ref("");

        const ring1: Ref<WynnBaseItem | null> = ref(null);
        const ring1Powders = ref("");

        const ring2: Ref<WynnBaseItem | null> = ref(null);
        const ring2Powders = ref("");

        const weapon: Ref<WynnBaseItem | null> = ref(null);
        const weaponPowders = ref("");

        const build: Ref<Build | undefined> = ref(undefined);


        function handleWeaponChanged(w: WynnBaseItem) {
            weapon.value = w;
            switch (w.type) {
                case ItemType.BOW:
                    baseTree.value = ARCHER_ABILITY_TREE;
                    treeConnectors.value = ARCHER_CONNECTORS;
                    clazz.value = WynnClass.ARCHER;
                    break;
                case ItemType.DAGGER:
                    baseTree.value = ASSASSIN_ABILITY_TREE;
                    treeConnectors.value = ASSASSIN_CONNECTORS;
                    clazz.value = WynnClass.ASSASSIN;
                    break;
                case ItemType.RELIK:
                    baseTree.value = SHAMAN_ABILITY_TREE;
                    treeConnectors.value = SHAMAN_CONNECTORS;
                    clazz.value = WynnClass.SHAMAN;
                    break;
                case ItemType.WAND:
                    baseTree.value = MAGE_ABILITY_TREE;
                    treeConnectors.value = MAGE_CONNECTORS;
                    clazz.value = WynnClass.MAGE;
                    break;
                case ItemType.SPEAR:
                    baseTree.value = WARRIOR_ABILITY_TREE;
                    treeConnectors.value = WARRIOR_CONNECTORS;
                    clazz.value = WynnClass.WARRIOR;
                    break;
                default:
                    abilityTree.value = undefined;
            }
            assemble();
        }


        function assemble() {
            build.value = new Build(
                abilityTree.value,
                weapon.value,
                helmet.value,
                chestplate.value,
                leggings.value,
                boots.value,
                ring1.value,
                ring2.value,
                bracelet.value,
                necklace.value
            );
        }

        return { router, helmet, build, chestplate, assemble, baseTree, leggings, boots, format, clazz, ring1, ring2, bracelet, necklace, weapon, abilityTree, treeConnectors, handleWeaponChanged }
    },
    components: { AppsSidebar, ItemSelector, AbilityTree, SkillPointAssign }
}
</script>