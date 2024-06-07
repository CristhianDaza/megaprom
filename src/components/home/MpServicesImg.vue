<script setup>
const images = [
  {
    id: 1,
    title: 'PROMOCIONALES',
    description: 'Para tu marca y clientes la línea más fina en mercshandising, set de regalo, escritura, bebidas, herramientas y mucho más. ',
    src: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/cat-07.png?alt=media&token=67742bed-a013-46d9-b5ec-7abc9c617068',
    alt: 'Marcación promocionales',
    color: 'text-[#5BC5F2]',
  },
  {
    id: 2,
    title: 'OFFSET',
    description: 'Te ofrecemos la más alta calidad en impresión formato 1/2 pliegos 5 colores, ya que contamos con maquinaria moderna y un equipo de trabajo calificado para cumplír con el nivel de calidad que nuestros cliente requieren. ',
    src: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/revistas.png?alt=media&token=dfa11190-530a-4d5d-adf8-788ab89890b5',
    alt: 'Offset impresión 5 colores',
    color: 'text-[#FFCC00]',
  },
  {
    id: 3,
    title: 'DIGITAL',
    description: 'Siéntete libre de crear y realizar personalizaciones, contamos con equipos de última generación en impresión de mínima cantidad en formato no convencional, variedad en sustratos, papel fino, metalizado e impresión en materiales pesados hasta calibre 20.',
    src: 'https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/tarjeta.png?alt=media&token=d1a54f94-deb5-4127-80c3-11c4fc2027ca',
    alt: 'Impresión digital',
    color: 'text-[#E6007D]',
  }
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[2rem] px-[1rem] xl:px-[2rem] container mx-auto text-center mt-5">
    <template
      v-for="{ src, alt, title, description, color } in images"
    >
      <div class="bg-white p-5 rounded-3xl drop-shadow-xl flex flex-col justify-between dark:bg-gray-800">
        <div>
          <h3 class="text-2xl font-bold pt-3 pb-5" :class="`${color}`">{{ title }}</h3>
          <p class="text-[#0E2050] text-[1rem] text-justify pb-5 dark:text-white">{{ description }}</p>
          <div class="flex justify-center items-center text-center pt-3">
            <img
              :src="src"
              :alt="alt"
              class="w-[18rem]"
              height="100%"
              width="100%"
            />
          </div>
        </div>
        <div class="flex gap-[4rem] mt-5 justify-center">
          <RouterLink :to="{ name: 'products' }">
            <Chip label="Productos" />
          </RouterLink>
          <Chip label="Servicios" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
