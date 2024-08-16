import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJsonResolver } from '@deepdish/resolvers/json'
import { setConfigMap } from '@deepdish/ui/config'
import { typographySchema } from '@deepdish/ui/typography'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const jsonPath = path.resolve(__dirname, './data.json')

export function cms() {
  setConfigMap({
    typography: {
      resolver: createJsonResolver(typographySchema, jsonPath),
    },
  })
}
