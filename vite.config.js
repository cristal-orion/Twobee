import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split big vendors into separate, long-cacheable chunks so a copy
        // tweak doesn't bust react/gsap/framer-motion in the user's cache.
        manualChunks: {
          react: ['react', 'react-dom'],
          gsap: ['gsap', 'gsap/ScrollTrigger', 'gsap/ScrollSmoother', '@gsap/react'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
