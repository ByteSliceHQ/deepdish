import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/context.tsx', 'src/shell.tsx'],
    clean: true,
    format: ['esm'],
    sourcemap: true,
    dts: true,
    target: 'esnext',
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      }
    },
  },
])
