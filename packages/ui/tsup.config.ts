import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/deepdish.tsx'],
    format: ['esm'],
    sourcemap: true,
    dts: true,
    // TODO: correct target?
    target: 'esnext',
    // NB: the DeepDish component lives at the server-client boundary; therefore, it can't be bundled
    bundle: false,
  },
  // TODO: can we have a utils entrypoint for handling stuff like this?
  {
    entry: ['src/content.ts'],
    format: ['esm'],
    sourcemap: true,
    dts: true,
  },
  {
    entry: [
      'src/config.ts',
      'src/elements/link.tsx',
      'src/elements/media.tsx',
      'src/elements/typography.tsx',
    ],
    format: ['esm'],
    sourcemap: true,
    dts: true,
    // TODO: correct target?
    target: 'esnext',

    // TODO: anyway to bundle these?
    bundle: false,
  },
  {
    entry: ['src/menu/index.tsx'],
    outDir: 'dist/menu',
    format: ['esm'],
    sourcemap: true,
    dts: true,
    // TODO: correct target?
    target: 'esnext',
    external: ['react', 'react-dom', 'next'],
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      }
    },
  },
])
