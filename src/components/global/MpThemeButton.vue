<script setup>
import { onMounted, ref } from 'vue'

const checkbox = ref(false)
const theme = ref('Oscuro')

const setTheme = (themeName) => {
  localStorage.setItem('theme', themeName);

  if (themeName === 'theme-dark') {
    theme.value = 'Claro'
    document.documentElement.classList.add('dark')
  } else {
    theme.value = 'Oscuro'
    document.documentElement.classList.remove('dark')
  }
}

const toggleTheme = () => {
  if (checkbox.value) {
    setTheme('theme-dark')
  } else {
    setTheme('theme-light')
  }
}

onMounted(() => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'theme-dark') {
    setTheme(storedTheme)
    checkbox.value = true
  } else {
    setTheme('theme-light')
    checkbox.value = false
  }
})
</script>

<template>
  <label id="switch" class="relative inline-block w-8 h-5"  v-tooltip.bottom="`Cambiar a modo: ${theme}`">
    <input type="checkbox" @change="toggleTheme" v-model="checkbox" class="opacity-0 w-0 h-0">
    <span class="slider block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition-all duration-400 ease-in-out rounded-full"></span>
  </label>
</template>

<style scoped>
.slider:before {
  content: "";
  position: absolute;
  height: 20px;
  width: 20px;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  transition: 0.4s;
  box-shadow: 0 0 15px rgba(32, 32, 32, 0.24);
  border-radius: 50%;
  background: white url('https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/sunny.png?alt=media&token=f26a8025-6cca-4db0-b051-87051219e9ca') no-repeat center;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  transform: translateX(12px);
  background: white url('https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/night.png?alt=media&token=0c85734b-f74d-4972-888b-73063b3066f6') no-repeat center;
}
</style>
