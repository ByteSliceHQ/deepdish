export function getBaseUrl({
  productionBaseProtocol = 'https',
  previewBaseProtocol = 'https',
  localhost = 'http://localhost:3000',
}: {
  productionBaseProtocol?: 'https' | 'http'
  previewBaseProtocol?: 'https' | 'http'
  localhost?: string
}) {
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
