import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 2001,
    //port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:2002',
        //target: 'http://localhost:6000',
      },

      '/uploads': {
        target: 'http://localhost:2002',
        //target: 'http://localhost:6000',
      },
    },
    // hmr: {
    //   overlay: false,
    // },
  },
})
