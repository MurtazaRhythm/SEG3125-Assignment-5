import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub repo name for GitHub Pages hosting
export default defineConfig({
  plugins: [react()],
  base: '/SEG3125-Assignment-5/',
})
