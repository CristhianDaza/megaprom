<script setup>
import TvButton from "@todovue/tvbutton";
import { ref, watch } from 'vue'
import { useUserStore } from '@/store/user.js'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/store/products.js'

const userStore = useUserStore()
const router = useRouter()
const products = useProductsStore()

const emit = defineEmits({ manageModal: null })

const props = defineProps({
  visible: Boolean
})

const isVisible = ref(props.visible)
const user = ref({})

const login = async () => {
  await userStore.login(user.value)
  if (userStore.isLogged) {
    await products.initProducts(false)
    await router.push({ name: 'admin' })
  }
  valueModal(false)
}

const valueModal = (value) => {
  emit('manageModal', value)
}

watch(() => props.visible, (value) => {
  isVisible.value = value
})
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="isVisible" modal header="Inicia Sesión" :style="{ width: '25rem' }" @after-hide="() => { valueModal(false) }">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/logo%20mega.png?alt=media&token=c249f623-ecb7-4b86-aaf8-5ab4753da614"
        class="h-44 w-full object-contain p-3"
        alt="Megapromocionales Logo"
      />
      <div class="flex items-center gap-3 mb-3">
        <label for="username" class="font-semibold w-[6rem]">Usuario</label>
        <InputText v-model="user.name" id="username" class="flex-auto"/>
      </div>
      <div class="flex items-center gap-3 mb-5">
        <label for="password" class="font-semibold w-[6rem]">Contraseña</label>
        <Password v-model="user.password" toggleMask :feedback="false" class="flex-auto" />
      </div>
      <div class="flex justify-end gap-2">
        <tv-button rounded small @click="() => { valueModal(false) }">Cancelar</tv-button>
        <tv-button rounded success small @click="login">Iniciar Sesión</tv-button>
      </div>
    </Dialog>
  </div>
</template>
