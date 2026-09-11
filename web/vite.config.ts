import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const apiTarget = loadEnv(mode, process.cwd(), '').VITE_API_TARGET ?? 'http://localhost:5239'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      // O progresso vive em localStorage, que é por origem. Sem strictPort o Vite cai para 5174
      // quando 5173 está ocupada, e a troca de origem faz o progresso parecer ter sumido.
      // Falhar alto é melhor: aí dá para matar o processo antigo e manter a mesma origem.
      strictPort: true,
      // Proxying keeps the browser on a single origin, so there is no CORS dance in development.
      proxy: {
        '/api': { target: apiTarget, changeOrigin: true },
      },
    },
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1500,
    },
  }
})
