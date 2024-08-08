type Config = null

let config: Config

export function makeConfig(): void {
  if (config) {
    throw Error('Configuration has already been initialized')
  }

  config = null
}

export function getConfig(): Config {
  if (!config) {
    throw Error('Configuration has not been initialized')
  }

  return config
}
