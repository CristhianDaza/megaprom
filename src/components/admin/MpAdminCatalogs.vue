<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useCatalogsStore} from '@/store/catalogs.js'

const MpAdminModal = defineAsyncComponent(/* webpackChunkName: "mpAdminModal" */() => import('@/components/admin/MpAdminModal.vue'))

const catalogsStore = useCatalogsStore()
const confirm = useConfirm()
const toast = useToast()

const openModal = ref(false)

const manageValueModal = (value) => {
  openModal.value = value
}

const configModal = ref({})

const manageCatalog = (action, type, data = null) => {
  if (action === 'add') {
    configModal.value = {
      header: 'Agregar catálogo',
      description: 'Completa los campos para agregar un nuevo catálogo.',
      acceptButton: 'Agregar',
      cancelButton: 'Cancelar',
      type,
      action,
      data
    }
  }

  if (action === 'edit') {
    configModal.value = {
      header: 'Editar catálogo',
      description: 'Completa los campos para editar el catálogo.',
      acceptButton: 'Editar',
      cancelButton: 'Cancelar',
      type,
      action,
      data
    }
  }
  openModal.value = true
}

const confirmDelete = (id, image) => {
  confirm.require({
    message: '¿Quieres eliminar este catálogo?',
    header: 'Confirmar',
    icon: 'pi pi-info-circle mr-2',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Eliminar',
    rejectClass: 'transparent',
    acceptClass: 'bg-danger text-white',
    accept: () => {
      toast.add({ severity: 'info', summary: 'Eliminado', detail: 'El catálogo ha sido eliminado.', life: 3000 });
      catalogsStore.deleteCatalog(id, image)
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Se ha cancelado la operación.', life: 3000 });
    }
  });
};

onMounted(() => {
  catalogsStore.getCatalogs()
})
</script>

<template>
  <MpAdminModal
    :visible="openModal"
    :configModal="configModal"
    @manageModal="manageValueModal"
  />
  <ConfirmDialog />
  <div v-if="catalogsStore.isLoading" class="container mx-auto grid gap-4 mt-1">
    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
      <span class="text-xl text-900 font-bold">Catálogos</span>
    </div>
    <template v-for="loader in 12">
      <Skeleton height="2rem" class="mb-2">{{loader}}</Skeleton>
    </template>
  </div>
  <template v-else>
    <DataTable :value="catalogsStore.catalogs" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Catálogos</span>
          <Button
            icon="pi pi-refresh"
            rounded
            raised
            v-tooltip.top="`Actualizar catálogos`"
            @click="catalogsStore.getCatalogs(true)"
            :disabled="catalogsStore.catalogs.length === 0"
          />
          <Button
            icon="pi pi-plus"
            rounded
            raised
            v-tooltip.top="`Agregar catálogo`"
            severity="info"
            @click="manageCatalog('add', 'catalog')"
          />
        </div>
      </template>
      <Column field="title" header="Nombre"></Column>
      <Column header="Imagen">
        <template #body="slotProps">
          <img
            :src="slotProps.data.image"
            :alt="slotProps.data.title"
            class="w-6rem border-round w-20"
          />
        </template>
      </Column>
      <Column header="Link">
        <template #body="slotProps">
          <a :href="slotProps.data.link" target="_blank" class="text-blue-500 hover:text-blue-700">
            {{ slotProps.data.link }} <span class="pi pi-external-link"></span>
          </a>
        </template>
      </Column>
      <Column header="Acción">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success p-button-outlined"
              v-tooltip.top="`Editar catálogo`"
              severity="info" rounded outlined
              aria-label="Editar catálogo"
              @click="manageCatalog('edit', 'catalog', slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger p-button-outlined"
              v-tooltip.top="`Eliminar catálogo`"
              severity="danger" text rounded
              aria-label="Eliminar catálogo"
              @click="confirmDelete(slotProps.data.id, slotProps.data.image)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </template>
</template>

<style scoped>

</style>
