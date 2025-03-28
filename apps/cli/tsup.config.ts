import dotenv from 'dotenv'
import { defineConfig } from 'tsup'

function parseEnv() {
  const env = dotenv.config({
    path: '.env.development',
  })

  if (env.error) {
    throw env.error
  }

  if (!env.parsed) {
    throw new Error('Environment was parsed, but no result was returned.')
  }

  const vars = Object.keys(env.parsed)

  return vars.reduce(
    (acc, key) => {
      if (key in process.env && process.env[key]) {
        acc[key] = process.env[key]
      }

      return acc
    },
    {} as Record<string, string>,
  )
}

export default defineConfig({
  entry: ['src/bin/cli.ts', 'src/bin/bash-complete.ts'],
  format: ['esm'],
  clean: true,
  splitting: true,
  minify: true,
  env: parseEnv(),
})
