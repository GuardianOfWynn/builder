<template>
    <RadioGroup :modelValue="selectedTier"
        @update:modelValue="value => $emit('updade-tier', value as CraftedAttackSpeed)">
        <div class="flex gap-x-2">
            <RadioGroupOption as="template" v-for="t in tiers" :key="t" :value="t">
                <div @click="(x) => selectedTier = t" class="cursor-pointer border-[1px] text-sm py-1 px-2 rounded-md" :class="[t === selectedTier ? 'border-mc-aqua' : 'border-mc-dark-gray opaci']">
                    <span v-if="t==='slow'">
                        <span class="text-mc-gold">[<span class="text-mc-yellow">SLOW</span>]</span>
                    </span>
                    <span v-else-if="t==='normal'">
                        <span class="text-mc-gold">[<span class="text-mc-yellow">NORMAL</span>]</span>
                    </span>
                    <span v-else-if="t==='fast'">
                        <span class="text-mc-gold">[<span class="text-mc-yellow">FAST</span>]</span>
                    </span>
                </div>
            </RadioGroupOption>
        </div>
    </RadioGroup>
</template>
  
<script lang="ts">
import { ref, watchEffect } from "vue";
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { CraftedAttackSpeed } from '../../scripts/util'
  
  export default {
    name: 'MaterialTierSelector',
    props: {
        tier: String
    },
    emits:['updade-tier'],
    setup(props, {emit}: any) {
        const tiers = ['slow', 'normal', 'fast'];
        const selectedTier = ref(props.tier)
        watchEffect(() => selectedTier.value = props.tier);
        return { tiers, selectedTier, emit }
    },
    components: { RadioGroup, RadioGroupOption }
  }
  </script>
  