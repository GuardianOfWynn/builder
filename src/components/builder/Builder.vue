<template>
    <div class="flex font-minecraft bg-mc-bg min-h-screen">
        <div>
            <AppsSidebar />
        </div>
        <div class="md:p-8 p-4 w-full">
            <div class="flex flex-row justify-between mb-8">
                <p class="text-3xl text-mc-light-purple">GsWBuilder</p>
                <a class="flex p-2 rounded-md cursor-pointer py-3 gap-x-2" href="https://discord.gg/Nt2rPRHxyX"
                    target="_blank">
                    <img src="/discord.png" class="w-10 object-contain" />
                    <p class="my-auto text-xs text-mc-blue">Join our discord</p>
                </a>
            </div>
            <div class="flex w-full gap-x-4">
                <div class="flex w-1/2 justify-between">
                    <div class="flex flex-col gap-y-2">
                        <ItemSelector :item-type="'helmet'" />
                        <ItemSelector :item-type="'chestplate'" />
                        <ItemSelector :item-type="'leggings'" />
                        <ItemSelector :item-type="'boots'" />
                        <ItemSelector :item-type="'weapon'" />
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <ItemSelector :item-type="'ring'" />
                        <ItemSelector :item-type="'ring'" />
                        <ItemSelector :item-type="'bracelet'" />
                        <ItemSelector :item-type="'necklace'" />
                    </div>
                </div>
                <div class="text-white h-fit w-1/4 border-[1px] border-mc-light-purple">
                    <p class="bg-mc-dark-purple p-2">Base stats</p>
                </div>
                <div class="text-white h-fit w-1/4 border-[1px] border-mc-light-purple">
                    <p class="bg-mc-dark-purple p-2">Stats</p>
                    <div class="p-2">
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router'
import AppsSidebar from "../AppsSidebar.vue";
import ItemSelector from "./ItemSelector.vue";

export default {
    name: 'Builder',
    props: {
    },
    setup() {
        const router = useRouter()

        const helmet = ref(null);
        const chestplate = ref(null);
        const leggings = ref(null);
        const boots = ref(null);
        const necklace = ref(null);
        const bracelet = ref(null);
        const ring1 = ref(null);
        const ring2 = ref(null);


        function assemble() {
            
        }

        return { router }
    },
    components: { AppsSidebar, ItemSelector }
}
</script>