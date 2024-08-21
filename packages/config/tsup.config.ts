import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/config.ts'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  dts: true,
})
