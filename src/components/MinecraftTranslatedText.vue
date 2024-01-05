<template>
    <div class="flex">
    <p v-for="component in (parseStyleToComponents(text!) as MinecraftTextComponent[])" 
        :class="(component.style.isBold ? ' font-black ' : '') + 
            (component.style.isItalic ? ' italic ' : '') +
            (component.style.isUnderlined ? ' underline underline-offset-2 ' : '') +
            (component.style.isStrikedthrough ? ' line-through ' : '') + 
            'text-' + component.style.color">
        <pre class="font-minecraft">{{ component.text }}</pre>
    </p>
    </div>
</template>

<script lang="ts">

import { parseStyleToComponents, MinecraftTextComponent } from '../scripts/color_code_translator'

export default {
  name: 'ItemTypeIcon',
  props: {
    text: String,
  },
  setup(props) {
    return {parseStyleToComponents}
  },
  components: {}
}
</script>