<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-brand">
        <h2>LEE PERFUM</h2>
      </div>

      <ul class="nav-menu" id="nav-menu">

        <ul class="nav-menu" id="nav-menu">
          <li><router-link to="/#inicio" class="nav-link">Inicio</router-link></li>
          <li><router-link to="/#sobre-mi" class="nav-link">Sobre nosotros</router-link></li>
          <li><router-link to="/#portafolio" class="nav-link">Destacados</router-link></li>
          <li><router-link to="/#Perfumes" class="nav-link">Perfumes</router-link></li>
          <li><router-link to="/#contacto" class="nav-link">Registrarse</router-link></li>

          <!-- NUEVO -->
          <li><router-link to="/tienda" class="nav-link">Tienda</router-link></li>
        </ul>

        

        <!-- 🔥 Rutas reales para otras páginas -->
        <li><router-link to="/chat" class="nav-link">Chat</router-link></li>
        <li><router-link to="/about" class="nav-link">Acerca</router-link></li>

      </ul>

      <div class="nav-toggle" id="nav-toggle">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </nav>
  </header>
</template>
