namespace NodeJS {
  interface ProcessEnv {
    DEEPDISH_MODE: 'draft' | 'live'
    DEEPDISH_PROJECT_ALIAS: string
    DEEPDISH_SECRET_KEY: string
  }
}
