import * as v from 'valibot'

export type Config = v.InferOutput<typeof configSchema>

const configSchema = v.object({
  clerkPublishableKey: v.string(),
  clientId: v.string(),
})

const tokenSchema = v.object({
  idToken: v.string(),
  expiresIn: v.number(),
  accessToken: v.string(),
  refreshToken: v.string(),
  scope: v.string(),
  tokenType: v.string(),
})

const ticketSchema = v.object({
  id: v.string(),
  userId: v.string(),
  token: v.string(),
  status: v.string(),
  url: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
})

export async function getConfig(cloudCliUrl: string) {
  const response = await fetch(`${cloudCliUrl}/config`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const json = await response.json()
  return v.parse(configSchema, json)
}

export async function exchangeCallbackCodeForToken(
  cloudCliUrl: string,
  callbackCode: string,
) {
  const response = await fetch(`${cloudCliUrl}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: callbackCode,
    }),
  })

  const json = await response.json()
  return v.parse(tokenSchema, json)
}

export async function exchangeTokenForTicket(
  cloudCliUrl: string,
  token: string,
) {
  const response = await fetch(`${cloudCliUrl}/ticket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const json = await response.json()
  return v.parse(ticketSchema, json)
}
