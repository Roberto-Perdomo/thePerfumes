<template>
  <div>

    <!-- 🔥 Carrito como componente -->
    <Carrito
      :cart="cart"
      :open="cartOpen"
      :total="total"
      :totalItems="cartCount"
      @toggle="cartOpen = !cartOpen"
      @increase="increaseQty"
      @decrease="decreaseQty"
      @pay="goToPayment"

    />

    <!-- Modal de pago -->
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

    <!-- Contenido original del catálogo -->
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
import { ref, computed, watch } from 'vue'
import CatalogSearch from '../components/catalog/CatalogSearch.vue'
import CatalogFilters from '../components/catalog/CatalogFilters.vue'
import ProductsGrid from '../components/catalog/ProductsGrid.vue'
import Carrito from '../components/catalog/Carrito.vue'
import { useRouter } from "vue-router"
const router = useRouter()

/* Base de datos (igual que antes) */
const perfumes = [
  { id: 1, nombre: "Noir Élégance", categoria: "amaderado", precio: 89.99,
    descripcion: "Notas de cedro, vetiver y cuero", volumen: "100ml",
    imagen: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop" },
  { id: 2, nombre: "Arctic Storm", categoria: "fresco", precio: 75.99,
    descripcion: "Cítricos con menta y bergamota", volumen: "100ml",
    imagen: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=500&fit=crop" },
  { id: 3, nombre: "Shadow King", categoria: "oriental", precio: 95.99,
    descripcion: "Ámbar, especias y vainilla oscura", volumen: "100ml",
    imagen: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=500&fit=crop" }
]

/* Estados */
const search = ref('')
const category = ref('todos')

/* Carrito: inicializa desde localStorage si existe */
const CART_KEY = 'cart-data'
const cart = ref(JSON.parse(localStorage.getItem(CART_KEY) || '[]'))

const cartOpen = ref(false)
const showPayment = ref(false)

/* Bandera para evitar que el watcher reescriba justo mientras limpiamos */
const persistenceDisabled = ref(false)

/* Guardar carrito cada vez que cambie (salvo cuando persistenceDisabled = true) */
watch(cart, (value) => {
  if (persistenceDisabled.value) return
  localStorage.setItem(CART_KEY, JSON.stringify(value))
}, { deep: true })

/* Cantidad total */
const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + (item.qty || 0), 0)
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

/* Funciones del carrito */
function addToCart(product) {
  const found = cart.value.find(p => p.id === product.id)
  if (found) found.qty++
  else cart.value.push({ ...product, qty: 1 })
}

function increaseQty(item) {
  item.qty++
}

function decreaseQty(item) {
  if (item.qty > 1) item.qty--
  else cart.value = cart.value.filter(p => p.id !== item.id)
}

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + (item.precio * (item.qty || 0)), 0).toFixed(2)
)

/* Navegar a pago */
function goToPayment() {
  router.push({ path: '/pago', query: { total: total.value } })
}

function completePayment() {
  alert("Pago completado con éxito!")

  // 👇 evita que el watcher vuelva a escribir
  persistenceDisabled.value = true

  // 👇 limpia todo
  cart.value = []
  localStorage.setItem(CART_KEY, JSON.stringify([]))

  // 👇 reactiva persistencia 50ms después 
  setTimeout(() => {
    persistenceDisabled.value = false
  }, 50)

  // Cerrar modales
  showPayment.value = false
  cartOpen.value = false

  // Redirigir si quieres
  router.push('/catalogo')
}

</script>




<style scoped>
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
