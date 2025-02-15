import * as v from 'valibot'

const HealthCheckSchema = v.object({
  ok: v.boolean(),
})

export async function health() {
  const response = await fetch('/__deepdish/health')
  const body = await response.json()

  return v.parse(HealthCheckSchema, body)
}

const AuthSchema = v.object({
  signedIn: v.boolean(),
})

export async function verify() {
  const response = await fetch('/__deepdish/verify')
  const body = await response.json()

  return v.parse(AuthSchema, body)
}
