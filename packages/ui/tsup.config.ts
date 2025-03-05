import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/config/config.ts', 'src/content.ts'],
    format: ['esm'],
    sourcemap: true,
    target: 'esnext',
    dts: true,
  },
  {
    entry: [
      'src/config/components.tsx',
      'src/deepdish.tsx',
      'src/elements/link.tsx',
      'src/elements/media.tsx',
      'src/elements/typography.tsx',
    ],
    format: ['esm'],
    sourcemap: true,
    dts: true,
    target: 'esnext',

    // NB: the DeepDish component lives at the server-client boundary;
    // it, and the components that depend on it, can't be bundled
    bundle: false,
  },
])
