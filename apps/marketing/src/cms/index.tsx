import { auth } from '@clerk/nextjs/server'
import { createTypographyResolver } from '@deepdish-cloud/resolvers/typography'
import { configure } from '@deepdish/config'
import { auth } from '@clerk/nextjs/server'

export function cms(url: string, apiKey: string) {
  configure({
    contracts: {
      typography: {
        resolver: createTypographyResolver(url, apiKey),
      },
    },
    draft: {
      auth: () => Boolean(auth().userId),
    },
  })
}
