<script setup>
import TvButton from "@todovue/tvbutton";
import { ref, watch, computed } from 'vue'
import { useCatalogsStore } from '@/store/catalogs.js'
import { useCarouselStore } from '@/store/carousel.js'
import { useMenuStore } from '@/store/menu.js'
import { cloneDeep } from 'lodash'

const catalogsStore = useCatalogsStore()
const carouselStore = useCarouselStore()
const menuStore = useMenuStore()

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
      type: '',
      containImage: false
    })
  }
})

const isVisible = ref(props.visible)
const uploadModal = ref({})
const previewImage = ref(null)
const image = ref(null)

const valueModal = (value) => {
  emit('manageModal', value)
  if (!value && props.configModal.action === 'edit') {
    uploadModal.value = cloneDeep(props.configModal.data)
  } else {
    uploadModal.value = {}
  }
}

const onFileSelect = (event) => {
  uploadModal.value.image = event.files[0]
  previewImage.value = event.files[0].objectURL
}

const actionsMap = {
  catalog: {
    edit: catalogsStore.editCatalog,
    add: catalogsStore.addCatalog
  },
  carousel: {
    edit: carouselStore.editImageCarousel,
    add: carouselStore.addImageCarousel
  },
  menu: {
    edit: menuStore.editMenu,
    add: menuStore.addMenu
  }
}

const acceptButton = () => {
  const type = props.configModal.type
  const action = props.configModal.action

  if (actionsMap[type] && actionsMap[type][action]) {
    actionsMap[type][action](uploadModal.value)
  }

  isVisible.value = false
}

const removeImage = () => {
  previewImage.value = null
}

watch(() => props.visible, (value) => {
  isVisible.value = value

  if (props.configModal.data) {
    uploadModal.value = cloneDeep(props.configModal.data)
    previewImage.value = props.configModal.data.image
  } else {
    uploadModal.value = {}
  }
})

const isInvalid = computed(() => {
  return (props.configModal.containImage ? !uploadModal.value.image : !uploadModal.value.name) ||
    !uploadModal.value.title ||
    !uploadModal.value.link
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
      v-if="configModal.containImage"
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
      @before-send="removeImage"
    ></FileUpload>
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
    <template v-if="configModal.type === 'menu'">
      <div class="flex align-items-center gap-3 mb-5">
        <label for="name" class="font-semibold w-6rem">Nombre</label>
        <InputText id="name" class="flex-auto" autocomplete="off" v-model="uploadModal.name"/>
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="order" class="font-semibold w-6rem">Orden</label>
        <InputText id="order" class="flex-auto" autocomplete="off" v-model="uploadModal.order"/>
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="visible" class="font-semibold w-6rem">Visible</label>
        <Checkbox v-model="uploadModal.isVisible" name="visible" :binary="true" />
      </div>
    </template>
    <div class="flex justify-content-end gap-2">
      <tv-button
        rounded
        @click="valueModal(false)"
      >
        {{ configModal?.cancelButton }}
      </tv-button>
      <tv-button
        rounded
        success
        :disabled="isInvalid"
        @click="acceptButton"
      >
        {{ configModal?.acceptButton }}
      </tv-button>
    </div>
  </Dialog>
</template>
