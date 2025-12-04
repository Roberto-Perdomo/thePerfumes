<template>
  <div>
    <!-- Sección "hero" del catálogo -->
    <CatalogHero />

    <div class="container">
      <!-- Componente de búsqueda con v-model enlazado a 'search' -->
      <CatalogSearch v-model="search" />

      <!-- Componente de filtros de categorías -->
      <!-- Recibe la categoría activa y emite el cambio -->
      <CatalogFilters
        :active="category"
        @change="category = $event"
      />

      <!-- Grid de productos filtrados -->
      <!-- items: lista filtrada -->
      <!-- @add-to-cart: evento para agregar al carrito -->
      <ProductsGrid
        :items="filteredProducts"
        @add-to-cart="addToCart"
      />

      <!-- Mensaje si no hay ningún resultado -->
      <p v-if="filteredProducts.length === 0" class="no-results">
        No se encontraron fragancias
      </p>
    </div>
  </div>
</template>

<script setup>
/* Importación de utilidades reactivas de Vue 3 */
import { ref, computed } from 'vue'

/* Componentes del catálogo */
import CatalogSearch from '../components/catalog/CatalogSearch.vue'
import CatalogFilters from '../components/catalog/CatalogFilters.vue'
import ProductsGrid from '../components/catalog/ProductsGrid.vue'

/* Base de datos local simulada con perfumes */
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

/* Estado reactivo para el texto de búsqueda */
const search = ref('')

/* Estado reactivo para la categoría seleccionada (por defecto "todos") */
const category = ref('todos')

/*
  Computed que devuelve la lista filtrada según:
  - Texto de búsqueda
  - Categoría seleccionada
*/
const filteredProducts = computed(() => {
  return perfumes.filter(p => {
    // Coincidencia con la búsqueda por nombre o descripción
    const matchesSearch =
      p.nombre.toLowerCase().includes(search.value.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(search.value.toLowerCase())

    // Coincidencia por categoría (o todas)
    const matchesCategory =
      category.value === 'todos' || p.categoria === category.value

    // Solo devuelve los que cumplen ambos filtros
    return matchesSearch && matchesCategory
  })
})

/* Función para manejar agregar al carrito */
function addToCart(product) {
  alert(product.nombre + " agregado al carrito!")
}
</script>
