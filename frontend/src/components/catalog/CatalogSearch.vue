<template>
  <div class="search-box">
    <span class="search-icon">🔍</span>
    <input
      type="text"
      placeholder="Buscar fragancias..."
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
