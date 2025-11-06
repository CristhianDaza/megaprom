<script setup>
import { TvButton } from "@todovue/tv-button";
import { defineAsyncComponent } from 'vue'
import { useHead } from '@unhead/vue'
import { useConfirm } from 'primevue/useconfirm'

import { useProductsStore } from '@/store/products.js'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

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
  await products.loadAttemptsFromFirebase()
  if (products.isLocked()) {
    const remaining = products.getRemainingLockTime()
    const minutes = Math.ceil(remaining / 60)
    const hours = Math.floor(remaining / 3600)

    let message
    if (hours > 0) {
      const mins = Math.ceil((remaining % 3600) / 60)
      message = `Debes esperar ${hours} hora${hours > 1 ? 's' : ''} y ${mins} minuto${mins > 1 ? 's' : ''} antes de poder actualizar nuevamente.`
    } else {
      message = `Debes esperar ${minutes} minuto${minutes > 1 ? 's' : ''} antes de poder actualizar nuevamente.`
    }

    toast.add({ severity: 'error', summary: 'Error llamando los servicios', detail: message, life: 5000 })
    return
  }

  await products.initProducts(true)
}
</script>

<template>
  <ConfirmDialog />
  <div class="container mx-auto lg:py-5">
    <div class="mb-4">
      <tv-button
        class="float-right"
        outlined
        rounded
        @click="logout"
      >Cerrar Sesión</tv-button>
  <!--      :loading="products.isLoadingAllProducts"-->
      <tv-button
        rounded
        info
        @click="confirmUpdated"
        :disabled="products.attempts === 3"
      >
        Actualizar Inventario
      </tv-button>
    </div>
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
