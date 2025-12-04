<template>
  <div class="products-grid">
    <ProductCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      @add="()=> $emit('add-to-cart', item)"
    />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  items: Array
})

defineEmits(['add-to-cart'])
</script>
