import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import windiCSS from 'vite-plugin-windicss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    proxy: {
      '/tenapi': {
        target: 'https://tenapi.cn',
        changeOrigin: true,
        rewrite(path) {
          return path.replace(/^\/tenapi/, '')
        },
      },
      '/vvhan': {
        target: 'https://api.vvhan.com',
        changeOrigin: true,
        rewrite(path) {
          return path.replace(/^\/vvhan/, '')
        },
      }
    }
  },
  plugins: [
    react(),
    windiCSS(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

})
