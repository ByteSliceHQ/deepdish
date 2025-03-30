import * as v from 'valibot'

const jwtSchema = v.string()

export async function createSessionJwt(
  baseDeepdishCloudUrl: string,
  token: string,
  sessionId: string,
) {
  const response = await fetch(`${baseDeepdishCloudUrl}/jwt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      sessionId,
    }),
  })

  const json = await response.json()
  return v.parse(jwtSchema, json)
}

export async function revokeSession(
  baseDeepdishCloudUrl: string,
  token: string,
  sessionId: string,
) {
  const response = await fetch(`${baseDeepdishCloudUrl}/session`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      sessionId,
    }),
  })

  if (response.status !== 204) {
    throw new Error('Failed to revoke session.')
  }
}
