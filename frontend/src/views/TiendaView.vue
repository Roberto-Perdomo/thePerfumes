<template>
      <!--   eso es una pagina completa -->
  <div class="tienda-container">
    <h1 class="titulo">Nuestra Tienda 🛍️</h1>

    <div class="productos-grid">

      <div 
        v-for="(p, i) in productos" 
        :key="i" 
        class="producto-card">

        <img :src="p.img" alt="" class="producto-img" />

        <h3>{{ p.nombre }}</h3>
        <p class="precio">${{ p.precio }}</p>

        <button class="btn-agregar">
          Añadir al carrito
        </button>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const productos = ref([
  {
    nombre: "Perfume Dior Sauvage",
    precio: 80,
    img: "https://via.placeholder.com/200"
  },
  {
    nombre: "Perfume Bleu de Chanel",
    precio: 95,
    img: "https://via.placeholder.com/200"
  },
  {
    nombre: "Carolina Herrera 212",
    precio: 65,
    img: "https://via.placeholder.com/200"
  },
])
</script>

<style scoped>
.tienda-container {
  padding: 20px;
}

.titulo {
  text-align: center;
  margin-bottom: 20px;
}

.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.producto-card {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
  transition: 0.2s;
}

.producto-img {
  width: 100%;
  border-radius: 8px;
}

.producto-card:hover {
  transform: translateY(-4px);
}

.precio {
  font-size: 18px;
  color: #4f7cff;
  margin: 5px 0;
}

.btn-agregar {
  background: #4f7cff;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-agregar:hover {
  background: #3a5bd9;
}
</style>
