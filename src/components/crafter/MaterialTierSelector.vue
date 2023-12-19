<template>
    <RadioGroup :modelValue="selectedTier"
        @update:modelValue="value => $emit('updade-tier', value)">
        <div class="flex gap-x-2">
            <RadioGroupOption as="template" v-for="t in tiers" :key="t" :value="t">
                <div @click="(x) => selectedTier = t" class="cursor-pointer border-[1px] text-xs py-1 px-2 rounded-md" :class="[t === selectedTier ? 'border-mc-aqua' : 'border-mc-dark-gray']">
                    <span v-if="t===1">
                        <span class="text-mc-gold">[<span class="text-mc-yellow">✫<span class="text-mc-dark-gray">✫✫</span></span>]</span>
                    </span>
                    <span v-else-if="t===2">
                        <span class="text-mc-gold">[<span class="text-mc-yellow">✫✫<span class="text-mc-dark-gray">✫</span></span>]</span>
                    </span>
                    <span v-else-if="t===3">
                        <span class="text-mc-gold">[<span class="text-mc-yellow">✫✫✫</span>]</span>
                    </span>
                </div>
            </RadioGroupOption>
        </div>
    </RadioGroup>
</template>
  
<script lang="ts">
import { ref, watchEffect } from "vue";
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { MaterialTier } from "../../scripts/util";
  
  export default {
    name: 'MaterialTierSelector',
    props: {
        tier: Number
    },
    emits:['updade-tier'],
    setup(props, {emit}: any) {
        const tiers = [1,2,3];
        const selectedTier = ref(props.tier)
        return { tiers, selectedTier, emit }
    },
    components: { RadioGroup, RadioGroupOption }
  }
  </script>
  