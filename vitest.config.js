import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/__tests__/frontend/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    environment: 'jsdom',
  },
})