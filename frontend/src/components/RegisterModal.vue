<template>
  <transition name="modal-fade">
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <!-- Botón cerrar -->
        <button @click="closeModal" class="close-btn" aria-label="Cerrar">&times;</button>

        <div class="modal-header">
          <h2>Únete a Nuestra Boutique</h2>
          <p>Descubre fragancias exclusivas</p>
        </div>

        <form @submit.prevent="handleSubmit" class="register-form">
          <div class="form-group">
            <label for="name">Nombre Completo</label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              required
              placeholder="Ingresa tu nombre"
            />
          </div>

          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              required
              placeholder="tu@email.com"
            />
          </div>

          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="formData.phone" 
              placeholder="+57 300 123 4567"
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              v-model="formData.password" 
              required
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div class="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="newsletter" 
              v-model="formData.newsletter"
            />
            <label for="newsletter">
              Quiero recibir ofertas y novedades sobre perfumes
            </label>
          </div>

          <button type="submit" class="submit-btn">
            Crear Cuenta
          </button>
        </form>

        <div class="modal-footer">
          <p>¿Ya tienes cuenta? <a href="#" @click.prevent="handleLogin">Inicia Sesión</a></p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RegisterModal",

  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  },

  emits: ["close"],

  data() {
    return {
      formData: {
        name: "",
        email: "",
        phone: "",
        password: "",
        newsletter: false
      }
    };
  },

  methods: {
    closeModal() {
      this.$emit("close"); // <<--- AQUÍ SE CIERRA DE VERDAD
    },

    handleSubmit() {
      alert(`¡Bienvenido/a ${this.formData.name}! Tu cuenta ha sido creada.`);
      this.resetForm();
      this.closeModal();
    },

    handleLogin() {
      console.log("Ir al login...");
    },

    resetForm() {
      this.formData = {
        name: "",
        email: "",
        phone: "",
        password: "",
        newsletter: false
      };
    }
  }
};
</script>


<style scoped>
/* --- Tu CSS original (sin cambios) --- */

.open-modal-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.open-modal-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 450px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 32px;
  color: #999;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.modal-header {
  text-align: center;
  margin-bottom: 30px;
}

.modal-header h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 700;
}

.modal-header p {
  color: #666;
  font-size: 14px;
  font-style: italic;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="tel"],
.form-group input[type="password"] {
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-group label {
  font-weight: 400;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.modal-footer {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.modal-footer p {
  color: #666;
  font-size: 14px;
}

.modal-footer a {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
}

.modal-footer a:hover {
  text-decoration: underline;
}

/* Animación del modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    padding: 30px 20px;
  }
  
  .modal-header h2 {
    font-size: 24px;
  }
}
</style>
