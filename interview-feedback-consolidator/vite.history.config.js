/**
 * Vite config — Report History module dev preview only.
 * Does not replace the main app config.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  server: {
    open: '/history-dev.html',
    port: 5174,
  },
  build: {
    rollupOptions: {
      input: {
        history: 'history-dev.html',
      },
    },
  },
})
