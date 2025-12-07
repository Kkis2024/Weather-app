<template>
  <!-- Show weather ONLY if real data exists -->
  <section v-if="hasWeatherData" class="panel">
    <header class="panel-header">
      <h2 class="location">
        {{ weatherData.value.location.name }}, {{ weatherData.value.location.country }}
      </h2>
      <p class="updated">Local time: {{ weatherData.value.location.localtime }}</p>
    </header>

    <div class="today-main">
      <div class="today-temp">
        <div class="temp-now">
          {{ Math.round(weatherData.value.current.temp_f) }}°F
        </div>
        <p class="condition">{{ weatherData.value.current.condition.text }}</p>

        <p class="high-low" v-if="today">
          H: {{ Math.round(today.day.maxtemp_f) }}°F ·
          L: {{ Math.round(today.day.mintemp_f) }}°F
        </p>
      </div>

      <div class="today-extra">
        <p>Feels like:
          <strong>{{ Math.round(weatherData.value.current.feelslike_f) }}°F</strong>
        </p>
        <p>Humidity: <strong>{{ weatherData.value.current.humidity }}%</strong></p>
        <p>Wind: <strong>{{ weatherData.value.current.wind_mph }} mph</strong></p>
      </div>
    </div>
  </section>

  <!-- Show welcome screen BEFORE first search -->
  <section v-else class="panel">
    <h2>Welcome</h2>
    <p>Search for a city above to see current weather, hourly chart, and 5-day forecast.</p>
  </section>
</template>

<script setup>
import { inject, computed } from 'vue'

const weatherData = inject('weatherData')

/* Only true if data exists AND contains a city name */
const hasWeatherData = computed(() => {
  return !!(
    weatherData.value &&
    weatherData.value.location &&
    weatherData.value.location.name
  )
})

const today = computed(() => {
  return weatherData?.value?.forecast?.forecastday?.[0] ?? null
})
</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.panel-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.location {
  font-size: 1.5rem;
  font-weight: 600;
}

.updated {
  font-size: 0.8rem;
  opacity: 0.8;
}

.today-main {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.today-temp {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.temp-now {
  font-size: 3rem;
  font-weight: 700;
}

.condition {
  font-size: 1.1rem;
}

.high-low {
  font-size: 0.95rem;
  opacity: 0.9;
}

.today-extra {
  font-size: 0.9rem;
  opacity: 0.95;
}

.today-extra p {
  margin: 0.15rem 0;
}
</style>