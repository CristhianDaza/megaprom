<script setup>
import { onMounted, ref } from 'vue';

const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 300;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <button
    v-show="showButton"
    @click="scrollToTop"
    class="fixed bottom-8 right-8 w-12 h-12 dark:bg-gray-50 bg-gray-800 text-white dark:text-gray-800 rounded-md flex items-center justify-center transition-all duration-300 opacity-0 visibility-hidden hover:bg-gray-600 border border-gray-800"
    :class="{ 'opacity-100 visibility-visible': showButton }"
  >
    <span class="text-2xl">
      <i class="pi pi-arrow-circle-up"></i>
    </span>
  </button>
</template>

<style scoped>

</style>
