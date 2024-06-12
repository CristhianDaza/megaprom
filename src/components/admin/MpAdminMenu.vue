<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useMenuStore } from '@/store/menu.js'

const MpAdminModal = defineAsyncComponent(/* webpackChunkName: "mpAdminModal" */() => import('@/components/admin/MpAdminModal.vue'))

const menuStore = useMenuStore()
const confirm = useConfirm()
const toast = useToast()

const openModalMenu = ref(false)

const manageValueModal = (value) => {
  openModalMenu.value = value
}

const configModal = ref({})

const manageModalMenu = (action, type, data = null) => {
  console.log({ action, type, data })
  if (action === 'add') {
    configModal.value = {
      header: 'Agregar menú',
      description: 'Completa los campos para agregar un nuevo menú.',
      acceptButton: 'Agregar',
      cancelButton: 'Cancelar',
      type,
      action,
      data
    }
  }

  if (action === 'edit') {
    configModal.value = {
      header: 'Editar menú',
      description: 'Completa los campos para editar el menú seleccionado.',
      acceptButton: 'Editar',
      cancelButton: 'Cancelar',
      type,
      action,
      data
    }
  }
  openModalMenu.value = true
}

const confirmDeleteMenu = (id) => {
  confirm.require({
    message: '¿Quieres eliminar este menú?',
    header: 'Confirmar',
    icon: 'pi pi-info-circle mr-2',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Eliminar',
    rejectClass: 'transparent',
    acceptClass: 'bg-danger text-white',
    accept: () => {
      toast.add({ severity: 'info', summary: 'Eliminado', detail: 'La menú ha sido eliminado.', life: 3000 })
      menuStore.deleteMenu(id)
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Se ha cancelado la operación.', life: 3000 })
    }
  })
}

onMounted(() => {
  menuStore.getMenu()
})
</script>

<template>
  <MpAdminModal
    :visible="openModalMenu"
    :configModal="configModal"
    @manageModal="manageValueModal"
  />
  <div v-if="menuStore.isLoading" class="container mx-auto grid gap-4 mt-1">
    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
      <span class="text-xl text-900 font-bold">Menú</span>
    </div>
    <template v-for="loader in 12">
      <Skeleton height="2rem" class="mb-2">{{loader}}</Skeleton>
    </template>
  </div>
  <template v-else>
    <DataTable :value="menuStore.menu" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Menú</span>
          <Button
            icon="pi pi-refresh"
            rounded
            raised
            v-tooltip.top="`Actualizar menú`"
            @click="menuStore.getMenu(true)"
            :disabled="menuStore.menu.length === 0"
          />
          <Button
            icon="pi pi-plus"
            rounded
            raised
            v-tooltip.top="`Agregar menú`"
            severity="info"
            @click="manageModalMenu('add', 'menu')"
          />
        </div>
      </template>
      <Column field="title" header="Titulo"></Column>
      <Column field="name" header="Nombre"></Column>
      <Column field="link" header="Link">
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
      <Column field="order" header="Orden"></Column>
      <Column field="isVisible" header="Visible">
        <template #body="slotProps">
          <span v-if="slotProps.data.isVisible" class="text-green-500">Si</span>
          <span v-else class="text-red-500">No</span>
        </template>
      </Column>
      <Column header="Acción">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success p-button-outlined"
              v-tooltip.top="`Editar menú`"
              severity="info" rounded outlined
              aria-label="Editar menú"
              @click="manageModalMenu('edit', 'menu', slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger p-button-outlined"
              v-tooltip.top="`Eliminar menú`"
              severity="danger" text rounded
              aria-label="`Eliminar menú"
              @click="confirmDeleteMenu(slotProps.data.id)"
              :disabled="slotProps.data.readOnly"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </template>
</template>

<style scoped>

</style>
