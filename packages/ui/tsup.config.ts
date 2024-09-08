import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/config.ts',
    'src/deepdish.tsx',
    'src/elements/link.tsx',
    'src/elements/media.tsx',
    'src/elements/typography.tsx',
  ],
  format: ['cjs', 'esm'],
  sourcemap: true,
  dts: true,
})
