import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/context.tsx'],
    format: ['esm'],
    sourcemap: true,
    dts: true,
    target: 'esnext',
  },
])
