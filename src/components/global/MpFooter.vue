<script setup>
import {defineAsyncComponent} from "vue";

const MpThemeButton = defineAsyncComponent(/* webpackChunkName: "mpThemeButton" */() => import('@/components/global/MpThemeButton.vue'))
const MpSocialMedia = defineAsyncComponent(/* webpackChunkName: "mpSocialMedia" */() => import('@/components/global/MpSocialMedia.vue'))
</script>

<template>
  <footer>
    <div class="dark:bg-gray-900">
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
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ new Date().getFullYear() }} Megapromocionales LTDA.</span>
        </div>
      </div>
    </div>
    <div class="py-3 font-medium flex justify-center bg-white">
      Design by
      <a href="https://co.linkedin.com/in/cristhiandaza" target="_blank">
        <strong class="px-1 text-emerald-600 hover:underline">
          Cristhian Daza
        </strong>
      </a>
      With 💙
    </div>
  </footer>
</template>

<style scoped>

</style>
