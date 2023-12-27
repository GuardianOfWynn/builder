<template>
    <div class="min-h-screen font-minecraft w-20 hover:w-40 bg-gray-900 border-r-mc-light-purple border-[1px] border-l-0 border-b-0 border-t-0" @mouseenter="hovered = true" @mouseleave="hovered = false">
        <p class="text-white text-center mb-4 mt-4">Apps</p>
        <div :class="[hovered ? 'justify-normal' : 'justify-center']" class="flex p-2 cursor-pointer hover:bg-mc-dark-purple" @click="router.push({
            path: '/crafter#/',
        })">
            <div class="w-8 h-8 bg-professions-dec bg-crafter"></div>
            <p v-show="hovered" class="text-white my-auto text-xs ml-2">Crafter</p>
        </div>
        <div :class="[hovered ? 'justify-normal' : 'justify-center']" class="flex p-2 cursor-pointer hover:bg-mc-dark-aqua">
            <div class="w-8 h-8 bg-professions-dec bg-builder"></div>
            <p v-show="hovered" class="text-white my-auto text-xs ml-2">Builder</p>
        </div>
        <div :class="[hovered ? 'justify-normal' : 'justify-center']" class="flex p-2 cursor-pointer hover:bg-mc-gold">
            <div class="w-8 h-8 bg-professions-dec bg-workspace"></div>
            <p v-show="hovered" class="text-white my-auto text-xs ml-2">My Workspace</p>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref, watchEffect } from "vue";
import Ingredient from "../model/ingredient";
import { useRouter } from 'vue-router'
  
  export default {
      name: 'AppsSideBar',
      props: {
      },
      setup(props) {
        const router = useRouter()
        const hovered = ref(false);

        return {hovered, router}
      },
      components: { }
  }
  </script>
  