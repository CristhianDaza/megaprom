<script setup>
import TvLabel from '@todovue/tvlabel'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const textColor = ref(document.documentElement.classList.contains("dark") ? "white" : "black");

onMounted(() => {
  const observer = new MutationObserver(() => {
    textColor.value = document.documentElement.classList.contains("dark") ? "white" : "black";
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  onUnmounted(() => observer.disconnect());
});

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
  <TvLabel
    isRemove
    @click="removeChip(label)"
    :color="label?.color"
    :textColor="textColor"
    class="dark:text-white text-black"
  >
    {{ label?.name }}
  </TvLabel>
</template>
