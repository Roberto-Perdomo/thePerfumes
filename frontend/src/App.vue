
<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Chatbot from './components/Chatbot.vue';
</script>

<template>
  <div class="layout">
    <Header />
    
    <div id="app">
    <router-view />
    </div>

    <Footer />

    <Chatbot />
  </div>
</template>


<style>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* OCUPA TODA LA PANTALLA */
}

</style>
