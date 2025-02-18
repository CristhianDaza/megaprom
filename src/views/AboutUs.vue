<script setup>
import { defineAsyncComponent } from 'vue'
import { useHead } from '@unhead/vue'

const MpBreadcrumb = defineAsyncComponent(/* webpackChunkName: "mpBreadcrumb" */() => import('@/components/UI/MpBreadcrumb.vue'))
const MpTitle = defineAsyncComponent(/* webpackChunkName: "mpTitle" */() => import('@/components/UI/MpTitle.vue'))

const breadcrumbItems = [
  {
    icon: 'pi pi-info-circle',
    label: 'Nosotros'
  }
]

useHead({
  title: 'Sobre Nosotros | Megapromocionales',
  meta: [
    { name: 'description', content: 'Conoce más sobre Megapromocionales y nuestro compromiso con la calidad y el servicio.' },
    { property: 'og:title', content: '👥 Sobre Nosotros | Megapromocionales' },
    { property: 'og:description', content: 'Conoce más sobre Megapromocionales y nuestro compromiso con la calidad y el servicio.' },
    { property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logoWeb.webp?alt=media&token=72bc41b4-57ed-4b55-b92f-0df6c335e685' },
    { property: 'og:url', content: 'https://megapromocionales.com.co/nosotros' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '👥 Sobre Nosotros | Megapromocionales' },
    { name: 'twitter:description', content: 'Conoce más sobre Megapromocionales y nuestro compromiso con la calidad y el servicio.' },
    { name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/megapromocionales2020.appspot.com/o/logoWeb.webp?alt=media&token=72bc41b4-57ed-4b55-b92f-0df6c335e685' }
  ]
});

</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />
  <MpTitle
    title="Nosotros"
    image="https://firebasestorage.googleapis.com/v0/b/mega2024-6a453.appspot.com/o/web1-03.jpg?alt=media&token=8de1493c-514a-4a46-9099-07fe5c4872b8"
  />
  <section>
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
          <h2 class="text-gray-900 dark:text-white text-4xl font-extrabold mb-2">Misión</h2>
          <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Compañía dedicada a la importación, distribución y comercialización de artículos promocionales y material publicitario, ofrecemos a nuestros clientes atención personalizada y asesoría en la elaboración de trabajos, garantizando resultados óptimos en menor tiempo de producción utilizando tecnología de punta y personal calificado con un alto grado de responsabilidad y relaciones humanas, fomentando el trabajo en equipo y comprometidos con el medío ambiente y la sociedad en beneficio de nuestros clientes y colaboradores.</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
          <h2 class="text-gray-900 dark:text-white text-4xl font-extrabold mb-2">Visión</h2>
          <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
            Consolidarnos como una empresa líder en el mercado de artículos promocionales, ampliar nuestros horizontes e introducir al mercado productos de marca propia atendiendo a las necesidades de nuestros clientes, utilizando tecnología e ideas nuevas que nos permitan ofrecer un excelente servicio, con precios competitivos, conservando la calidez y responsabilidad social como pilares de nuestro crecimiento personal y económico mejorando calidad de vida de nuestros colaboradores directos e indirectos.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
