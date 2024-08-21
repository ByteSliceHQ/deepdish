import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { configure } from '@deepdish/config'
import { createJsonResolver } from '@deepdish/resolvers/json'
import { typographySchema } from '@deepdish/ui/typography'

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
