<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-brand">
        <h2>LEE PERFUM</h2>
      </div>

      <ul class="nav-menu" id="nav-menu">

        <li><router-link to="/" class="nav-link">Inicio</router-link></li>
        <li><a href="#sobre-mi" class="nav-link">Sobre la tienda</a></li>
        <li><a href="#portafolio" class="nav-link">Destacados</a></li>
        <li><router-link to="/catalogo" class="nav-link">Perfumes</router-link></li>
        <li><a href="#contacto" class="nav-link">Registrarse</a></li>

      </ul>

      <div class="nav-toggle" id="nav-toggle">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </nav>
  </header>
</template>
