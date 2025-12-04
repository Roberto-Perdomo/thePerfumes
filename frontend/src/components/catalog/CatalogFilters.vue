<template>
  <div class="filters">
    <button
      v-for="f in filtros"
      :key="f.value"
      class="filter-btn"
      :class="{ active: active === f.value }"
      @click="$emit('change', f.value)"
    >
      {{ f.label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  active: String
})

const filtros = [
  { label: "Todos", value: "todos" },
  { label: "Frescos", value: "fresco" },
  { label: "Amaderados", value: "amaderado" },
  { label: "Orientales", value: "oriental" }
]
</script>
