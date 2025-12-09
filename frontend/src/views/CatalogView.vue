<template>
  <div>

    <!-- 🔥 Botón flotante del carrito -->
    <div class="cart-button" @click="cartOpen = !cartOpen">
      🛒 <span class="count">{{ cartCount }}</span>
    </div>

    <!-- 🔥 Panel lateral del carrito -->
    <div class="cart-panel" v-if="cartOpen">
      <h2>Tu Carrito</h2>

      <div v-if="cart.length === 0" class="empty">
        El carrito está vacío.
      </div>

      <div v-for="item in cart" :key="item.id" class="cart-item">
        <img :src="item.imagen" />
        <div class="info">
          <p>{{ item.nombre }}</p>
          <p class="precio">${{ item.precio }}</p>

          <!-- Cantidades -->
          <div class="qty-controls">
            <button @click="decreaseQty(item)">−</button>
            <span>{{ item.qty }}</span>
            <button @click="increaseQty(item)">+</button>
          </div>
        </div>
      </div>

      <!-- Total -->
      <div class="cart-total">
        Total: <strong>${{ total }}</strong>
      </div>

      <button class="pay-btn" @click="showPayment = true">
        Proceder al pago
      </button>

      <button class="close-cart" @click="cartOpen = false">
        Cerrar
      </button>
    </div>

    <!-- 🔥 Modal de pago -->
    <div class="modal" v-if="showPayment">
      <div class="modal-box">
        <h2>Pago</h2>
        <p>Total a pagar: <strong>${{ total }}</strong></p>

        <button class="pay-complete" @click="completePayment">
          Confirmar pago
        </button>

        <button class="modal-close" @click="showPayment = false">
          Cancelar
        </button>
      </div>
    </div>

    <!-- 🔥 CONTENIDO ORIGINAL DEL CATÁLOGO -->
    <div class="container">
      <CatalogSearch v-model="search" />

      <CatalogFilters
        :active="category"
        @change="category = $event"
      />

      <ProductsGrid
        :items="filteredProducts"
        @add-to-cart="addToCart"
      />

      <p v-if="filteredProducts.length === 0" class="no-results">
        No se encontraron fragancias
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* Componentes existentes */
import CatalogSearch from '../components/catalog/CatalogSearch.vue'
import CatalogFilters from '../components/catalog/CatalogFilters.vue'
import ProductsGrid from '../components/catalog/ProductsGrid.vue'

/* Base de datos */
const perfumes = [
  {
    id: 1,
    nombre: "Noir Élégance",
    categoria: "amaderado",
    precio: 89.99,
    descripcion: "Notas de cedro, vetiver y cuero",
    volumen: "100ml",
    imagen: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop"
  },
  {
    id: 2,
    nombre: "Arctic Storm",
    categoria: "fresco",
    precio: 75.99,
    descripcion: "Cítricos con menta y bergamota",
    volumen: "100ml",
    imagen: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=500&fit=crop"
  },
  {
    id: 3,
    nombre: "Shadow King",
    categoria: "oriental",
    precio: 95.99,
    descripcion: "Ámbar, especias y vainilla oscura",
    volumen: "100ml",
    imagen: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=500&fit=crop"
  }
]

/* Estados */
const search = ref('')
const category = ref('todos')

/* 🛒 Carrito */
const cart = ref([])
const cartOpen = ref(false)
const showPayment = ref(false)

/* Total de items */
const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + item.qty, 0)
)

/* Filtrar productos */
const filteredProducts = computed(() => {
  return perfumes.filter(p => {
    const matchesSearch =
      p.nombre.toLowerCase().includes(search.value.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(search.value.toLowerCase())

    const matchesCategory =
      category.value === 'todos' || p.categoria === category.value

    return matchesSearch && matchesCategory
  })
})

/* Agregar al carrito */
function addToCart(product) {
  const found = cart.value.find(p => p.id === product.id)

  if (found) found.qty++
  else cart.value.push({ ...product, qty: 1 })
}

/* + / − cantidad */
function increaseQty(item) {
  item.qty++
}

function decreaseQty(item) {
  if (item.qty > 1) item.qty--
  else cart.value = cart.value.filter(p => p.id !== item.id)
}

/* TOTAL */
const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.precio * item.qty, 0).toFixed(2)
)

/* Completar pago */
function completePayment() {
  alert("Pago completado con éxito!")
  cart.value = []
  showPayment.value = false
  cartOpen.value = false
}
</script>

<style scoped>
/* Botón flotante */
.cart-button {
  position: fixed;
  bottom: auto;
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

/* Panel del carrito */
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

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
}

.modal-box {
  background: white;
  padding: 25px;
  width: 300px;
  border-radius: 10px;
  text-align: center;
}

.pay-complete,
.modal-close {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.pay-complete {
  background: green;
  color: white;
}

.modal-close {
  background: red;
  color: white;
}
</style>
