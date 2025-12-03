<template>
  <section id="contacto" class="contact">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Únete a nosotros</h2>
      </div>

      <div class="contact-content">
        
        <div class="contact-info">
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <h4>Email</h4>
            <p>contacto@miportafolio.com</p>
          </div>

          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <h4>Teléfono</h4>
            <p>+57 (312) 218-9764</p>
          </div>

          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <h4>Ubicación</h4>
            <p>Barranquilla, Colombia</p>
          </div>
        </div>

        <form id="register-form" class="form">
          <input type="text" placeholder="Nombre de usuario" required>
          <input type="email" placeholder="Correo electrónico" required>
          <input type="password" placeholder="Contraseña" required>
          <input type="password" placeholder="Confirmar contraseña" required>

          <button type="submit" class="btn">Registrarse</button>
        </form>

      </div>

    </div>
  </section>
</template>
