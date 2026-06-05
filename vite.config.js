import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
  },
  optimizeDeps: {
    // Pre-bundling with esbuild hangs on Node 26 — esbuild's
    // pre-bundler pulls in a Node-API that no longer matches.
    // Skipping it just means Vite serves deps as raw ESM, which
    // is slower to first-render but otherwise identical.
    noDiscovery: true,
    include: [],
  },
})
