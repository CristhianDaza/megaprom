<script setup>
import {defineAsyncComponent} from 'vue'

const MpThemeButton = defineAsyncComponent(/* webpackChunkName: "mpThemeButton" */() => import('@/components/global/MpThemeButton.vue'))
const MpSocialMedia = defineAsyncComponent(/* webpackChunkName: "mpSocialMedia" */() => import('@/components/global/MpSocialMedia.vue'))

const version = import.meta.env.VITE_VERSION
</script>

<template>
  <footer>
    <div class="dark:bg-gray-900 px-12">
      <div class="py-2 px-2 md:px-10">
        <div class="sm:flex sm:items-center sm:justify-between">
          <MpThemeButton class="inline-flex md:hidden" />
        </div>
        <Divider align="right" class="bg-transparent hidden md:flex">
          <MpSocialMedia />
        </Divider>
        <div class="inline md:hidden">
          <MpSocialMedia />
          <Divider />
        </div>
        <div class="sm:flex sm:items-center sm:justify-between mt-[10px] md:mt-[-40px]">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ new Date().getFullYear() }} Megapromocionales LTDA. <span class="version text-gray-600">v{{version}}</span></span>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200 bg-gray-50 py-4 text-center text-sm text-gray-500">
      <p>
        Designed & Developed by
        <a
          href="https://cris-dev.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300 underline underline-offset-2 decoration-gray-400 hover:decoration-indigo-600"
        >
           cris-dev.com
        </a>
        <span> | Made with </span>
        <span class="ml-1 text-blue-500 animate-pulse">💙</span>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.version {
  font-size: 0.9em;
}
</style>
