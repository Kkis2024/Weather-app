import axios from 'axios';

const API_KEY = 'ce933be7350f472990a193801250212'; 

export async function getWeather(query) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&days=5&aqi=no&alerts=no`

  const response = await axios.get(url)
  return response.data
}