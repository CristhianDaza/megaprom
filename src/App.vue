<script setup>
import MpMainMenu from '@/components/global/MpMainMenu.vue'
</script>

<template>
  <MpMainMenu />
  <div class="dark:bg-dark-mp min-h-screen-60">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
