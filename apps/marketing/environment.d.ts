namespace NodeJS {
  interface ProcessEnv {
    DEEPDISH_OAUTH_URL: string
    DEEPDISH_RESOLVER: 'local' | 'cloud'
    DEEPDISH_SECRET_KEY: string
    DEEPDISH_URL: string
  }
}
