<template>
  <div>
    <!-- Botón flotante con icono -->
    <button
      class="chat-button"
      @click="isOpen = !isOpen"
    >
      💬
    </button>

    <!-- Ventana del chatbot -->
    <div v-if="isOpen" class="chat-window">
      <div class="chat-header">
        <span>ChatBot</span>
        <button class="close-btn" @click="isOpen = false">✖</button>
      </div>

      <div class="chat-body">
        <p v-for="(msg, i) in messages" :key="i" class="msg">
          {{ msg }}
        </p>
      </div>

      <div class="chat-footer">
        <input
          type="text"
          v-model="input"
          @keyup.enter="sendMessage"
          placeholder="Escribe algo..."
        />
        <button @click="sendMessage">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const messages = ref(["¡Hola! Soy un bot predeterminado 😊"])
const input = ref("")

function sendMessage() {
  if (!input.value.trim()) return
  
  messages.value.push("Tú: " + input.value)
  messages.value.push("Bot: Este es un mensaje predeterminado 🤖")

  input.value = ""
}
</script>

<style scoped>
.chat-button {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background: #4f46e5;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: white;
  font-size: 28px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.chat-window {
  position: fixed;
  bottom: 100px;
  right: 25px;
  width: 320px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
}

.chat-header {
  background: #4f46e5;
  color: white;
  padding: 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}

.chat-body {
  padding: 10px;
  height: 250px;
  overflow-y: auto;
}

.msg {
  background: #f3f4f6;
  padding: 6px 10px;
  margin-bottom: 8px;
  border-radius: 8px;
}

.chat-footer {
  display: flex;
  border-top: 1px solid #ddd;
}

.chat-footer input {
  flex: 1;
  padding: 10px;
  border: none;
}

.chat-footer button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
</style>
