import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' -> relativni asset putevi (radi i na root domenu i na GitHub Pages subpath)
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        hvala: 'hvala.html',
        pocetna: 'pocetna.html',
        kontakt: 'kontakt.html',
      },
    },
  },
})
