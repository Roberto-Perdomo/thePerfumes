<script setup>
// Recibimos la función desde App.vue
const props = defineProps({
  openRegisterModal: Function
})
</script>

<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-brand">
        <h2>LEE PERFUM</h2>
      </div>

      <ul class="nav-menu" id="nav-menu">
        <li><a href="#inicio" class="nav-link">Inicio</a></li>
        <li><a href="#sobre-mi" class="nav-link">Sobre Nosotros</a></li>
        <li><a href="#portafolio" class="nav-link">Destacados</a></li>

        <!-- Aquí modificamos únicamente este enlace -->
        <li>
          <a 
            href="#contacto"
            class="nav-link"
            @click.prevent="props.openRegisterModal"
          >
            Iniciar sesión
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
