<template>
    <div class="p-2 w-full h-full border-[1px] font-minecraft rounded-md  border-purple-600">
        <p class="text-center text-mc-gray text-xs">{{(ingredient === null || ingredient === undefined) ? "No ingredient" : ingredient.name}}</p>
        <p class="text-center" :class="[effectiveness <= 0 ? 'text-mc-red' : 'text-mc-lime']">
            {{effectiveness}}%
        </p>
    </div>
</template>
  
<script>
import { ref, watchEffect } from 'vue';
import { IngredientSlot } from '../../scripts/crafter';

  export default {
      name: 'EffectivenessCard',
      props: {
          slot: IngredientSlot,
      },
      setup(props) {
        const ingredient = ref(props.slot.ingredient);
        const effectiveness = ref(props.slot.effectiveness);
        watchEffect(() => {
            ingredient.value = props.slot.ingredient
            effectiveness.value = props.slot.effectiveness;
        });
        return { ingredient, effectiveness }
      },
      components: { }
  }
  </script>
  