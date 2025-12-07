import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HourlyView from '../views/HourlyView.vue'
import ForecastView from '../views/ForecastView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/hourly', name: 'hourly', component: HourlyView },
  { path: '/forecast', name: 'forecast', component: ForecastView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router