import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/middleware.ts'],
  format: ['esm'],
  sourcemap: true,
  dts: true,
})