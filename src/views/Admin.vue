<script setup>
import { defineAsyncComponent } from 'vue'
import { useHead } from '@unhead/vue'
import { useConfirm } from 'primevue/useconfirm'

import { useProductsStore } from '@/store/products.js'

import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user.js'

const MpAdminCatalogs = defineAsyncComponent(/* webpackChunkName: "mpAdminCatalogs" */() => import('@/components/admin/MpAdminCatalogs.vue'))
const MpAdminCarousel = defineAsyncComponent(/* webpackChunkName: "mpAdminCarousel" */() => import('@/components/admin/MpAdminCarousel.vue'))
const MpAdminMenu = defineAsyncComponent(/* webpackChunkName: "mpAdminMenu" */() => import('@/components/admin/MpAdminMenu.vue'))

useHead({
  title: 'Admin | Megapromocionales',
})

const userStore = useUserStore()
const router = useRouter()
const products = useProductsStore()
const confirm = useConfirm()

const logout = async () => {
  await userStore.logout()
  await router.push({name: 'home'})
}

const confirmUpdated = () => {
  confirm.require({
    message: '¿Quieres actualizar el inventario?',
    header: 'Confirmar',
    icon: 'pi pi-info-circle mr-2',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Actualizar',
    acceptClass: 'cancel-button',
    accept: async () => {
      await _updateProducts()
    },
    reject: () => {
      console.log('reject')
    }
  })
}

const _updateProducts = async () => {
  await products.initProducts(true)
}
</script>

<template>
  <ConfirmDialog />
  <div class="container mx-auto lg:py-5">
    <Button label="Cerrar sesión" class="mb-4 float-right" @click="logout" severity="danger" text />
    <Button
      label="Actualizar inventario"
      class="mb-4"
      @click="confirmUpdated"
      severity="info"
      outlined
      :disabled="products.attempts === 3"
      :loading="products.isLoadingAllProducts"
    />
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
    </TabView>
  </div>
</template>
