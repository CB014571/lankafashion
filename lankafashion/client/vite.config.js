// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/lankafashion/', // 👈 Needed for GitHub Pages to resolve paths
  plugins: [react()],
});
