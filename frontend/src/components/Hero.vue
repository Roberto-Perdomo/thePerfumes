<template>
  <section id="inicio" class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">LEE</span>
            <span class="title-line highlight">PERFUM</span>
          </h1>

          <p class="hero-description">
            Lee Perfum es tu guía en el mundo de las fragancias. Descubre,
            compara y encuentra la colonia perfecta para cada ocasión.
          </p>

          <div class="hero-buttons">
            <a href="#portafolio" class="btn btn-primary">VER</a>

            <!-- BOTÓN PARA ABRIR REGISTERMODAL -->
            <button 
              class="btn btn-secondary"
              @click="props.openRegisterModal"
            >
              ÚNETE A NOSOTROS
            </button>

          </div>
        </div>

        <div class="hero-image">
          <div class="image-container">
            <img src="../assets/img/LEE PERFUM.png" alt="Imagen" class="profile-img">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Recibir la función enviada desde HomeView.vue
const props = defineProps({
  openRegisterModal: Function
})
</script>

<style scoped>
</style>
