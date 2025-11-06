<script setup>
import { TvButton } from "@todovue/tv-button";
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useProductsStore } from '@/store/products.js'

const products = useProductsStore()

const countdown = ref(60)
const progress = ref(0)
const totalWaitTime = ref(60)
let timer

const startCountdown = () => {
  if (timer) {
    clearInterval(timer)
  }

  const remaining = products.getRemainingLockTime()
  if (remaining > 0) {
    countdown.value = remaining
    totalWaitTime.value = remaining
    progress.value = 0

    timer = setInterval(() => {
      const newRemaining = products.getRemainingLockTime()
      if (newRemaining > 0) {
        countdown.value = newRemaining
        progress.value = Math.floor(((totalWaitTime.value - newRemaining) / totalWaitTime.value) * 100)
      } else {
        clearInterval(timer)
        countdown.value = 0
        progress.value = 100
        if (products.attempts >= 6) {
          products.resetAttempts()
        }
      }
    }, 1000)
  }
}

const formatTime = (seconds) => {
  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  } else {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }
}

const updateProducts = async () => {
  await products.loadAttemptsFromFirebase()

  if (products.isLocked()) {
    startCountdown()
    return
  }

  await products.updateAttempts()

  await products.initProducts(true)

  if (products.statusMp === 'success' && products.statusPromos === 'success') {
    await products.resetAttempts()
  } else {
    if (products.isLocked()) {
      startCountdown()
    }
  }
}

watch(() => products.lockUntil, (newVal) => {
  if (newVal && products.isLocked()) {
    startCountdown()
  }
})

onMounted(async () => {
  await products.loadAttemptsFromFirebase()
  if (products.isLocked()) {
    startCountdown()
  }
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
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
      <div class="flex flex-col items-center px-6 space-y-3">
        <h3 class="font-bold text-xl text-center text-gray-700 dark:text-gray-300 mb-3">
          No cerrar esta ventana
        </h3>
        <div class="flex items-center w-full justify-between">
          <p class="font-semibold text-gray-600 dark:text-gray-300">Actualizando API MP:</p>
          <div class="flex items-center">
            <ProgressSpinner
              v-if="products.isLoadingMp"
              style="width: 20px; height: 20px"
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
        <div class="flex items-center w-full justify-between">
          <p class="font-semibold text-gray-600 dark:text-gray-300">Actualizando API Promos:</p>
          <div class="flex items-center">
            <ProgressSpinner
              v-if="products.isLoadingPromos"
              style="width: 20px; height: 20px"
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
        <div v-if="products.isUpdatedFirebase" class="flex items-center w-full justify-between">
          <p class="font-semibold text-gray-600 dark:text-gray-300">Actualizando Base de Datos:</p>
          <div class="flex items-center">
            <ProgressSpinner
              v-if="products.isLoadingFirebase"
              style="width: 20px; height: 20px"
              strokeWidth="8"
              class="fill-current text-blue-500 dark:text-blue-400"
              animationDuration=".5s"
              aria-label="Cargando productos..."
            />
            <i
              v-else
              class="pi text-xl"
              :class="'pi-' + (products.statusFirebase === 'failed' ? 'times text-red-500' : 'check text-green-500')"
            ></i>
          </div>
        </div>
        <template v-if="products.statusMp === 'failed' || products.statusPromos === 'failed'">
          <template v-if="products.isLocked()">
            <p class="font-semibold text-red-500 dark:text-red-400 text-center">
              <ProgressBar :value="progress" />
              <br>
              <span v-if="products.attempts === 3">
                Se ha excedido el número de intentos. Debes esperar <strong>{{ formatTime(countdown) }}</strong> para volver a intentar.
              </span>
              <span v-else-if="products.attempts >= 6">
                Se ha excedido el número máximo de intentos. Debes esperar <strong>{{ formatTime(countdown) }}</strong> para volver a intentar.
              </span>
            </p>
          </template>

          <template v-else>
            <p class="font-semibold text-red-500 dark:text-red-400 pt-5">
              Hubo un error al actualizar la base de datos, por favor intenta de nuevo.
            </p>
            <tv-button
              rounded
              outlined
              info
              full
              @click="updateProducts"
            >Reintentar</tv-button>
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
</style>
