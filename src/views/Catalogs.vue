<script setup>
import MpBreadcrumb from '@/components/UI/MpBreadcrumb.vue'

const breadcrumbItems = [
  {
    icon: 'pi pi-book',
    label: 'Catálogos'
  }
]
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <div class="flex justify-center mt-10 font-extrabold text-2xl">
    <h1>Catalogs</h1>
  </div>
</template>

<style scoped>

</style>
