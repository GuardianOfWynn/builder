<script setup>
import Crafter from './components/crafter/Crafter.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <div class="min-h-screen bg-mc-bg">
      <Crafter/>
      <div class="text-center pb-4 text-mc-dark-gray font-minecraft">
        <p>Made with &#9829; by victuwu #GswOnTop</p>
        <p>Please report any issue <a class="text-mc-aqua decoration-mc-aqua" target="_blank" href="https://github.com/GuardianOfWynn/builder/issues">here</a></p>
      </div>
    </div>
    </template>
    <template #fallback>
        <p>Loading...</p>
    </template>
  </Suspense>
</template>