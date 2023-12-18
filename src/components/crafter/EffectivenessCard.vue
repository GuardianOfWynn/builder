<template>
    <div class="p-2 w-full h-full border-[1px] font-minecraft rounded-md  border-purple-600">
        <p class="text-center text-mc-gray text-xs">{{(ingredient === null || ingredient === undefined) ? "No ingredient" : ingredient.name}}</p>
        <p class="text-center" :class="[effectiveness.value <= 0 ? 'text-mc-red' : 'text-mc-lime']">
            {{effectiveness}}%
        </p>
    </div>
</template>
  
<script>
  export default {
      name: 'EffectivenessCard',
      props: {
          effectiveness: Object,
          ingredient: Object
      },
      components: { }
  }
  </script>
  