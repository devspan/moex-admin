import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
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
        '/apiadmin': {
          target: 'https://cex.cryptodevworks.com',
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Proxy Request:', {
                url: proxyReq.path,
                method: proxyReq.method,
                headers: proxyReq.getHeaders()
              });

              proxyReq.setHeader('Origin', 'https://cex.cryptodevworks.com');
              proxyReq.setHeader('Referer', 'https://cex.cryptodevworks.com/');
              proxyReq.setHeader('X-Requested-From', 'admin');
              proxyReq.setHeader('Content-Type', 'application/json');
            });

            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log('Proxy Response:', {
                status: proxyRes.statusCode,
                headers: proxyRes.headers
              });
            });

            proxy.on('error', (err, req, res) => {
              console.error('Proxy Error:', err);
            });
          }
        }
      }
    }
  }
}) 