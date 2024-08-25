import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/result.ts', 'src/utils.ts'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  dts: true,
})
