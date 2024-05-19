<script setup>
import { defineAsyncComponent } from 'vue'

const MpSearchFilter = defineAsyncComponent(/* webpackChunkName: "mpSearchFilter" */ () => import('@/components/global/MpSearchFilter.vue'))
const props = defineProps({
  menu: Object
})
</script>

<template>
  <Menubar :model="menu ? menu : []" breakpoint="956px" class="rounded-none">
    <template #start>
      <RouterLink :to="{ name: 'home' }">
        <img alt="Logo" class="size-7 md:size-10" src="https://megapromocionales.com.co/favicon.ico" />
      </RouterLink>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <RouterLink v-if="item.name"  :to="{ name: item.name }">
        <div class="flex align-items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" severity="info" />
        </div>
      </RouterLink>
      <div v-else class="flex align-items-center" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" severity="info" />
        <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
      </div>
    </template>
    <template #end>
      <div class="md:w-[20rem]">
        <MpSearchFilter />
      </div>
    </template>
  </Menubar>
</template>

<style scoped>

</style>
