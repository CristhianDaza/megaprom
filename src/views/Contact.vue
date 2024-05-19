<script setup>
import { defineAsyncComponent } from 'vue'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))

const breadcrumbItems = [
  {
    icon: 'pi pi-envelope',
    label: 'Contacto'
  }
]
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <div class="flex justify-center mt-10 font-extrabold text-2xl">
    <h1>Contact</h1>
  </div>
</template>

<style scoped>

</style>
