import path from "path"
import { fileURLToPath } from 'url'
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'ui-vendor': ['react-router-dom', 'framer-motion', 'react-toastify'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'form-vendor': ['react-datepicker', '@emailjs/browser'],
          
          // Feature-based chunks
          'dashboard': [
            './src/pages/Dashboard/Dashboard.jsx',
            './src/pages/Dashboard/sub-components/AuctionItemDelete.jsx',
            './src/pages/Dashboard/sub-components/BiddersAuctioneersGraph.jsx',
            './src/pages/Dashboard/sub-components/PaymentGraph.jsx',
            './src/pages/Dashboard/sub-components/PaymentProofs.jsx'
          ],
          
          // Store chunks
          'store': [
            './src/store/store.js',
            './src/store/slices/userSlice.js',
            './src/store/slices/auctionSlice.js',
            './src/store/slices/bidSlice.js',
            './src/store/slices/commissionSlice.js',
            './src/store/slices/superAdminSlice.js'
          ]
        },
        chunkFileNames: (chunkInfo) => {
          return chunkInfo.name === 'vendor' 
            ? 'assets/vendor-[hash].js'
            : 'assets/[name]-[hash].js';
        }
      },
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },
})