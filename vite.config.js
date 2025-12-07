import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


const repoName = 'https://github.com/Kkis2024/Weather-app.git'

export default defineConfig({
  plugins: [vue()],
  base: `/${repoName}/`
})