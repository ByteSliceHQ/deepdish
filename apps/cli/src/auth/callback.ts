import http from 'node:http'
import { withResult } from '@byteslice/result'
import * as v from 'valibot'

export const CALLBACK_PORT = 8765
export const CALLBACK_URL = `http://localhost:${CALLBACK_PORT}`

const callbackSchema = v.object({
  code: v.string(),
  state: v.string(),
})

const successHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Authentication Successful</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <svg class="w-16 h-16 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <h1 class="text-2xl font-semibold mt-4">Authentication Successful</h1>
        <p class="text-gray-600 mt-2">You can now return to your terminal and close this browser.</p>
      </div>
    </body>
  </html>
`

const failureHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Authentication Failed</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <svg class="w-16 h-16 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <h1 class="text-2xl font-semibold mt-4">Authentication Failed</h1>
        <p class="text-gray-600 mt-2">Something bad happened while trying to authenticate you. Please try again.</p>
        <p class="text-gray-600 mt-2">If the problem persists, <a href="mailto:help@byteslice.co" target="_blank">please let us know</a></p>.
      </div>
    </body>
  </html>
`

function extractCallbackParams(req: http.IncomingMessage) {
  if (!req.url) {
    throw new Error('No URL found in callback response.')
  }

  const url = new URL(req.url, CALLBACK_URL)
  return v.parse(callbackSchema, Object.fromEntries(url.searchParams.entries()))
}

export function createTemporaryCallbackServer(): Promise<
  v.InferOutput<typeof callbackSchema>
> {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const params = await withResult(
        () => extractCallbackParams(req),
        (err) => err,
      )

      if (params.failure) {
        res.writeHead(400, { 'Content-Type': 'text/html' })
        res.end(failureHtml)

        reject(params.failure)
        return
      }

      res.writeHead(200, {
        'Content-Type': 'text/html',
        // ensure server stops listening for subsequent requests and closes properly
        Connection: 'close',
      })

      res.end(successHtml)

      server.close(() => {
        resolve(params.data)
      })
    })

    server.listen(CALLBACK_PORT)
  })
}
