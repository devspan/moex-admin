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
  build: {
    target: 'esnext',
    outDir: 'dist'
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'https://cex.cryptodevworks.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Set required headers
            proxyReq.setHeader('Origin', 'https://cex.cryptodevworks.com');
            proxyReq.setHeader('Referer', 'https://cex.cryptodevworks.com/');
            proxyReq.setHeader('X-Requested-From', 'admin');
            
            // Handle preflight requests
            if (req.method === 'OPTIONS') {
              proxyReq.setHeader('Access-Control-Request-Method', 'POST, GET, PUT, DELETE, PATCH');
              proxyReq.setHeader('Access-Control-Request-Headers', 'content-type, authorization, x-requested-from');
            }
          });

          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Add CORS headers to response
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-From';
            proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
          });
        }
      }
    }
  }
}) 