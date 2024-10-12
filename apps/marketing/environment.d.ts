namespace NodeJS {
  interface ProcessEnv {
    CLERK_OAUTH_CLIENT_ID: string
    CLERK_OAUTH_REDIRECT_URL: string
    CLERK_URL: string
    DEEPDISH_OAUTH_URL: string
    DEEPDISH_PROJECT_ALIAS: string
    DEEPDISH_RESOLVER: 'local' | 'cloud'
    DEEPDISH_SECRET_KEY: string
    DEEPDISH_URL: string
  }
}
