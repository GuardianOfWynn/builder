<template>
    <div class="flex relative font-minecraft bg-mc-bg min-h-full">
        <div class="fixed z-20">
            <AppsSidebar />
        </div>
        <div class="ml-24 md:p-8 p-4 w-full">
            <div class="flex flex-row justify-between mb-8">
                <p class="text-3xl text-mc-light-purple">GsWBuilder - Workspace</p>
                <a class="flex p-2 rounded-md cursor-pointer py-3 gap-x-2" href="https://discord.gg/Nt2rPRHxyX"
                    target="_blank">
                    <img src="/discord.png" class="w-10 object-contain" />
                    <p class="my-auto text-xs text-mc-blue">Join our discord</p>
                </a>
            </div>

            <div>
                <div v-for="collection in workspace.collections">
                    <Disclosure>
                        <DisclosureButton>
                            {{ collection.name }}
                        </DisclosureButton>
                        <DisclosurePanel class="text-gray-500">
                            <div v-for="element in collection.elements">
                                {{ element.name }}
                            </div>
                        </DisclosurePanel>
                    </Disclosure>
                </div>
            </div>
    
        </div>
    </div>
</template>

<script lang="ts">
import { Ref, ref } from "vue";
import AppsSidebar from "../AppsSidebar.vue";
import {Workspace} from '../../model/workspace/collection'
import {getWorkspace} from '../../model/workspace/workspace_io'
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

export default {
    name: 'Worspace',
    props: {
    },
    setup() {

        const workspace: Ref<Workspace> = ref(getWorkspace());

        return {workspace}
    },
    components: { AppsSidebar, Disclosure, DisclosureButton, DisclosurePanel }
}
</script>