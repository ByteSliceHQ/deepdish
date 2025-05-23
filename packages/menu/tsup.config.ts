import fs from 'node:fs/promises'
import { defineConfig } from 'tsup'

function prepareCssForShadowDom(css: string) {
  return css.replaceAll(':root', ':host').replaceAll('\\', '\\\\')
}

async function createCssGetter() {
  const css = await fs.readFile('./dist/menu.css', 'utf-8')

  // TODO: minification and other optimizations
  const file = `
    export function getCss() {
      return \`${prepareCssForShadowDom(css)}\`
    }
  `

  await fs.writeFile('./dist/menu.css.ts', file)
}

export default defineConfig({
  entry: {
    menu: 'lib/index.tsx',
  },
  external: ['react', 'react-dom'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'esnext',
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
  },
  onSuccess: createCssGetter,
})
