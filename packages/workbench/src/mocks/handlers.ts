import { delay } from '@/lib/utils'
import { http, HttpResponse } from 'msw'

let signedIn = false

export const handlers = [
  http.get('/__deepdish/verify', async () => {
    await delay(2000)

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
