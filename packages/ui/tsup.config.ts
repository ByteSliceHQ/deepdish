import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/content.ts'],
    format: ['esm'],
    sourcemap: true,
    dts: true,
  },
  {
    entry: [
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
  {
    entry: ['src/menu/index.tsx'],
    outDir: 'dist/menu',
    format: ['esm'],
    sourcemap: true,
    dts: true,
    target: 'esnext',
    external: ['react', 'react-dom', 'next'],
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      }
    },
  },
])
