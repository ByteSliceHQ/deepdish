import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/resolver.ts', 'src/json.ts'],
  format: ['cjs', 'esm'],
  dts: true,
})
