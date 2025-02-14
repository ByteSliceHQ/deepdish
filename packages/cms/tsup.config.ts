import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cms.ts', 'src/typography/index.ts', 'src/vercel/index.ts'],
  format: ['esm'],
  sourcemap: true,
  dts: true,
})
