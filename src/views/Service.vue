<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <h1>Service {{ route.params.serviceId }}</h1>
  </div>
</template>

<style scoped>

</style>
