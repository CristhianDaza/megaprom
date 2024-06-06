<script setup>
import { defineAsyncComponent } from 'vue'

const MpSearchFilter = defineAsyncComponent(/* webpackChunkName: "mpSearchFilter" */ () => import('@/components/global/MpSearchFilter.vue'))
const MpThemeButton = defineAsyncComponent(/* webpackChunkName: "mpThemeButton" */() => import('@/components/global/MpThemeButton.vue'))

import { useUserStore } from '@/store/user.js'

const emit = defineEmits({ openModal: null })

const props = defineProps({
  menu: Object
})

const openModal = () => {
  emit('openModal', true)
}

const userStore = useUserStore()
</script>

<template>
  <Menubar :model="menu ? menu : []" breakpoint="640px" class="rounded-none bg-[#E7E7E7] px-4 py-2">
    <template #start>
      <RouterLink :to="{ name: 'home' }">
        <img alt="Logo" class="w-16 lg:w-8" src="https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/mega%203.png?alt=media&token=38b171d2-7ebe-431c-9d92-a772fd86e626" />
      </RouterLink>
    </template>
    <template #item="{ item, props }">
      <template  v-if="item.name === 'admin'">
        <RouterLink v-if="userStore.isLogged" :to="item.readOnly ? { name: item.name } : { path: item.link }" class="">
          <div class="flex align-items-center" v-bind="props.action">
            <span class="text-[#1D1D1B] dark:text-white/70">{{ item.title }}</span>
          </div>
        </RouterLink>
        <template v-else>
          <div
            class="p-menuitem-content rounded-md text-[#1D1D1B] dark:text-white/70 hover:bg-surface-50 dark:hover:bg-surface-800 transition-all duration-200"
            @click="openModal"
          >
            <div class="flex align-items-center p-menuitem-link relative sm:text-sm font-medium items-center py-2 px-3 my-1 sm:my-0 select-none cursor-pointer no-underline overflow-hidden">
              <span class="ml-2">Iniciar sesión</span>
            </div>
          </div>
        </template>
      </template>
      <RouterLink v-else-if="item.isVisible" :to="item.readOnly ? { name: item.name } : { path: item.link }" class="">
        <div class="flex align-items-center" v-bind="props.action">
          <span class="text-[#1D1D1B] dark:text-white/70">{{ item.title }}</span>
        </div>
      </RouterLink>
    </template>
    <template #end>
      <div class="flex items-center gap-5">
        <MpThemeButton class="hidden md:inline-flex" />
        <div class="relative">
          <MpSearchFilter />
        </div>
      </div>
    </template>
  </Menubar>
  <div class="flex">
    <div class="bg-[#0E2050] h-3 w-[55%]"></div>
    <div class="bg-[#5BC5F2] h-3 w-[15%]"></div>
    <div class="bg-[#FFCC00] h-3 w-[15%]"></div>
    <div class="bg-[#E6007D] h-3 w-[15%]"></div>
  </div>
</template>

<style scoped>

</style>
