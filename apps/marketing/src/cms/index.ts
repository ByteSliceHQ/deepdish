import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { configure } from '@deepdish/config'
import { typographySchema } from '@deepdish/config/schemas'
import { createJsonResolver } from '@deepdish/resolvers/json'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const jsonPath = path.resolve(__dirname, './data.json')

export function cms() {
  configure({
    contracts: {
      typography: {
        resolver: createJsonResolver(typographySchema, jsonPath),
      },
    },
  })
}
