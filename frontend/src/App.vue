<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Chatbot from './components/Chatbot.vue';
</script>


<template>
  <div>
    <Header />

     <div id="app">
    <router-view />
    </div>
    
    <Footer />
    <Chatbot />
  </div>
</template>


<style scoped>

</style>
