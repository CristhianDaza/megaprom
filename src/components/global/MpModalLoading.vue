<script setup>
import { onMounted, ref } from 'vue'
import { useProductsStore } from '@/store/products.js'

const products = useProductsStore()

const countdown = ref(60);
const progress = ref(0);
let timer;

const startCountdown = () => {
  countdown.value = 60
  progress.value = 0
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1
      progress.value = Math.floor(((60 - countdown.value) / 60) * 100);
    } else {
      clearInterval(timer)
    }
  }, 1000)
}

const updateProducts = async () => {
  products.updateAttempts()
  await products.initProducts(true)
  if (products.statusMp === 'success' && products.statusPromos === 'success') {
    products.resetAttempts()
  }
  if (products.attempts === 3) {
    setTimeout(() => {
      products.resetAttempts()
    }, 60000)
    startCountdown()
  }
}

onMounted(() => {
  clearInterval(timer);
})
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
            <i
              v-else
              class="pi text-xl"
              :class="'pi-' + (products.statusMp === 'success' ? 'check text-green-500' : 'times text-red-500')"
            ></i>
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
            <i
              v-else
              class="pi text-xl"
              :class="'pi-' + (products.statusPromos === 'success' ? 'check text-green-500' : 'times text-red-500')"
            ></i>
          </div>
        </div>
        <div v-if="products.isUpdatedFirebase" class="flex items-center gap-4 w-full justify-between">
          <Divider />
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
        <template v-if="products.statusMp === 'failed' || products.statusPromos === 'failed'">
          <Divider />
          <p v-if="products.attempts < 3" class="font-semibold text-red-500 dark:text-red-400">
            Hubo un error al actualizar la base de datos, por favor intenta de nuevo.
          </p>
          <Button
            label="Actualizar inventario nuevamente"
            class="mt-4 w-full"
            @click="updateProducts"
            severity="info"
            outlined
            v-if="products.attempts < 3"
          />
          <template v-else>
            <p class="font-semibold text-red-500 dark:text-red-400">
              <ProgressBar :value="progress" />
              <br>
              Se ha excedido el número de intentos, por favor intenta más tarde.
            </p>
          </template>
        </template>
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
