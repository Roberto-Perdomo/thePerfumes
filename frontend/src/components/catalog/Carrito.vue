<template>
  <div>
    <!-- Botón flotante -->
    <div class="cart-button" @click="$emit('toggle')">
      🛒 <span class="count">{{ totalItems }}</span>
    </div>

    <!-- Panel -->
    <div class="cart-panel" v-if="open">
      <h2>Tu Carrito</h2>

      <div v-if="cart.length === 0" class="empty">
        El carrito está vacío.
      </div>

      <div v-for="item in cart" :key="item.id" class="cart-item">
        <img :src="item.imagen" />
        <div class="info">
          <p>{{ item.nombre }}</p>
          <p class="precio">${{ item.precio }}</p>

          <div class="qty-controls">
            <button @click="$emit('decrease', item)">−</button>
            <span>{{ item.qty }}</span>
            <button @click="$emit('increase', item)">+</button>
          </div>
        </div>
      </div>

      <div class="cart-total">
        Total: <strong>${{ total }}</strong>
      </div>

      <button class="pay-btn" @click="$emit('pay')">
        Proceder al pago
      </button>

      <button class="close-cart" @click="$emit('toggle')">
        Cerrar
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cart: Array,
  open: Boolean,
  total: String,
  totalItems: Number
})

const emit = defineEmits(["toggle", "increase", "decrease", "pay"])
</script>

<style scoped>
.cart-button {
  position: fixed;
  bottom: 140px;
  right: 20px;
  background: black;
  color: white;
  padding: 12px 18px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 3000;
  font-size: 18px;
}

.cart-button .count {
  background: red;
  padding: 3px 7px;
  border-radius: 20px;
  font-size: 14px;
}

.cart-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.15);
  padding: 20px;
  z-index: 4000;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;
}

.cart-item img {
  width: 60px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.qty-controls button {
  width: 26px;
  height: 26px;
  border: none;
  background: black;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.cart-total {
  margin-top: 20px;
  font-size: 18px;
  text-align: right;
}

.pay-btn {
  width: 100%;
  padding: 10px;
  background: green;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer;
}

.close-cart {
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
