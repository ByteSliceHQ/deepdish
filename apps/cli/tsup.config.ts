import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/bin/cli.ts', 'src/bin/bash-complete.ts'],
  format: ['esm'],
  clean: true,
  splitting: true,
  minify: true,
})
