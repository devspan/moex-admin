import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '^/api/': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log('Proxy Request:', {
            original: path,
            fullUrl: `http://localhost:8000${path}`
          });
          return path;
        },
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            proxyReq.setHeader('Origin', 'http://localhost:8000');
            proxyReq.setHeader('Referer', 'http://localhost:8000/');
            proxyReq.setHeader('X-Requested-From', 'admin');
          });
        }
      }
    }
  }
}) 