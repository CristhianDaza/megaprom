<script setup>
import { ref, watch, computed } from 'vue'
import { useCatalogsStore } from '@/store/catalogs.js'
import { cloneDeep } from 'lodash'

const catalogsStore = useCatalogsStore()

const emit = defineEmits({ manageModal: null })
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true
  },
  configModal: {
    type: Object,
    default: () => ({
      header: 'Modal',
      description: '',
      acceptButton: '',
      cancelButton: '',
      data: null,
      type: ''
    })
  }
})

const isVisible = ref(props.visible)
const uploadModal = ref({
  image: null,
  title: '',
  link: ''
})
const previewImage = ref(null)
const image = ref(null)

const valueModal = (value) => {
  emit('manageModal', value)
  if (!value && props.configModal.action === 'edit') {
    uploadModal.value = cloneDeep(props.configModal.data)
  } else {
    uploadModal.value = {
      image: null,
      title: '',
      link: ''
    }
  }
}

const onFileSelect = (event) => {
  uploadModal.value.image = event.files[0]
  previewImage.value = event.files[0].objectURL
}

const acceptButton = () => {
  if (props.configModal.type === 'catalog') {
    if (props.configModal.action === 'edit') {
      catalogsStore.editCatalog(uploadModal.value)
    } else {
      catalogsStore.addCatalog(uploadModal.value)
    }
  }
  isVisible.value = false;
}

watch(() => props.visible, (value) => {
  isVisible.value = value

  if (props.configModal.data) {
    uploadModal.value = cloneDeep(props.configModal.data)
    previewImage.value = props.configModal.data.image
  } else {
    uploadModal.value = {
      image: null,
      title: '',
      link: ''
    }
  }
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
    <template v-if="uploadModal.image">
      <img
        class="py-2"
        :src="previewImage"
        :alt="uploadModal?.title"
      >
    </template>
    <div class="flex align-items-center gap-3 my-3">
      <label for="title" class="font-semibold w-6rem">Titulo</label>
      <InputText id="title" class="flex-auto" autocomplete="off" v-model="uploadModal.title"/>
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="link" class="font-semibold w-6rem">Url</label>
      <InputText id="link" class="flex-auto" autocomplete="off" v-model="uploadModal.link"/>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        :label="configModal?.cancelButton"
        severity="secondary"
        @click="isVisible = false"
      />
      <Button
        type="button"
        :label="configModal?.acceptButton"
        @click="acceptButton"
        :disabled="isInvalid"
      />
    </div>
  </Dialog>
</template>

<style scoped>

</style>
