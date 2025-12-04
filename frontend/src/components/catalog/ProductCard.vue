<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="item.imagen" :alt="item.nombre" />
      <div class="volume-badge">{{ item.volumen }}</div>
    </div>

    <div class="product-info">
      <h3 class="product-name">{{ item.nombre }}</h3>
      <p class="product-description">{{ item.descripcion }}</p>

      <div class="product-footer">
        <span class="product-price">${{ item.precio }}</span>

        <button class="add-to-cart" @click="$emit('add')">
          🛒 AÑADIR
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object
})

defineEmits(['add'])
</script>
