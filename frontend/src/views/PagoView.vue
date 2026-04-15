<template>
  <div class="payment-wrapper">

    <div class="payment-box">
      <h1>Pagar pedido</h1>

      <p class="total">
        Total a pagar: <strong>${{ total }}</strong>
      </p>

      <button class="pay-btn" @click="confirmarPago">
        Confirmar pago
      </button>

      <router-link to="/catalogo" class="back">
        ← Volver al catálogo
      </router-link>
    </div>

  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"

/* 🔥 RECIBIR USUARIO DESDE APP */
const props = defineProps({
  user: Object
})

const user = computed(() => props.user)

const route = useRoute()
const router = useRouter()

const total = ref("0.00")

/* ================================
   OBTENER TOTAL
================================ */
onMounted(() => {
  const urlTotal = route.query.total

  if (urlTotal) {
    total.value = urlTotal
    localStorage.setItem("payment_total", urlTotal)
  } else {
    const saved = localStorage.getItem("payment_total")
    if (saved) total.value = saved
  }

  /* 🔥 VALIDAR USUARIO CORRECTAMENTE */
  if (!user.value) {
    alert("Debes iniciar sesión para comprar.")
    router.push("/catalogo")
  }
})

/* ================================
   GENERAR KEY CORRECTA DEL CARRITO
================================ */
function getCartKey() {
  return user.value
    ? `cart-user-${user.value.id}`
    : "cart-guest"
}

/* ================================
   CONFIRMAR PAGO
================================ */
async function confirmarPago() {

 if (!user.value) {
  alert("Debes iniciar sesión para comprar.")
  return router.push("/catalogo")
}

const cart = JSON.parse(
  localStorage.getItem(getCartKey()) || "[]"
)

// 🔥 VALIDACIÓN NUEVA
if (!cart || cart.length === 0) {
  alert("El carrito está vacío 🛒")
  return
}

const token = localStorage.getItem("token")

// 🔥 VALIDAR TOTAL TAMBIÉN
if (!total.value || Number(total.value) <= 0) {
  alert("Total inválido ❌")
  return
}

const res = await fetch("https://theperfumes.onrender.com/crear-pedidos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  },
  body: JSON.stringify({
    total: total.value,
    items: cart
  })
})

const data = await res.json()
console.log("RESPUESTA CREAR-PEDIDO:", data)

alert("Pago realizado con éxito ✅")

/* 🔥 LIMPIAR CARRITO DEL USUARIO */
localStorage.setItem(getCartKey(), JSON.stringify([]))

router.push("/catalogo")
}
</script>
<style scoped>
.payment-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
  padding-top: 20px;
}

.payment-box {
  background: white;
  padding: 35px;
  width: 360px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 5px 25px rgba(0,0,0,0.12);
}

.payment-box h1 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #111;
}

.total {
  font-size: 18px;
  margin-bottom: 25px;
}

.pay-btn {
  width: 100%;
  background: #28a745;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.pay-btn:hover {
  background: #1e8a38;
}

.back {
  display: block;
  margin-top: 20px;
  color: #6b46c1;
  text-decoration: none;
  font-size: 14px;
}

.back:hover {
  text-decoration: underline;
}
</style>
