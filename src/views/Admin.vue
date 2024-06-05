<script setup>
import { defineAsyncComponent } from 'vue'
import { useHead } from '@unhead/vue'

import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user.js'

const MpAdminCatalogs = defineAsyncComponent(/* webpackChunkName: "mpAdminCatalogs" */() => import('@/components/admin/MpAdminCatalogs.vue'))
const MpAdminCarousel = defineAsyncComponent(/* webpackChunkName: "mpAdminCarousel" */() => import('@/components/admin/MpAdminCarousel.vue'))
const MpAdminMenu = defineAsyncComponent(/* webpackChunkName: "mpAdminMenu" */() => import('@/components/admin/MpAdminMenu.vue'))

useHead({
  title: 'Admin | Megapromocionales',
});

const userStore = useUserStore()
const router = useRouter()

const logout = async () => {
  await userStore.logout()
  await router.push({name: 'home'})
}
</script>

<template>
  <ConfirmDialog />
  <div class="container mx-auto lg:py-5">
    <Button label="Cerrar sesión" class="mb-4" @click="logout" severity="info"/>
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
