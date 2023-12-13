<script setup>
import Crafter from './components/crafter/Crafter.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <div class="min-h-screen bg-mc-bg">
      <Crafter/>
      <p class="text-center -z-1 fixed left-0 right-0 pb-2 bottom-0 text-mc-dark-gray font-minecraft">Made with &#9829; by victuwu #GswOnTop</p>
    </div>
    </template>
    <template #fallback>
        <p>Loading...</p>
    </template>
  </Suspense>
</template>