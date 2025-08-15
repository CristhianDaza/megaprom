<script setup>
import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

const onLoginClick = (event) => {
  openModal()
  const el = event?.currentTarget
  if (el && typeof el.blur === 'function') {
    el.blur()
  }
}

const onMenuLinkClick = (event) => {
  const el = event?.currentTarget
  requestAnimationFrame(() => {
    if (el && typeof el.blur === 'function') el.blur()
    if (document?.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur()
    }
  })
}

const onMenuLinkKeyActivate = (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    // Evitar scroll al pulsar espacio
    if (event.key === ' ') event.preventDefault()
    onMenuLinkClick(event)
  }
}

const go = (to, event) => {
  onMenuLinkClick(event)
  router.push(to)
}

const userStore = useUserStore()
</script>

<template>
  <Menubar :model="menu ? menu : []" breakpoint="640px" class="rounded-none bg-white-mp px-4 py-2 w-full justify-evenly">
    <template #start>
      <a href="#" @click.prevent="go({ name: 'home' }, $event)" @keydown.enter.prevent="go({ name: 'home' }, $event)" @keydown.space.prevent="go({ name: 'home' }, $event)">
        <img alt="Logo" class="w-12 md:w-7" src="https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/mega%203.png?alt=media&token=38b171d2-7ebe-431c-9d92-a772fd86e626" />
      </a>
    </template>
    <template #item="{ item, props }">
      <template v-if="item.name === 'admin'">
        <a
          v-if="userStore.isLogged"
          href="#"
          v-bind="props.action"
          class="flex align-items-center p-menuitem-link relative sm:text-sm font-medium items-center py-2 px-3 my-1 sm:my-0 select-none no-underline overflow-hidden"
          @click.prevent="go(item.readOnly ? { name: item.name } : { path: item.link }, $event)"
          @keydown.enter.prevent="go(item.readOnly ? { name: item.name } : { path: item.link }, $event)"
          @keydown.space.prevent="go(item.readOnly ? { name: item.name } : { path: item.link }, $event)"
        >
          <span class="text-black-mp dark:text-white/70 px-5">{{ item.title }}</span>
        </a>
        <template v-else>
          <a
            href="#"
            class="p-menuitem-link relative sm:text-sm font-medium items-center py-2 px-3 my-1 sm:my-0 select-none cursor-pointer no-underline overflow-hidden rounded-md text-black-mp dark:text-white/70 hover:bg-surface-50 dark:hover:bg-surface-800 transition-all duration-200 flex align-items-center"
            v-bind="props.action"
            @click.prevent="onLoginClick"
            @keydown.enter.prevent="onLoginClick"
            @keydown.space.prevent="onLoginClick"
          >
            <span class="px-5">Iniciar sesión</span>
          </a>
        </template>
      </template>
      <a
        v-else-if="item.isVisible"
        href="#"
        v-bind="props.action"
        class="flex align-items-center p-menuitem-link relative sm:text-sm font-medium items-center py-2 px-3 my-1 sm:my-0 select-none no-underline overflow-hidden"
        @click.prevent="go(item.readOnly ? { name: item.name } : item.link, $event)"
        @keydown.enter.prevent="go(item.readOnly ? { name: item.name } : item.link, $event)"
        @keydown.space.prevent="go(item.readOnly ? { name: item.name } : item.link, $event)"
      >
        <span class="text-black-mp dark:text-white/70 px-5">{{ item.title }}</span>
      </a>
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
    <div class="bg-blue-mp h-3 w-[55%]"></div>
    <div class="bg-light-blue-mp h-3 w-[15%]"></div>
    <div class="bg-yellow-mp h-3 w-[15%]"></div>
    <div class="bg-pink-mp h-3 w-[15%]"></div>
  </div>
</template>
