<script setup>
import { defineAsyncComponent } from 'vue'

const MpService = defineAsyncComponent(/* webpackChunkName: "mpService" */ () => import('@/components/home/MpService.vue'))

const props = defineProps({
  viewFirstButton: Boolean,
})

const images = [
  {
    id: 1,
    title: 'PROMOCIONALES',
    description: 'Para tu marca y clientes la línea más fina en mercshandising, set de regalo, escritura, bebidas, herramientas y mucho más. ',
    src: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/cat-07.png?alt=media&token=67742bed-a013-46d9-b5ec-7abc9c617068',
    alt: 'Marcación promocionales',
    color: 'text-[#5BC5F2]',
    serviceId: 'promocionales',
  },
  {
    id: 2,
    title: 'OFFSET',
    description: 'Te ofrecemos la más alta calidad en impresión formato 1/2 pliegos 5 colores, ya que contamos con maquinaria moderna y un equipo de trabajo calificado para cumplír con el nivel de calidad que nuestros cliente requieren. ',
    src: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/revistas.png?alt=media&token=dfa11190-530a-4d5d-adf8-788ab89890b5',
    alt: 'Offset impresión 5 colores',
    color: 'text-[#FFCC00]',
    serviceId: 'offset',
  },
  {
    id: 3,
    title: 'DIGITAL',
    description: 'Siéntete libre de crear y realizar personalizaciones, contamos con equipos de última generación en impresión de mínima cantidad en formato no convencional, variedad en sustratos, papel fino, metalizado e impresión en materiales pesados hasta calibre 20.',
    src: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/tarjeta.png?alt=media&token=d1a54f94-deb5-4127-80c3-11c4fc2027ca',
    alt: 'Impresión digital',
    color: 'text-[#E6007D]',
    serviceId: 'digital',
  }
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[2rem] px-[1rem] xl:px-[2rem] container mx-auto text-center mt-5">
    <div
      v-for="{ src, alt, title, description, color, serviceId } in images"
      :key="serviceId"
    >
      <MpService
        :src="src"
        :alt="alt"
        :title="title"
        :description="description"
        :color="color"
        :serviceId="serviceId"
        :viewFirstButton="true"
        v-if="viewFirstButton"
      />
      <RouterLink :to="{ name: 'service', params: { serviceId } }" v-else>
        <MpService
          :src="src"
          :alt="alt"
          :title="title"
          :description="description"
          :color="color"
          :serviceId="serviceId"
        />
      </RouterLink>
    </div>
  </div>
</template>
