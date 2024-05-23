<script setup>
import {ref, onMounted, watch} from 'vue'
import { useToast } from 'primevue/usetoast'

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const toast = useToast()
const imageRefs = ref([])

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})

const images = ref([])
const currentSlide = ref(0)

const save = (slide) => {
  const imageRef = images.value.find(ref => ref === slide)
  if (imageRef) {
    copyImageToClipboard(imageRef)
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se encontró la referencia de la imagen para el slide', life: 3000 })
    console.error('No se encontró la referencia de la imagen para el slide:', images.value[currentSlide.value])
  }
}

const copyImageToClipboard = (imgElement) => {
  const image = new Image()
  image.crossOrigin = 'anonymous'
  image.src = imgElement

  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)

    canvas.toBlob((blob) => {
      const item = new ClipboardItem({ 'image/png': blob })
      navigator.clipboard.write([item])
    })
    toast.add({ severity: 'success', summary: 'Copiado', detail: 'Se ha copiado en portapapeles', life: 3000 })
  }

  image.onerror = (err) => {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar la imagen', life: 3000 })
    console.error('Error al cargar la imagen:', err)
  }
}

const slideTo = (index) => {
  currentSlide.value = index
}

const handleError = (e) => {
  e.target.src = 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/Default%20Image.webp?alt=media&token=33275052-af6f-47ab-8826-394691b96484'
}

onMounted(() => {
  images.value = props.images
  imageRefs.value = Array.from({ length: images.value.length }, () => null)
})

watch(() => props.images, (newValue) => {
  images.value = newValue
})
</script>

<template>
  <div class="w-full mx-auto flex justify-center pb-2">
    <Button icon="pi pi-copy" aria-label="Copiar" @click="save(images[currentSlide])" text raised rounded/>
  </div>
  <Carousel id="gallery" :items-to-show="1.5" :wrap-around="true" v-model="currentSlide">
    <Slide v-for="(slide, index) in images" :key="index">
      <div class="carousel__item">
        <Image alt="Image" preview>
          <template #indicatoricon>
            <i class="pi pi-eye" style="color: #fff"></i>
          </template>
          <template #image>
            <img :src="slide" :alt="`producto ${id}`" @error="handleError" :ref="el => {
            if (el && imageRefs.value) {
              imageRefs.value[index] = el
            }
          }" />
          </template>
          <template #preview="slotProps">
            <img
              :src="slide"
              :alt="`producto ${id}`"
              :style="{ ...slotProps.style, maxWidth: '750px' }"
              @click="slotProps.onClick"
              class="custom-preview-image"
              @error="handleError"
            />
          </template>
        </Image>
      </div>
    </Slide>
    <template #addons>
      <navigation />
    </template>
  </Carousel>
  <Carousel
    id="thumbnails"
    :items-to-show="5"
    :wrap-around="true"
    v-model="currentSlide"
    ref="carousel"
  >
    <Slide v-for="(slide, i) in images" :key="i">
      <div class="carousel__item p-2" @click="slideTo(i)">
        <img :src="slide" :alt="`producto ${id}`" @error="handleError">
      </div>
    </Slide>
    <template #addons>
      <navigation />
    </template>
  </Carousel>
</template>

<style scoped>

</style>
