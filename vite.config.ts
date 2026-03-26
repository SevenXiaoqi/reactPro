import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 👇 配置别名（核心）
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 可加多个：
      // '@components': path.resolve(__dirname, './src/components'),
    }
  }
})
