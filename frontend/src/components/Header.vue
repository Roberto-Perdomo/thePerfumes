<script setup>
// Recibimos la función desde App.vue
const props = defineProps({
  openRegisterModal: Function,
  openLoginModal: Function,
  user: Object,
  logout: Function
})

</script>

<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-brand">
        <h2>LEE PERFUM</h2>
      </div>

      <ul class="nav-menu" id="nav-menu">

<li><router-link to="/" class="nav-link">inicio</router-link></li>
        <li><a href="#sobre-mi" class="nav-link">Sobre Nosotros</a></li>
        <li><a href="#portafolio" class="nav-link">Destacados</a></li>
        <li><router-link to="/catalogo" class="nav-link">Perfumes</router-link></li>

        <!-- Aquí modificamos únicamente este enlace -->
      <li v-if="!user">
  <a 
    href="#"
    class="nav-link"
    @click.prevent="openLoginModal"
  >
    Iniciar sesión
  </a>
</li>

<li v-else class="nav-user">
  <span class="nav-link">
    Hola {{ user.nombre }}
  </span>
  <a 
    href="#"
    class="nav-link"
    @click.prevent="logout"
  >
    Cerrar sesión
  </a>
</li>
      </ul>
      

      <div class="nav-toggle" id="nav-toggle">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </nav>
  </header>
</template>
