namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string
    DEEPDISH_CLOUD_ENDPOINT: string
    DEEPDISH_CLOUD_OAUTH_CLIENT_ID: string
    DEEPDISH_CLOUD_OAUTH_REDIRECT_URI: string
    DEEPDISH_CLOUD_STATE: string
    DEEPDISH_MODE?: 'draft'
    DEEPDISH_PROJECT_ALIAS: string
    DEEPDISH_SECRET_KEY: string
    NEXT_PUBLIC_POSTHOG_KEY: string
  }
}
