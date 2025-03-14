<script setup>
import  TvButton from '@todovue/tvbutton'

import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useCarouselStore } from '@/store/carousel.js'

const MpAdminModal = defineAsyncComponent(/* webpackChunkName: "mpAdminModal" */() => import('@/components/admin/MpAdminModal.vue'))

const carouselStore = useCarouselStore()
const confirm = useConfirm()
const toast = useToast()

const openModalCarousel = ref(false)

const manageValueModal = (value) => {
  openModalCarousel.value = value
}

const configModal = ref({})

const manageModalCarousel = (action, type, data = null) => {
  if (action === 'add') {
    configModal.value = {
      header: 'Agregar imagen en el carrusel',
      description: 'Completa los campos para agregar una nueva imagen en el carrusel.',
      acceptButton: 'Agregar',
      cancelButton: 'Cancelar',
      type,
      action,
      data,
      containImage: true
    }
  }

  if (action === 'edit') {
    configModal.value = {
      header: 'Editar imagen del carrusel',
      description: 'Completa los campos para editar la imagen del carrusel.',
      acceptButton: 'Editar',
      cancelButton: 'Cancelar',
      type,
      action,
      data,
      containImage: true
    }
  }
  openModalCarousel.value = true
}

const confirmDeleteCarousel = (id, image) => {
  confirm.require({
    message: '¿Quieres eliminar esta imagen del carrusel?',
    header: 'Confirmar',
    icon: 'pi pi-info-circle mr-2',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Eliminar',
    rejectClass: 'transparent',
    acceptClass: 'bg-danger text-white',
    accept: () => {
      toast.add({ severity: 'info', summary: 'Eliminado', detail: 'La imagen del carrusel ha sido eliminada.', life: 3000 })
      carouselStore.deleteCarousel(id, image)
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Se ha cancelado la operación.', life: 3000 })
    }
  })
}

onMounted(() => {
  carouselStore.getCarousel()
})
</script>

<template>
  <MpAdminModal
    :visible="openModalCarousel"
    :configModal="configModal"
    @manageModal="manageValueModal"
  />
  <div v-if="carouselStore.isLoading" class="container mx-auto grid gap-4 mt-1">
    <div v-for="loader in 12 " :key="loader">
      <Skeleton height="2rem" class="mb-2">{{loader}}</Skeleton>
    </div>
  </div>
  <template v-else>
    <DataTable :value="carouselStore.carousel" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap justify-end gap-2 mt-[-25px]">
          <div class="flex gap-2">
            <tv-button
              :disabled="carouselStore.carousel.length === 0"
              icon="update"
              success
              type="icon"
              v-tooltip.top="`Actualizar imágenes en el carrusel`"
              @click="carouselStore.getCarousel(true)"
            />
            <tv-button
              icon="plus"
              info
              type="icon"
              v-tooltip.top="`Agregar imagen en el carrusel`"
              @click="manageModalCarousel('add', 'carousel')"
            />
          </div>
        </div>
      </template>
      <Column field="title" header="Nombre"></Column>
      <Column header="Imagen">
        <template #body="slotProps">
          <img
            :src="slotProps.data.image"
            :alt="slotProps.data.title"
            class="w-6rem border-round w-[20rem]"
          />
        </template>
      </Column>
      <Column header="Link">
        <template #body="slotProps">
          <a
            v-if="slotProps.data.link"
            :href="slotProps.data.link"
            target="_blank"
            class="text-blue-500 hover:text-blue-700"
          >
            {{ slotProps.data.link }} <span class="pi pi-external-link"></span>
          </a>
        </template>
      </Column>
      <Column header="Acción">
        <template #body="slotProps">
          <div class="flex gap-2">
            <tv-button
              :disabled="carouselStore.carousel.length === 0"
              icon="edit"
              info
              type="icon"
              v-tooltip.top="`Editar imagen del carrusel`"
              @click="manageModalCarousel('edit', 'carousel', slotProps.data)"
            />
            <tv-button
              icon="remove"
              type="icon"
              v-tooltip.top="`Eliminar imagen del carrusel`"
              @click="confirmDeleteCarousel(slotProps.data.id, slotProps.data.image)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </template>
</template>
