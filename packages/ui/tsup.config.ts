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
    entry: ['src/config/components.tsx', 'src/deepdish.tsx'],
    format: ['esm'],
    sourcemap: true,
    dts: true,
    target: 'esnext',

    // NB: the DeepDish component lives at the server-client boundary;
    // it, and the components that depend on it, can't be bundled
    bundle: false,
  },
  {
    entry: ['src/menu.tsx'],
    format: ['esm'],
    sourcemap: true,
    dts: true,
    target: 'esnext',
    external: ['react', 'react-dom'],
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      }
    },
  },
])
