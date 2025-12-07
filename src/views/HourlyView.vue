<script setup>
import { inject, computed } from 'vue'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'


ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

const weatherData = inject('weatherData')


const chartData = computed(() => {
  if (!weatherData?.value) return null

  const hours = weatherData.value.forecast.forecastday[0].hour

  const labels = hours.map(h => h.time.slice(11)) 
  const tempsF = hours.map(h => h.temp_f)        
  const rainMm = hours.map(h => h.precip_mm)

  return {
    labels,
    datasets: [
      {
        label: 'Temperature (°F)',
        data: tempsF,
        borderWidth: 2,
        tension: 0.3,
        yAxisID: 'y'
      },
      {
        label: 'Rain (mm)',
        data: rainMm,
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.3,
        yAxisID: 'y1'
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false
  },
  scales: {
    y: {
      type: 'linear',
      position: 'left',
      title: { display: true, text: '°F' }
    },
    y1: {
      type: 'linear',
      position: 'right',
      title: { display: true, text: 'mm' },
      grid: { drawOnChartArea: false }
    }
  },
  plugins: {
    legend: {
      labels: {
        font: { size: 12 }
      }
    }
  }
}
</script>

<template>
  <section class="panel">
    <h2>Hourly Weather (Today)</h2>

    <Line
      v-if="chartData"
      :data="chartData"
      :options="chartOptions"
    />

    <p v-else>Please search for a location first.</p>
  </section>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>