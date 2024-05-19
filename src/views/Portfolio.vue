<script setup>
import { defineAsyncComponent } from 'vue'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))

const breadcrumbItems = [
  {
    icon: 'pi pi-shopping-cart',
    label: 'Catálogos',
    name: 'catalogs'
  },
  {
    icon: 'pi pi-shopping-cart',
    label: 'Portafolio'
  }
]
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <div class="flex justify-center mt-10 font-extrabold text-2xl">
    <h1>Portfolio</h1>
  </div>
</template>

<style scoped>

</style>
