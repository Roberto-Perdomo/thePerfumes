<template>
  <div>
    <!-- Ahora Hero recibe la función para abrir el modal -->
    <Hero :openRegisterModal="openRegisterModal" />

    <About />
    <Portfolio />
    <Contact />
  </div>
</template>

<script setup>
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Portfolio from '../components/Portfolio.vue'
import RegisterModal from '../components/RegisterModal.vue'

// Recibir la función que manda App.vue
const props = defineProps({
  openRegisterModal: Function
})
</script>

<style scoped>


</style>
