'use client'

export async function init() {
  const res = await fetch('http://localhost:3000/oauth/introspect', {
    method: 'POST',
    credentials: 'include',
  })

  const body = await res.json()

  return body.token
}
