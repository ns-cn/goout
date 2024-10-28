import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/', // 确保使用正确的基础路径
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist', // 改回使用前端项目内的 dist 目录
    sourcemap: true,
    assetsDir: 'assets' // 确保资源文件输出到 assets 目录
  }
})
