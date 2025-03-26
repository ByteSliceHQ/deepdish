import * as v from 'valibot'

const envSchema = v.object({
  BASE_DEEPDISH_CLOUD_URL: v.string(),
  OAUTH_AUTHORIZE_URL: v.string(),
})

// NB: parsing process.env directly with `v.parse` doesn't work,
// we seemingly need to structure these values manually
const values = {
  /* @ts-ignore */
  BASE_DEEPDISH_CLOUD_URL: process.env.BASE_DEEPDISH_CLOUD_URL,
  /* @ts-ignore */
  OAUTH_AUTHORIZE_URL: process.env.OAUTH_AUTHORIZE_URL,
}

export const env = v.parse(envSchema, values)
