<script setup>
import { ref, provide, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import SearchBar from './components/SearchBar.vue'
import SavedLocations from './components/SavedLocations.vue'
import { getWeather } from './services/weatherService'

const weatherData = ref(null)
const currentLocation = ref('')


async function handleSearch(query) {
  try {
    const data = await getWeather(query)
    weatherData.value = data
    currentLocation.value = data.location.name
  } catch (error) {
    console.error(error)
    alert('Could not find that location. Please try again.')
  }
}


const savedLocations = ref([])

if (localStorage.getItem('savedLocations')) {
  savedLocations.value = JSON.parse(localStorage.getItem('savedLocations'))
}

function updateLocalStorage() {
  localStorage.setItem('savedLocations', JSON.stringify(savedLocations.value))
}

function saveCurrentLocation() {
  if (!weatherData.value) return
  const name = weatherData.value.location.name

  if (!savedLocations.value.includes(name)) {
    savedLocations.value.push(name)
    updateLocalStorage()
  }
}

function loadSavedLocation(loc) {
  handleSearch(loc)
}

function removeLocation(loc) {
  savedLocations.value = savedLocations.value.filter(l => l !== loc)
  updateLocalStorage()
}

const hasWeatherData = computed(() => !!weatherData.value)


const backgroundClass = computed(() => {
  const data = weatherData.value
  if (!data || !data.current || !data.location) return 'bg-default'

  const condition = data.current.condition.text.toLowerCase()
  const tempF = data.current.temp_f
  const isDay = data.current.is_day === 1

  if (condition.includes('rain')) return 'bg-rain'
  if (tempF < 41) return 'bg-cold'   // < ~5°C
  if (tempF > 77) return 'bg-warm'   // > ~25°C

  return isDay ? 'bg-day' : 'bg-night'
})


provide('weatherData', weatherData)
provide('currentLocation', currentLocation)
provide('savedLocations', savedLocations)
</script>

<template>
  <div :class="['app', backgroundClass]">
    <div class="shell">
      <header class="top-bar">
        <div class="brand">
          <h1 class="app-title">Clear Sky Weather App</h1>
          <p class="welcome-subtitle">
            Welcome to Clear Sky, your weather app for quick, accurate forecasts. Search by city or ZIP code and save locations to view current weather, hourly trends, and a 3-day outlook.
          </p>
        </div>

        <nav class="nav">
          <RouterLink to="/">Today</RouterLink>
          <RouterLink to="/hourly">Hourly</RouterLink>
          <RouterLink to="/forecast">3 Day</RouterLink>
        </nav>
      </header>

      <section class="controls">
        <SearchBar @search="handleSearch" />
  
        <button
          class="save-btn"
          v-if="hasWeatherData"
          @click="saveCurrentLocation"
        >
          Save location
        </button>
      </section>

      <section class="layout">
        <aside class="sidebar">
          <SavedLocations
            :locations="savedLocations"
            @select="loadSavedLocation"
            @remove="removeLocation"
          />
        </aside>

        <main class="card">
          <RouterView />
        </main>
      </section>
    </div>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  color: #f9fafb;
}

.shell {
  min-height: 100vh;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.9),
    rgba(30, 64, 175, 0.7)
  );
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.brand {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.app-title {
  font-size: 1.4rem;
  font-weight: 600;
}

.welcome-subtitle {
  font-size: 0.85rem;
  opacity: 0.85;
  margin-top: -0.1rem;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav a {
  color: #e5e7eb;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav a:hover {
  background: rgba(255, 255, 255, 0.15);
}

.nav a.router-link-active {
  background: #38bdf8;
  color: #0f172a;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.save-btn {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: none;
  background: #9cdffc;
  color: #0f172a;
  font-weight: 600;
  cursor: pointer;
}

.save-btn:hover {
  filter: brightness(1.1);
}

.layout {
  display: flex;
  gap: 1.5rem;
  flex: 1;
  min-height: 0;
}

.sidebar {
  width: 230px;
  max-width: 100%;
  background: rgba(15, 23, 42, 0.85);
  border-radius: 1rem;
  padding: 1rem;
  overflow-y: auto;
}

.card {
  flex: 1;
  background: rgba(15, 23, 42, 0.95);
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 18px 45px rgba(110, 129, 175, 0.7);
  overflow-y: auto;
}

.bg-default {
  background: #1e293b;
}

.bg-day {
  background-image: url('/images/day.jpg');
}

.bg-night {
  background-image: url('/images/night.jpg');
}

.bg-rain {
  background-image: url('/images/rain.jpg');
}

.bg-cold {
  background-image: url('/images/cold.jpg');
}

.bg-warm {
  background-image: url('/images/warm.jpg');
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }
}
</style>