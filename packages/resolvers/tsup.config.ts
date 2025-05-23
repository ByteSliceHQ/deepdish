import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/resolver.ts', 'src/json.ts'],
  format: ['esm'],
  sourcemap: true,
  target: 'esnext',
  dts: true,
})
