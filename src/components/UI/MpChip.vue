<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  label: {
    type: Object,
    required: true
  }
})

const removeChip = (chip) => {
  const updatedQuery = { ...route.query }
  delete updatedQuery[chip.key]
  router.push({ query: updatedQuery })
}
</script>

<template>
  <Chip :label="label.name" removable @remove="removeChip(label)"/>
</template>

<style scoped>

</style>
