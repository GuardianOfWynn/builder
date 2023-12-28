<template>
    <div class="flex font-minecraft">
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

            <div>
                <p class="text-white text-3xl">Coming soon!</p>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router'
import AppsSidebar from "../AppsSidebar.vue";

export default {
    name: 'Builder',
    props: {
    },
    setup() {
        const router = useRouter()
        const hovered = ref(false);

        return { hovered, router }
    },
    components: { AppsSidebar }
}
</script>