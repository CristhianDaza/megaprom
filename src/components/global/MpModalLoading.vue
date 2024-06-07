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
      :style="{ width: '30rem' }"
      class="rounded-lg shadow-lg"
    >
      <div class="flex flex-col items-center p-6 space-y-6">
        <h3 class="font-bold text-2xl text-center text-gray-700 dark:text-gray-300">
          No cerrar esta ventana
        </h3>
        <Divider />
        <div class="flex items-center gap-4 w-full justify-between">
          <p class="font-semibold text-gray-600 dark:text-gray-300">Actualizando API MP:</p>
          <div class="flex items-center">
            <ProgressSpinner
              v-if="products.isLoadingMp"
              style="width: 25px; height: 25px"
              strokeWidth="8"
              class="fill-current text-blue-500 dark:text-blue-400"
              animationDuration=".5s"
              aria-label="Cargando productos..."
            />
            <i v-else class="pi pi-check text-green-500 text-xl"></i>
          </div>
        </div>
        <div class="flex items-center gap-4 w-full justify-between">
          <p class="font-semibold text-gray-600 dark:text-gray-300">Actualizando API Promos:</p>
          <div class="flex items-center">
            <ProgressSpinner
              v-if="products.isLoadingPromos"
              style="width: 25px; height: 25px"
              strokeWidth="8"
              class="fill-current text-blue-500 dark:text-blue-400"
              animationDuration=".5s"
              aria-label="Cargando productos..."
            />
            <i v-else class="pi pi-check text-green-500 text-xl"></i>
          </div>
        </div>
        <div v-if="products.isUpdatedFirebase" class="flex items-center gap-4 w-full justify-between">
          <p class="font-semibold text-gray-600 dark:text-gray-300">Actualizando Base de Datos:</p>
          <div class="flex items-center">
            <ProgressSpinner
              v-if="products.isLoadingFirebase"
              style="width: 25px; height: 25px"
              strokeWidth="8"
              class="fill-current text-blue-500 dark:text-blue-400"
              animationDuration=".5s"
              aria-label="Cargando productos..."
            />
            <i v-else class="pi pi-check text-green-500 text-xl"></i>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.card {
  background: #f9fafb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
}

.dark .card {
  background: #1f2937;
}

Dialog {
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
}

Divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 1rem 0;
}

.dark Divider {
  background-color: #374151;
}
</style>
