import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/workbench.tsx'],
    external: ['react', 'react-dom'],
    format: ['cjs', 'esm'],
    sourcemap: true,
    dts: true,
    bundle: false,
  },
  {
    entry: ['src/client.tsx'],
    external: ['react', 'react-dom'],
    format: ['cjs', 'esm'],
    sourcemap: true,
    dts: true,
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      }
    },
  },
])
