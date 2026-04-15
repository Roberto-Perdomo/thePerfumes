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
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from "vue-router"

import CatalogSearch from '../components/catalog/CatalogSearch.vue'
import CatalogFilters from '../components/catalog/CatalogFilters.vue'
import ProductsGrid from '../components/catalog/ProductsGrid.vue'
import Carrito from '../components/catalog/Carrito.vue'

/* ================================
   🔥 RECIBIR USER DESDE APP.VUE
================================ */

const props = defineProps({
  user: Object
})

const user = computed(() => props.user)

const router = useRouter()

/* ================================
   PRODUCTOS DESDE BACKEND
================================ */

const perfumes = ref([])

onMounted(async () => {

  // https://theperfumes.onrender.com/products  produccion 
  // http://localhost:3000//products local 
  try {
       
    const res = await fetch("https://theperfumes.onrender.com/products ")

    if (!res.ok) {
      throw new Error("Error en la respuesta del servidor")
    }

    const data = await res.json()
    perfumes.value = Array.isArray(data) ? data : []

    console.log("Productos cargados:", perfumes.value)

  } catch (err) {
    console.error("Error cargando productos:", err)
  }
})

/* ================================
   FILTROS
================================ */

const search = ref('')
const category = ref('todos')

const filteredProducts = computed(() => {
  return perfumes.value.filter(p => {
    const nombre = p.nombre?.toLowerCase() || ''
    const descripcion = p.descripcion?.toLowerCase() || ''
    const categoria = p.categoria || ''

    const matchesSearch =
      nombre.includes(search.value.toLowerCase()) ||
      descripcion.includes(search.value.toLowerCase())

    const matchesCategory =
      category.value === 'todos' || categoria === category.value

    return matchesSearch && matchesCategory
  })
})

/* ================================
   CARRITO (POR USUARIO)
================================ */

const cart = ref([])
const cartOpen = ref(false)

/* 🔥 Generar key dinámica */
function getCartKey() {
  return user.value
    ? `cart-user-${user.value.id}`
    : 'cart-guest'
}

/* 🔥 Cargar carrito correcto */
function loadCart() {
  const key = getCartKey()
  cart.value = JSON.parse(localStorage.getItem(key) || '[]')
}

/* 🔥 Guardar carrito correcto */
function saveCart() {
  const key = getCartKey()
  localStorage.setItem(key, JSON.stringify(cart.value))
}

/* Cargar al montar */
onMounted(() => {
  loadCart()
})

/* Guardar cuando cambie */
watch(cart, () => {
  saveCart()
}, { deep: true })

/* 🔥 Cuando cambie el usuario */
watch(user, () => {
  loadCart()
  cartOpen.value = false
})

/* ================================
   COMPUTED
================================ */

const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + (item.qty || 0), 0)
)

const total = computed(() =>
  cart.value
    .reduce((sum, item) => sum + (item.precio * (item.qty || 0)), 0)
    .toFixed(2)
)

/* ================================
   FUNCIONES CARRITO
================================ */

function addToCart(product) {
  const found = cart.value.find(p => p.id === product.id)

  if (found) {
    found.qty++
  } else {
    cart.value.push({ ...product, qty: 1 })
  }
}

function increaseQty(item) {
  item.qty++
}

function decreaseQty(item) {
  if (item.qty > 1) {
    item.qty--
  } else {
    cart.value = cart.value.filter(p => p.id !== item.id)
  }
}

/* ================================
   PAGO
================================ */

function goToPayment() {
  router.push({ path: '/pago', query: { total: total.value } })
}
</script>

<style scoped>
.no-results {
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
}
</style>