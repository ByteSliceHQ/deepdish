import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/stylesheet.ts'],
  format: ['esm'],
  sourcemap: true,
  target: 'esnext',
  dts: true,
})
