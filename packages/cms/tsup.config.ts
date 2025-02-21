import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: [
      'src/cms.ts',
      'src/vercel.ts',
      'src/middleware.ts',
      'src/container.tsx',
    ],
    format: ['esm'],
    sourcemap: true,
    target: 'esnext',
    dts: true,
    clean: true,

    bundle: false,
  },
  {
    entry: ['src/provider.tsx'],
    format: ['esm'],
    sourcemap: true,
    dts: true,
    target: 'esnext',
    clean: true,
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      }
    },
  },
])
