<script setup>
import { ref } from 'vue'

const props = defineProps({
  model: {
    type: Array,
    default: () => []
  }
})
const home = ref({
  icon: 'pi pi-home',
  name: 'home'
})
</script>

<template>
  <div class="flex justify-left py-5 pl-5 md:pl-2 container mx-auto">
    <Breadcrumb :home="home" :model="model">
      <template #item="{ item, props }">
        <router-link v-slot="{ navigate }" :to="{ name: item.name }" custom>
          <span v-bind="props.action" @click="navigate" :class="{'cursor-pointer': item.name}">
            <span :class="[item.icon, 'text-color']" />
            <span class="text-primary font-semibold">{{ item.label }}</span>
          </span>
        </router-link>
      </template>
    </Breadcrumb>
  </div>
</template>
