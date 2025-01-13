/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';


// https://vitejs.dev/config/
export default defineConfig({

  server: {
    watch: {
      ignored: ["**/node_modules/**", "**/coverage/**", "**/dist/**", "**/build/**", "**/public/**"]
    }
  },
  // manualChunks
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          'react': ['react', 'react-dom'],
          'react-router-dom': ['react-router-dom'],
          "mui-icons": ['@mui/icons-material'],
          "mui-system": ['@mui/system'],
          "mui-components": ["@mui/material/Typography", "@mui/material/Box", "@mui/material/Paper", "@mui/material/Avatar", "@mui/material/Container", "@mui/material/TextField", "@mui/material/Pagination", "@mui/material/InputLabel", "@mui/material/FormControl", "@mui/material/Select"],
          'mui': ['@mui/material'],
          "react-material-ui-carousel": ['react-material-ui-carousel'],
        }
      },
      external: ["coverage"]
    }
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, '/src/components'),
      '@assets': resolve(__dirname, '/src/assets'),
      '@': resolve(__dirname, '/src'),
      '@css': resolve(__dirname, '/src/css'),
      '@pages': resolve(__dirname, '/src/pages'),
    }
  },
})
