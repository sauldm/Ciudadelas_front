import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


    export default defineConfig({
      plugins: [react()], // Include your framework's plugin
      define: {
        global: 'window',
      },
    });
    