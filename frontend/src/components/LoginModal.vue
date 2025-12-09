<template>
  <transition name="modal-fade">
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">

        <!-- Botón cerrar -->
        <button @click="closeModal" class="close-btn" aria-label="Cerrar">&times;</button>

        <div class="modal-header">
          <h2>Iniciar Sesión</h2>
          <p>Bienvenido de nuevo</p>
        </div>

        <form @submit.prevent="handleLoginSubmit" class="login-form">

          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input 
              type="email"
              id="email"
              v-model="loginData.email"
              required
              placeholder="tu@email.com"
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              type="password"
              id="password"
              v-model="loginData.password"
              required
              placeholder="Tu contraseña"
            />
          </div>

          <button type="submit" class="submit-btn">
            Entrar
          </button>
        </form>

        <div class="modal-footer">
          <p>¿No tienes cuenta? 
            <a href="#" @click.prevent="openRegister">
              Crear una cuenta
            </a>
          </p>
        </div>

      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "LoginModal",

  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  },

  emits: ["close", "open-register", "login-success"],

  data() {
    return {
      loginData: {
        email: "",
        password: "",
        phone: ""   // ← agregado
      },
      errorMsg: ""
    };
  },

  methods: {
    closeModal() {
      this.$emit("close");
    },

    async handleLoginSubmit() {
      this.errorMsg = "";

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.loginData)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          this.errorMsg = data.error || "Credenciales inválidas.";
          return;
        }

        // Guardar usuario en localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        this.$emit("login-success", data.user);

        alert(`Bienvenido ${data.user.username} 👋`);

        this.resetForm();
        this.closeModal();

      } catch (error) {
        console.error(error);
        this.errorMsg = "Error al conectar con el servidor.";
      }
    },

    openRegister() {
      this.$emit("open-register");
    },

    resetForm() {
      this.loginData = { 
        email: "", 
        password: "",
        phone: ""  // ← limpiar phone también
      };
    }
  }
};
</script>


<style scoped>
/* Reutiliza tu mismo estilo del RegisterModal */

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

.login-form {
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

.form-group input[type="email"],
.form-group input[type="password"] {
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #000000;
}

.submit-btn {
  background: linear-gradient(135deg, #000000 0%, #000000 100%);
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

.modal-footer a {
  color: #020202;
  font-weight: 600;
  text-decoration: none;
}

.modal-footer a:hover {
  text-decoration: underline;
}

/* Animación */
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
</style>
