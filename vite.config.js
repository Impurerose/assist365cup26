import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig(({ mode }) => {
  if (mode === 'singlefile') {
    return {
      plugins: [react(), viteSingleFile()],
      build: {
        outDir: 'dist-html',
        assetsInlineLimit: 100000000,
        cssCodeSplit: false,
        rollupOptions: {
          output: {
            inlineDynamicImports: true
          }
        }
      }
    }
  }
  
  // Modo desarrollo normal
  return {
    plugins: [react()],
  }
})
