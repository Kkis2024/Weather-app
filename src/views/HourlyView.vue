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
  Legend,
  BarElement
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
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
        borderColor: '#4fc3f7',           
        backgroundColor: '#4fc3f7',
        borderWidth: 3,
        pointRadius: 4,                   
        pointHoverRadius: 6,
        pointBackgroundColor: '#ffffff',  
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Rain (mm)',
        data: rainMm,
        type: 'bar',
        backgroundColor: 'rgba(173, 216, 230, 0.8)', 
        borderColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
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
      title: { display: true, text: '°F' },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#ffffff'
      }
    },
    y1: {
      type: 'linear',
      position: 'right',
      title: { display: true, text: 'mm' },
      grid: { drawOnChartArea: false },
      ticks: {
        color: '#ffffff'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#ffffff'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#ffffff',
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