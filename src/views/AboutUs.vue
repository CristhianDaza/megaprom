<script setup>
import MpBreadcrumb from '@/components/UI/MpBreadcrumb.vue'

const breadcrumbItems = [
  {
    icon: 'pi pi-info-circle',
    label: 'Nosotros'
  }
]
</script>

<template>
  <MpBreadcrumb :model="breadcrumbItems" />


  <section>
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
          <h2 class="text-gray-900 dark:text-white text-4xl font-extrabold mb-2">Misión</h2>
          <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Compañía dedicada a la importación, distribución y comercialización de artículos promocionales y material publicitario, ofrecemos a nuestros clientes atención personalizada y asesoría en la elaboración de trabajos, garantizando resultados óptimos en menor tiempo de producción utilizando tecnología de punta y personal calificado con un alto grado de responsabilidad y relaciones humanas, fomentando el trabajo en equipo y comprometidos con el medío ambiente y la sociedad en beneficio de nuestros clientes y colaboradores.</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
          <h2 class="text-gray-900 dark:text-white text-4xl font-extrabold mb-2">Visión</h2>
          <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Consolidarnos como una empresa líder en el mercado de artículos promocionales, ampliar nuestros horizontes e introducir al mercado productos de marca propia atendiendo a las necesidades de nuestros clientes, utilizando tecnología e ideas nuevas que nos permitan ofrecer un excelente servicio, con precios competitivos, conservando la calidez y responsabilidad social como pilares de nuestro crecimiento personal y económico mejorando calidad de vida de nuestros colaboradores directos e indirectos.

          </p>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>
