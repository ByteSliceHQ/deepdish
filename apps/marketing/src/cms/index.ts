import { createTypographyResolver } from '@deepdish-cloud/resolvers/typography'
import { configure } from '@deepdish/config'

export function cms(url: string, apiKey: string) {
  configure({
    contracts: {
      typography: {
        resolver: createTypographyResolver(url, apiKey),
      },
    },
  })
}
