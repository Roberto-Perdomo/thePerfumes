
<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import RegisterModal from './components/RegisterModal.vue'
import LoginModal from './components/LoginModal.vue'
import Chatbot from './components/Chatbot.vue';

// Estados de los modales
const showRegisterModal = ref(false)
const showLoginModal = ref(false)

// Abrir modal de Registro
function openRegisterModal() {
  showRegisterModal.value = true
}

// Abrir modal de Login
function openLoginModal() {
  showLoginModal.value = true
}

// Cerrar modales
function closeRegisterModal() {
  showRegisterModal.value = false
}

function closeLoginModal() {
  showLoginModal.value = false
}

// Cambiar de Registro → Login
function switchToLogin() {
  showRegisterModal.value = false
  setTimeout(() => {
    showLoginModal.value = true
  }, 200)
}

// Cambiar de Login → Registro
function switchToRegister() {
  showLoginModal.value = false
  setTimeout(() => {
    showRegisterModal.value = true
  }, 200)
}
</script>

<template>
 <div class="layout">
    <!-- Enviar funciones al Header -->
    <Header 
      :openRegisterModal="openRegisterModal"
      :openLoginModal="openLoginModal"
    />

    <!-- Modal de Registro -->
    <!-- Agregado: abrir Login desde Register mediante el evento "open-login" -->
    <RegisterModal 
      :showModal="showRegisterModal" 
      @close="closeRegisterModal"
      @open-login="switchToLogin"
    />

    <!-- Modal de Login -->
    <!-- Agregado: abrir Registro desde Login mediante el evento "open-register" -->
    <LoginModal 
      :showModal="showLoginModal" 
      @close="closeLoginModal"
      @open-register="switchToRegister"
    />

    <div id="app">
    <router-view />
    </div>

    <Footer />

    <Chatbot />
  </div>
</template>

<style scoped>


.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* OCUPA TODA LA PANTALLA */
}

</style>
