<template>
    <RadioGroup :modelValue="selectedTier"
        @update:modelValue="value => $emit('updade-tier', value)">
        <div class="flex gap-x-2">
            <RadioGroupOption as="template" v-for="t in tiers" :key="t" :value="t">
                <div @click="(x) => selectedTier = t" class="cursor-pointer border-[1px] text-sm py-1 px-2 rounded-md" :class="[t === selectedTier ? 'border-mc-aqua' : 'border-mc-dark-gray opacity-40']">
                    <span v-if="t==='Slow'">
                        <span class="text-mc-gold">[<span class="text-mc-yellow">SLOW</span>]</span>
                    </span>
                    <span v-else-if="t==='Normal'">
                        <span class="text-mc-gold">[<span class="text-mc-yellow">NORMAL</span>]</span>
                    </span>
                    <span v-else-if="t==='Fast'">
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
import { AttackSpeed, CraftedAttackSpeed, MaterialTier } from "../../scripts/util";
  
  export default {
    name: 'MaterialTierSelector',
    props: {
        tier: String
    },
    emits:['updade-tier'],
    setup(props, {emit}: any) {
        const tiers = ['Slow', 'Normal', 'Fast'];
        const selectedTier = ref(props.tier)
        watchEffect(() => selectedTier.value = props.tier);
        return { tiers, selectedTier, emit }
    },
    components: { RadioGroup, RadioGroupOption }
  }
  </script>
  