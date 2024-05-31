<script setup>
import {defineAsyncComponent} from "vue";
import { useUserStore } from '@/store/user.js'

const MpThemeButton = defineAsyncComponent(/* webpackChunkName: "mpThemeButton" */() => import('@/components/global/MpThemeButton.vue'))

const version = import.meta.env.VITE_VERSION

const userStore = useUserStore()

const emit = defineEmits({ openModal: null })

const openModal = () => {
  emit('openModal', true)
}
</script>

<template>
  <footer>
    <div class="bg-white dark:bg-gray-900">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <RouterLink :to="{ name: 'home' }" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logoWeb.webp?alt=media&token=72bc41b4-57ed-4b55-b92f-0df6c335e685" class="h-24" alt="Megapromocionales Logo" />
          </RouterLink>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li
              v-if="!userStore.isLogged"
              class="hover:underline cursor-pointer ms-4 md:ms-6"
              @click="openModal"
            >
              Iniciar sesión
            </li>
            <li
              v-else
              class="hover:underline cursor-pointer ms-4 md:ms-6"
              @click="userStore.logout"
            >
              Cerrar sesión
            </li>
          </ul>
          <MpThemeButton class="inline-flex md:hidden" />
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ new Date().getFullYear() }} <RouterLink :to="{ name: 'home' }" class="hover:underline">Megapromocionales LTDA</RouterLink>. v{{ version }}
            </span>
          <div class="flex mt-4 sm:justify-center sm:mt-0">
            <a href="https://www.facebook.com/Mega-Promocionales-242144370051788/" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <i class="pi pi-facebook"></i>
              <span class="sr-only">Pagina de facebook</span>
            </a>
            <a  href="https://www.instagram.com/megapromocional/" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <i class="pi pi-instagram"></i>
              <span class="sr-only">Pagina de instagram</span>
            </a>
            <a href="mailto:megapromocional@gmail.com" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <i class="pi pi-comment"></i>
              <span class="sr-only">Correo electronico</span>
            </a>
            <a href="https://api.whatsapp.com/send?phone=573159274144&text=Hola%20quisiera%20informaci%c3%b3n&source=&data=&app_absent=" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <i class="pi pi-whatsapp"></i>
              <span class="sr-only">Whatsapp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="py-3 font-medium flex justify-center ">
      Design by
      <a href="https://co.linkedin.com/in/cristhiandaza" target="_blank">
        <strong class="px-1 text-emerald-600 hover:underline">
          Cristhian Daza
        </strong>
      </a>
      With 💙
    </div>
  </footer>
</template>

<style scoped>

</style>
