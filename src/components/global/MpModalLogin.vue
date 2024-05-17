<script setup>
import { defineProps, ref, watch, defineEmits } from 'vue'

const emit = defineEmits({ manageModal: null })

const props = defineProps({
  visible: Boolean
})

const isVisible = ref(props.visible)

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
        src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logoWeb.webp?alt=media&token=72bc41b4-57ed-4b55-b92f-0df6c335e685"
        class="h-36 w-full object-contain p-3"
        alt="Megapromocionales Logo"
      />
      <div class="flex items-center gap-3 mb-3">
        <label for="username" class="font-semibold w-[6rem]">Usuario</label>
        <InputText id="username" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-3 mb-5">
        <label for="password" class="font-semibold w-[6rem]">Contraseña</label>
        <InputText id="password" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="() => { valueModal(false) }"></Button>
        <Button type="button" label="Iniciar Sesión" @click="() => { valueModal(false) }"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>

</style>
