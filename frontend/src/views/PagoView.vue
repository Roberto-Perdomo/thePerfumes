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
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const total = ref("0.00")

onMounted(() => {
  // 1. Primero tomar el total desde la URL
  const urlTotal = route.query.total

  if (urlTotal) {
    total.value = urlTotal
    localStorage.setItem("payment_total", urlTotal)
  } else {
    // 2. Si no viene, lo tomamos del localStorage
    const saved = localStorage.getItem("payment_total")
    if (saved) total.value = saved
  }
})
async function confirmarPago() {
  const cart = JSON.parse(localStorage.getItem("cart-data") || "[]");
  const user = JSON.parse(localStorage.getItem("user"));        // ajustar clave
  const token = localStorage.getItem("token");

  if (!user || !token) {
    alert("Debes iniciar sesión para comprar.");
    return router.push("/login");
  }

  const res = await fetch("http://localhost:3000/crear-pedido", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      total: total.value,
      items: cart
    })
  });

  const data = await res.json();
  console.log("RESPUESTA CREAR-PEDIDO:", data);
  
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
