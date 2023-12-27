<script setup>
import Crafter from './components/crafter/Crafter.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <div class="min-h-screen bg-mc-bg">
      <Crafter/>
    </div>
    </template>
    <template #fallback>
        <p>Loading...</p>
    </template>
  </Suspense>
</template>