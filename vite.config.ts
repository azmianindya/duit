import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import Generouted from '@generouted/react-router/plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), Generouted()],
})
