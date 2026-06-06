import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
  },
  optimizeDeps: {
    // react-redux is shipped as ESM (.mjs) but its dep
    // use-sync-external-store/with-selector.js is CJS — the browser
    // cannot load CJS, so the import fails with
    //   "Importing binding name 'useSyncExternalStoreWithSelector' is not found"
    // Vite's esbuild pre-bundler normally converts CJS to ESM. We force
    // just the problem packages through pre-bundling here.
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-redux',
      'react-router',
      '@reduxjs/toolkit',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      'use-sync-external-store',
      'use-sync-external-store/with-selector',
    ],
  },
})
