<template>
  <div class="layout">
    <Header />
    
    <main class="content">
      <RouterView />
    </main>

    <Footer />

    <Chatbot />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Chatbot from './components/Chatbot.vue';
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* OCUPA TODA LA PANTALLA */
}

.content {
  flex: 1; /* EMPUJA AL FOOTER HACIA ABAJO */
}
</style>
