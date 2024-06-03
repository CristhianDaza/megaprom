<script setup>
import { defineAsyncComponent } from 'vue'

const MpSearchFilter = defineAsyncComponent(/* webpackChunkName: "mpSearchFilter" */ () => import('@/components/global/MpSearchFilter.vue'))
const MpThemeButton = defineAsyncComponent(/* webpackChunkName: "mpThemeButton" */() => import('@/components/global/MpThemeButton.vue'))

import { useUserStore } from '@/store/user.js'

const props = defineProps({
  menu: Object
})

const userStore = useUserStore()
</script>

<template>
  <Menubar :model="menu ? menu : []" breakpoint="956px" class="rounded-none bg-[#E7E7E7] px-4 py-2">
    <template #start>
      <RouterLink :to="{ name: 'home' }">
        <img alt="Logo" class="h-10" src="https://megapromocionales.com.co/favicon.ico" />
      </RouterLink>
    </template>
    <template #item="{ item, props }">
      <RouterLink v-if="item.isVisible" :to="item.readOnly ? { name: item.name } : { path: item.link }">
        <div class="flex align-items-center" v-bind="props.action">
          <span class="text-[#1D1D1B] dark:text-white/70 px-4">{{ item.title }}</span>
        </div>
      </RouterLink>
    </template>
    <template #end>
      <div class="flex items-center gap-5">
        <RouterLink :to="{ name: 'admin' }" v-if="userStore.isLogged">
          <div class="p-menuitem-content rounded-md text-[#1D1D1B] dark:text-white/70 hover:bg-surface-50 dark:hover:bg-surface-800 transition-all duration-200">
            <div class="flex align-items-center p-menuitem-link relative sm:text-sm font-medium items-center py-2 px-3 my-1 sm:my-0 select-none cursor-pointer no-underline overflow-hidden">
              <span class="pi pi-code" />
              <span class="ml-2">Admin</span>
            </div>
          </div>
        </RouterLink>
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
