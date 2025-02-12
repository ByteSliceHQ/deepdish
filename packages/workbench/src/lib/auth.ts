import * as v from 'valibot'

const AuthSchema = v.object({
  signedIn: v.boolean(),
})

export async function verify() {
  const response = await fetch('/__deepdish/verify')
  const body = await response.json()

  return v.parse(AuthSchema, body)
}
