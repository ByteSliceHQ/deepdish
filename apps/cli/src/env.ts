import * as v from 'valibot'

const envSchema = v.object({
  DEEPDISH_CLOUD_ADMIN_URL: v.string(),
  DEEPDISH_CLOUD_CLI_URL: v.string(),
  OAUTH_AUTHORIZE_URL: v.string(),
})

// NB: parsing process.env directly with `v.parse` doesn't work,
// we seemingly need to structure these values manually
const values = {
  /* @ts-ignore */
  DEEPDISH_CLOUD_ADMIN_URL: process.env.DEEPDISH_CLOUD_ADMIN_URL,
  /* @ts-ignore */
  DEEPDISH_CLOUD_CLI_URL: process.env.DEEPDISH_CLOUD_CLI_URL,
  /* @ts-ignore */
  OAUTH_AUTHORIZE_URL: process.env.OAUTH_AUTHORIZE_URL,
}

export const env = v.parse(envSchema, values)
