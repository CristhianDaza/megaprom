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
  <Menubar :model="menu ? menu : []" breakpoint="956px" class="rounded-none">
    <template #start>
      <RouterLink :to="{ name: 'home' }">
        <img alt="Logo" class="size-7 md:size-10" src="https://megapromocionales.com.co/favicon.ico" />
      </RouterLink>
    </template>
    <template #item="{ item, props, root }">
      <RouterLink v-if="item.isVisible" :to="item.readOnly ? { name: item.name } : { path: item.link }">
        <div class="flex align-items-center" v-bind="props.action">
          <span>{{ item.title }}</span>
          <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" severity="info" />
        </div>
      </RouterLink>
    </template>
    <template #end>
      <div class="flex gap-5">
        <RouterLink
          :to="{ name: 'admin' }"
          v-if="userStore.isLogged"
        >
          <div class="p-menuitem-content rounded-md text-surface-500 dark:text-white/70 hover:bg-surface-50 dark:hover:bg-surface-800 transition-all duration-200">
            <div class="flex align-items-center p-menuitem-link relative sm:text-sm font-medium items-center py-2 px-3 my-1 sm:my-0 select-none cursor-pointer no-underline overflow-hidden">
              <span class="pi pi-code" />
              <span class="ml-2">Admin</span>
          </div>
          </div>
        </RouterLink>
        <MpThemeButton class="pl-10 hidden md:inline-flex" />
        <div class="w-full">
          <MpSearchFilter />
        </div>
      </div>
    </template>
  </Menubar>
</template>

<style scoped>

</style>
