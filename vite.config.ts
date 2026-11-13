import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// The app is published at https://ellieboy112.github.io/kuryente-tracker/
// so every asset URL must start with /kuryente-tracker/.
// The production build goes to /docs, which GitHub Pages serves directly.
export default defineConfig({
  plugins: [react()],
  base: '/kuryente-tracker/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  test: {
    environment: 'node',
  },
})
