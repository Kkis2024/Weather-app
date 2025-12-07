<template>
 
  <section v-if="data" class="panel">
    <header class="panel-header">
      <h2 class="location">
        {{ data.location.name }}, {{ data.location.country }}
      </h2>
      <p class="updated">Local time: {{ data.localtime }}</p>
    </header>

    <div class="today-main">
      <div class="today-temp">
        <div class="temp-now">
          {{ Math.round(data.current.temp_f) }}°F
        </div>
        <p class="condition">{{ data.current.condition.text }}</p>

        <p class="high-low" v-if="today">
          H: {{ Math.round(today.day.maxtemp_f) }}°F ·
          L: {{ Math.round(today.day.mintemp_f) }}°F
        </p>
      </div>

      <div class="today-extra">
        <p>
          Feels like:
          <strong>{{ Math.round(data.current.feelslike_f) }}°F</strong>
        </p>
        <p>Humidity: <strong>{{ data.current.humidity }}%</strong></p>
        <p>Wind: <strong>{{ data.current.wind_mph }} mph</strong></p>
      </div>
    </div>
  </section>


  <section v-else class="panel">
    <h2>Welcome</h2>
    <p>Search for a city above to see current weather, hourly chart, and 5-day forecast.</p>
  </section>
</template>

<script setup>
import { inject, computed } from 'vue'


const weatherDataRef = inject('weatherData')

const data = computed(() => {
  return weatherDataRef?.value ?? null
})


const today = computed(() => {
  return data.value?.forecast?.forecastday?.[0] ?? null
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