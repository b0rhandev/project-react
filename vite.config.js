import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 👈 این خط اضافه شد

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // 👈 تیلویند به لیست پلاگین‌ها اضافه شد
  base: '/project-react/', 
})