<script setup>
import { onMounted  } from 'vue'
import { useCatalogsStore} from '@/store/catalogs.js'

const catalogsStore = useCatalogsStore()

onMounted(() => {
  catalogsStore.getCatalogs()
})
</script>

<template>
  <p>Admin Catalogs</p>
  <pre>
    {{ catalogsStore.catalogs }}
  </pre>
</template>

<style scoped>

</style>
