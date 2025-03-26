import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@assets': path.resolve(__dirname, './assets'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  base: '/Jay-X-AI/', // Replace with your repository name
});