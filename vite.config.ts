import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: ["1om2mzbw-qnkubaiz-x6lmk5ykhyay.acb2-preview.marscode.dev", "1om2mzbw-qnkubaiz-x6lmk5ykhyay.acb2-preview.marscode.dev"]
  }
})