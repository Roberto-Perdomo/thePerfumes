<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import RegisterModal from './components/RegisterModal.vue'
import LoginModal from './components/LoginModal.vue'
import Chatbot from './components/Chatbot.vue'

/* ================================
   🔥 USUARIO GLOBAL
================================ */

const user = ref(JSON.parse(localStorage.getItem("user")))

function handleLoginSuccess(loggedUser) {
  user.value = loggedUser
}

function logout() {
  localStorage.removeItem('user')
  user.value = null
}

/* ================================
   MODALES
================================ */

const showRegisterModal = ref(false)
const showLoginModal = ref(false)

function openRegisterModal() {
  showRegisterModal.value = true
}

function openLoginModal() {
  showLoginModal.value = true
}

function closeRegisterModal() {
  showRegisterModal.value = false
}

function closeLoginModal() {
  showLoginModal.value = false
}

function switchToLogin() {
  showRegisterModal.value = false
  setTimeout(() => {
    showLoginModal.value = true
  }, 200)
}

function switchToRegister() {
  showLoginModal.value = false
  setTimeout(() => {
    showRegisterModal.value = true
  }, 200)
}
</script>

<template>
  <div class="layout">

    <Header 
      :openRegisterModal="openRegisterModal"
      :openLoginModal="openLoginModal"
      :user="user"
      :logout="logout"
    />

    <RegisterModal 
      :showModal="showRegisterModal" 
      @close="closeRegisterModal"
      @open-login="switchToLogin"
    />

    <LoginModal 
      :showModal="showLoginModal" 
      @close="closeLoginModal"
      @open-register="switchToRegister"
      @login-success="handleLoginSuccess"
    />

    <!-- 🔥 ESTE ES EL CAMBIO IMPORTANTE -->
    <div id="app">
      <router-view :user="user" />
    </div>

    <Footer />
    <Chatbot />

  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>