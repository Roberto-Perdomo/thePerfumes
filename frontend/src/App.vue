<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import RegisterModal from './components/RegisterModal.vue'

// Estado del modal (true = abrir, false = cerrar)
const showRegisterModal = ref(false)

// Abrir modal desde Header
function openRegisterModal() {
  showRegisterModal.value = true
}

// Cerrar modal desde el mismo modal
function closeRegisterModal() {
  showRegisterModal.value = false
}
</script>

<template>
  <div>
    <!-- Enviamos la función para abrir el modal -->
    <Header :openRegisterModal="openRegisterModal" />

    <!-- Modal siempre montado, controlado por App.vue -->
    <RegisterModal 
      :showModal="showRegisterModal" 
      @close="closeRegisterModal"
    />

    <RouterView />
    <Footer />
  </div>
</template>

<style scoped>
</style>
