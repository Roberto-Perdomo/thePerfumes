<script setup>
import axios from "axios";
import { ref } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

async function registerUser() {
  if (password.value !== confirmPassword.value) {
    alert("Las contraseñas no coinciden");
    return;
  }

  try {
    const res = await fetch.post("http://localhost:3000/register", {
      username: username.value,
      email: email.value,
      password: password.value
    });

    if (res.data.success) {
      alert("Usuario registrado correctamente");
    }
  } catch (error) {
    console.error(error);
    alert("Error al registrar usuario");
  }
}
</script>




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

        <form @submit.prevent="registerUser" class="form">
          <input v-model="username" type="text" placeholder="Nombre de usuario" required>
          <input v-model="email" type="email" placeholder="Correo electrónico" required>
          <input v-model="password" type="password" placeholder="Contraseña" required>
          <input v-model="confirmPassword" type="password" placeholder="Confirmar contraseña" required>

          <button type="submit" class="btn">Registrarse</button>
        </form>


      </div>

    </div>
  </section>
</template>
