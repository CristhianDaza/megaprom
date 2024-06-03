<script setup>
import { defineAsyncComponent } from 'vue'
import { useHead } from '@unhead/vue'

const MpAdminCatalogs = defineAsyncComponent(/* webpackChunkName: "mpAdminCatalogs" */() => import('@/components/admin/MpAdminCatalogs.vue'))
const MpAdminCarousel = defineAsyncComponent(/* webpackChunkName: "mpAdminCarousel" */() => import('@/components/admin/MpAdminCarousel.vue'))
const MpAdminMenu = defineAsyncComponent(/* webpackChunkName: "mpAdminMenu" */() => import('@/components/admin/MpAdminMenu.vue'))

useHead({
  title: 'Admin | Megapromocionales',
});
</script>

<template>
  <ConfirmDialog />
  <div class="container mx-auto lg:py-5">
    <TabView>
      <TabPanel header="Menú">
        <MpAdminMenu />
      </TabPanel>
      <TabPanel header="Carrusel de Imágenes">
        <MpAdminCarousel />
      </TabPanel>
      <TabPanel header="Catálogos">
        <MpAdminCatalogs />
      </TabPanel>
      <TabPanel header="Números" :disabled="true">
      </TabPanel>
    </TabView>
  </div>
</template>

<style scoped>

</style>
