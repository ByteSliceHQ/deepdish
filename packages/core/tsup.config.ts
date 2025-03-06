import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/context.tsx', 'src/schema.ts', 'src/shell.tsx'],
    format: ['esm'],
    sourcemap: true,
    dts: true,
    target: 'esnext',
  },
])
