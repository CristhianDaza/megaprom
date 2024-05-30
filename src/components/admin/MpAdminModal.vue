<script setup>
import { ref, watch, computed } from 'vue'
import { useCatalogsStore } from '@/store/catalogs.js'

const catalogsStore = useCatalogsStore()

const emit = defineEmits({ manageModal: null })
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  configModal: {
    type: Object,
    default: () => ({
      header: 'Modal',
      width: '25rem',
    }),
  }
})

const isVisible = ref(props.visible)
const uploadModal = ref({
  image: null,
  title: '',
  link: ''
})
const image = ref(null)

const valueModal = (value) => {
  emit('manageModal', value)
  uploadModal.value = {
    image: null,
    title: '',
    link: ''
  }
}

const onFileSelect = (event) => {
  uploadModal.value.image = event.files[0]
}

const acceptButton = () => {
  if (!uploadModal.value.image) {
    return
  }
  catalogsStore.addCatalog(uploadModal.value);
  isVisible.value = false;
};

watch(() => props.visible, (value) => {
  isVisible.value = value
})

const isInvalid = computed(() => {
  return !uploadModal.value.image || !uploadModal.value.title || !uploadModal.value.link
})
</script>

<template>
  <Dialog
      v-model:visible="isVisible"
      modal
      :header="configModal.header"
      :style="{ width: '25rem' }"
      @after-hide="() => { valueModal(false) }"
  >
    <span class="p-text-secondary block mb-5">
      {{ configModal.description }}
    </span>
    <FileUpload
      name="demo[]"
      :multiple="false"
      accept="image/*"
      :maxFileSize="1000000"
      invalidFileSizeMessage="Tamaño de archivo excedido"
      invalidFileTypeMessage="Tipo de archivo no permitido"
      choose-label="Seleccionar imagen"
      v-model="image"
      mode="basic"
      chooseIcon="pi pi-trash"
      @select="onFileSelect"
    >
      <template #content>
        <p>Arrastra y suelta archivos aquí para subirlos.</p>
      </template>
    </FileUpload>
    <div class="flex align-items-center gap-3 my-3">
      <label for="title" class="font-semibold w-6rem">Titulo</label>
      <InputText id="title" class="flex-auto" autocomplete="off" v-model="uploadModal.title"/>
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="link" class="font-semibold w-6rem">Url</label>
      <InputText id="link" class="flex-auto" autocomplete="off" v-model="uploadModal.link"/>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Cancelar" severity="secondary" @click="isVisible = false"></Button>
      <Button type="button" label="Subir" @click="acceptButton" :disabled="isInvalid"></Button>
    </div>
  </Dialog>
</template>

<style scoped>

</style>
