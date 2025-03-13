import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cms.ts', 'src/vercel/index.ts'],
  format: ['esm'],
  sourcemap: true,
  target: 'esnext',
  dts: true,
})
