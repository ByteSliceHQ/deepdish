type BaseUrlConfig = {
  productionBaseProtocol?: 'https' | 'http'
  previewBaseProtocol?: 'https' | 'http'
  localhost?: string
}

export function getBaseUrl(config?: BaseUrlConfig) {
  const productionBaseProtocol = config?.productionBaseProtocol ?? 'https'
  const previewBaseProtocol = config?.previewBaseProtocol ?? 'https'
  const localhost = config?.localhost ?? 'http://localhost:3000'

  // biome-ignore lint/nursery/noProcessEnv: Required for Vercel integration
  switch (process.env.VERCEL_ENV) {
    case 'production':
      // biome-ignore lint/nursery/noProcessEnv: Required for Vercel integration
      return `${productionBaseProtocol}://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    case 'preview':
      // biome-ignore lint/nursery/noProcessEnv: Required for Vercel integration
      return `${previewBaseProtocol}://${process.env.VERCEL_BRANCH_URL}`
    case 'development':
      return localhost
    default:
      return localhost
  }
}
