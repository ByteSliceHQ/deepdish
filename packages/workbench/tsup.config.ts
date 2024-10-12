import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/workbench.tsx'],
    external: ['react', 'react-dom'],
    format: ['esm'],
    sourcemap: true,
    dts: true,
    bundle: false,
    target: 'esnext',
  },
  {
    entry: ['src/client.tsx'],
    external: ['react', 'react-dom'],
    format: ['esm'],
    sourcemap: true,
    dts: true,
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      }
    },
  },
])
