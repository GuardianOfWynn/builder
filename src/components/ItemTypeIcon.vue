<template>
    <div class="flex items-center justify-center h-24 w-24 p-2 rounded-md mx-auto">
        <div v-if="itemType === 'scroll'" class="pixelated inline-block w-16 h-16 bg-scroll bg-professions">
        </div>
        <div v-if="itemType === 'food'" class="pixelated inline-block w-16 h-16 bg-food bg-professions">
        </div>
        <div v-if="itemType === 'potion'" class="pixelated inline-block w-16 h-16 bg-potion bg-wynn-icons"></div>
        <div v-if="itemType === 'ring'" class="pixelated inline-block w-[53px] h-[53px] bg-ring bg-accessories">
        </div>
        <div v-if="itemType === 'spear'" class="">
          <img src="/sprites/spear.webp" alt="">
        </div>
        <div v-if="itemType === 'dagger'" class="">
          <img src="/sprites/dagger.webp" alt="">
        </div>
        <div v-if="itemType === 'relik'">
          <img src="/sprites/relik.webp" alt="">
        </div>
        <div v-if="itemType === 'bow'">
          <img src="/sprites/bow.webp" alt="">
        </div>
        <div v-if="itemType === 'wand'">
          <img src="/sprites/wand.webp" alt="">
        </div>
        <div v-if="itemType === 'bracelet'" class="pixelated inline-block w-[62px] h-[62px] bg-bracelet bg-accessories">
        </div>
        <div v-if="itemType === 'necklace'" class="pixelated inline-block w-[53px] h-[53px] bg-necklace bg-accessories">
        </div>
        <div v-if="itemType === 'helmet'" class="pixelated inline-block h-[62px] w-[62px] bg-helmet bg-armours">
        </div>
        <div v-if="itemType === 'chestplate'" class="pixelated inline-block h-[62px] w-[62px] bg-chestplate bg-armours">
        </div>
        <div v-if="itemType === 'leggings'" class="pixelated inline-block h-[62px] w-[62px] bg-leggings bg-armours">
        </div>
        <div v-if="itemType === 'boots'" class="pixelated inline-block h-[62px] w-[62px] bg-boots bg-armours">
        </div>
      </div>
</template>

<script lang="ts">

import {ref,watchEffect} from 'vue';

export default {
  name: 'ItemTypeIcon',
  props: {
    itemType: String,
  },
  setup(props) {

    const itemType = ref(props.itemType);

    watchEffect(() => {
        itemType.value = props.itemType;
    })

    return {itemType}
  },
  components: {}
}
</script>