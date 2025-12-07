<template>
  <div class="saved-list" v-if="locations.length">
    <h2>Saved Locations</h2>

    <ul>
      <li v-for="loc in locations" :key="loc">
        <button @click="select(loc)">{{ loc }}</button>
        <button class="delete" @click="remove(loc)">✕</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  locations: { type: Array, default: () => [] }
});

const emit = defineEmits(['select', 'remove']);

function select(loc) {
  emit('select', loc);
}

function remove(loc) {
  emit('remove', loc);
}
</script>

<style scoped>
.saved-list {
  padding: 1rem;
}

.saved-list ul {
  list-style: none;
  padding: 0;
}

.saved-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
}

button.delete {
  background: rgb(221, 130, 130);
  color: white;
  border: none;
  border-radius: 2cm;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
}
</style>