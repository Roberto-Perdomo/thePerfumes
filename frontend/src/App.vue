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

<<<<<<< HEAD
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

=======
.content {
  flex: 1; /* EMPUJA AL FOOTER HACIA ABAJO */
}
>>>>>>> 4014597abafbfa5997471880434aaa75c0322054
</style>
