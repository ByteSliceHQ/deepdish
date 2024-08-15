import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJsonResolver } from '@deepdish/resolvers/json'
import { makeConfig } from '@deepdish/ui/config'
import { typographySchema } from '@deepdish/ui/typography'
import { featureResolver } from './resolvers'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const jsonPath = path.resolve(__dirname, './data.json')

export function cms() {
  makeConfig({
    typography: {
      resolver: createJsonResolver(typographySchema, jsonPath),
    },
    feature: {
      resolver: featureResolver,
    },
  })
}
