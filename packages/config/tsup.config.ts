import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/config.ts', 'src/schemas.ts'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  dts: true,
})
