<script setup>
import { useProductsStore } from '@/store/products.js'

const products = useProductsStore()
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="products.isLoadingAllProducts"
      modal
      header="Actualizando base de datos"
      :style="{ width: '25rem' }"
    >
      <div class="flex flex-col">
        <h3 class=" font-bold text-2xl">No cerrar esta ventana</h3>
        <Divider />
        <div class="flex items-center gap-3 mb-3">
          <p class="font-semibold w-[12rem]">Actualizando api mp:</p>
          <ProgressSpinner
            style="width: 25px; height: 25px"
            strokeWidth="8"
            class="fill-surface-0 dark:fill-surface-800"
            animationDuration=".5s"
            aria-label="Cargando productos..."
            v-if="products.isLoadingMp"
          />
          <i v-else class="pi pi-check text-green-500"></i>
        </div>
        <div class="flex items-center gap-3 mb-5">
          <p class="font-semibold w-[13rem]">Actualizando api promos:</p>
          <ProgressSpinner
            style="width: 25px; height: 25px"
            strokeWidth="8"
            class="fill-surface-0 dark:fill-surface-800"
            animationDuration=".5s"
            aria-label="Cargando productos..."
            v-if="products.isLoadingPromos"
          />
          <i v-else class="pi pi-check text-green-500"></i>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>

</style>
