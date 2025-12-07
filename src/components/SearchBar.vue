<template>
  <form @submit.prevent="submitSearch">
    <input 
      v-model="searchInput"
      type="text"
      placeholder="Search city or ZIP"
    />
    <button type="submit">Search</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const searchInput = ref('');
const emit = defineEmits(['search']);

function submitSearch() {
  if (!searchInput.value.trim()) return;
  emit('search', searchInput.value.trim());
  searchInput.value = '';
}
</script>

<style scoped>
form {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

input {
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  border: none;
  font-size: 1rem;
}

button {
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: none;
  background: #38bdf8;
  color: #0f172a;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  filter: brightness(1.1);
}
</style>