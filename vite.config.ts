/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, '/src/components'),
      '@assets': resolve(__dirname, '/src/assets'),
      '@': resolve(__dirname, '/src'),
      '@css': resolve(__dirname, '/src/css'),
      '@pages': resolve(__dirname, '/src/pages'),
    }
  }
})
