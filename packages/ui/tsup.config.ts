import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/config.ts',
    'src/deepdish.tsx',
    'src/link.tsx',
    'src/media.tsx',
    'src/typography.tsx',
  ],
  format: ['cjs', 'esm'],
})
