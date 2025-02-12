import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cms.ts'],
  format: ['esm'],
  sourcemap: true,
  dts: true,
})
