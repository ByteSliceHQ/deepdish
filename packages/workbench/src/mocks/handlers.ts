import { delay } from '@/lib/utils'
import { http, HttpResponse } from 'msw'
import { catalog } from './data'
import { trpcMsw } from './trpc'

let signedIn = false

async function randomDelay(max: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * max))
}

export const handlers = [
  trpcMsw.getCatalog.query(async () => {
    await randomDelay(2000)

    return catalog
  }),
  trpcMsw.getKey.query(async ({ name }) => {
    await randomDelay(2000)

    const keyData = catalog.keys.find((key) => key.name === name)

    if (!keyData) {
      throw new Error(`Key not found: ${name}`)
    }

    return keyData
  }),
  http.get('/__deepdish/health', async () => {
    await delay(100)

    return HttpResponse.json({
      ok: true,
    })
  }),
  http.get('/__deepdish/verify', async () => {
    await delay(1000)

    return HttpResponse.json({
      signedIn,
    })
  }),
  http.get('/__deepdish/sign-in', async () => {
    signedIn = true

    await delay(2000)
    return HttpResponse.redirect('/')
  }),
  http.get('/__deepdish/sign-out', async () => {
    signedIn = false

    await delay(2000)
    return HttpResponse.redirect('/')
  }),
]
