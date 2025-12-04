<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const messages = ref(["¡Hola! Soy un bot 😊"])
const input = ref("")

// --- Tu pequeño dataset ---
// Puedes agregar tantas preguntas/respuestas como quieras
const dataset = [
  // Saludos
  { q: "hola", a: "¡Hola! ¿Cómo puedo ayudarte hoy? 😊" },
  { q: "buenas", a: "¡Buenas! ¿Qué necesitas?" },
  { q: "hey", a: "¡Hey! ¿Qué tal todo? 😄" },
  { q: "que tal", a: "¡Todo genial! ¿Y tú?" },

  // Ayuda
  { q: "ayuda", a: "Claro, aquí estoy para ayudarte 👌 ¿Qué necesitas?" },
  { q: "necesito ayuda", a: "Dime, ¿con qué puedo ayudarte?" },
  { q: "tienes soporte", a: "Sí, puedo asistirte. Cuéntame el problema." },

  // Información general
  { q: "quien eres", a: "Soy un bot creado para ayudarte 🤖" },
  { q: "que eres", a: "Soy un asistente virtual programado para responderte." },
  { q: "que puedes hacer", a: "Puedo responder preguntas básicas y darte información." },

  // Precios / productos
  { q: "precio", a: "El precio varía según el producto. ¿Cuál te interesa? 💸" },
  { q: "cuanto cuesta", a: "Depende del artículo. ¿Cuál quieres saber?" },
  { q: "promoción", a: "Tenemos varias promociones. Dime qué buscas y te cuento." },
  { q: "le parfam", a: "su precio esta en 500mil dolares algo mas " },


  // Horarios
  { q: "horario", a: "Nuestro horario es de lunes a viernes, 9am a 6pm." },
  { q: "abren", a: "Sí, estamos disponibles de 9am a 6pm ⏰" },
  { q: "cierran", a: "Cerramos a las 6pm 😊" },

  // Despedidas
  { q: "adios", a: "¡Hasta luego! 👋" },
  { q: "bye", a: "¡Nos vemos! 😊" },
  { q: "hasta luego", a: "¡Que tengas un buen día!" },

  // Agradecimientos
  { q: "gracias", a: "¡Con gusto! Estoy para ayudarte 😄" },
  { q: "muchas gracias", a: "¡No hay de qué! 🙌" },
  { q: "te agradezco", a: "Siempre es un placer ayudarte." },

  // Estados
  { q: "como estas", a: "¡Estoy muy bien! ¿Y tú? 🤖" },
  { q: "todo bien", a: "¡Genial! ¿En qué más puedo ayudarte?" },

  // Otros
  { q: "donde estan ubicados", a: "Estamos ubicados en línea 😉" },
  { q: "contacto", a: "Puedes contactarnos por aquí mismo o por email." },
  { q: "funciona", a: "¡Sí, estoy funcionando perfectamente 😄!" },
  
  

  { q: "quiero saber", a: "Claro 😊 ¿Qué te gustaría saber exactamente?" },
{ q: "quiero ver", a: "¿Qué quieres ver? Puedo mostrarte o contarte lo que necesites 👀" },
{ q: "quiero conocer", a: "Perfecto 😄 ¿Qué te gustaría conocer?" },
{ q: "quiero aprender", a: "¡Genial! Aprender es maravilloso 📘 ¿Qué tema te interesa?" },
{ q: "quiero entender", a: "Estoy aquí para explicarlo ✨ ¿Qué es lo que quieres entender?" },
{ q: "quiero preguntar", a: "Pregunta lo que quieras, estoy listo 😊" },
{ q: "quiero hablar", a: "Aquí estoy para conversar contigo 🗣️" },
{ q: "quiero informacion ", a: "¡Claro! Dime sobre qué tema quieres información." },
{ q: "quiero mas informacion ", a: "¡Claro! contacta con soporte en theperfumes@gmail.com" },
{ q: "quiero saber sobre los precios de los perfumes", a: "los precios se encuentran en la tienda para mas informacion revise nuestrso catalogos " },



{ q: "quiero ayuda", a: "Por supuesto 🙌 ¿En qué necesitas ayuda?" },
{ q: "quiero cambiar algo", a: "Dime qué quieres cambiar y te ayudo 😊" },
{ q: "quiero ver más", a: "Claro 👀 ¿Más sobre qué?" },

]


// --- Función para buscar respuesta en el dataset ---
function getBotResponse(userInput) {
  const text = userInput.toLowerCase()

  // Busca una coincidencia simple
  const found = dataset.find(item => text.includes(item.q))

  return found ? found.a : "No entendí muy bien 🤔 ¿Podrías reformular?"
}

// --- Envío del mensaje ---
function sendMessage() {
  if (!input.value.trim()) return
  
  messages.value.push("Tú: " + input.value)

  const reply = getBotResponse(input.value)
  messages.value.push("Bot: " + reply)

  input.value = ""
}
</script>


<template>
  <div>
    <button class="chat-button" @click="isOpen = !isOpen">💬</button>

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




<style scoped>
.chat-button {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background: #121213;
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
  background: #171718;
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
  background: #141414;
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
