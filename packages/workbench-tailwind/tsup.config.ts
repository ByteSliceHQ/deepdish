import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/lib.tsx'],
  external: ['react', 'react-dom'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'esnext',
})
