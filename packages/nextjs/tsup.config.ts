import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/middleware.ts'],
  clean: true,
  format: ['esm'],
  sourcemap: true,
  dts: true,
})
