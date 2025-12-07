<script setup>
import { inject } from 'vue'

const weatherData = inject('weatherData')
</script>

<template>
  <div v-if="weatherData && weatherData.forecast">
    <h1>5 Day Forecast</h1>

    <table class="forecast-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Condition</th>
          <th>High (°F)</th>
          <th>Low (°F)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="day in weatherData.forecast.forecastday"
          :key="day.date"
        >
          <td>{{ day.date }}</td>

          <td class="condition-cell">
            <img
              :src="day.day.condition.icon"
              :alt="day.day.condition.text"
            />
            <span>{{ day.day.condition.text }}</span>
          </td>

          <td>{{ Math.round(day.day.maxtemp_f) }}</td>
          <td>{{ Math.round(day.day.mintemp_f) }}</td>
        </tr>
     </tbody>
    </table>
  </div>

  <div v-else>
    <h2>Please search for a location to view the 5-day forecast.</h2>
  </div>
</template>

<style scoped>
.forecast-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: rgba(15, 23, 42, 0.8);
  color: white;
}

.forecast-table th,
.forecast-table td {
  border: 1px solid #475569;
  padding: 0.5rem 0.75rem;
  text-align: left;
}

.forecast-table th {
  background: #020617;
}

.condition-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.condition-cell img {
  width: 32px;
  height: 32px;
}
</style>