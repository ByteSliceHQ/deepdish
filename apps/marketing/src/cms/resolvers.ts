import { createResolver } from '@deepdish/resolvers'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { z } from 'zod'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const featuresPath = path.resolve(__dirname, './features.json')

const featureSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  featured: z.boolean(),
})

type Feature = z.infer<typeof featureSchema>

async function getFeatureIds(
  filter?: (key: string) => boolean,
): Promise<string[]> {
  const json = await readFile(featuresPath, { encoding: 'utf-8' })

  try {
    const parsed = JSON.parse(json)
    const ids = parsed.map((feature: Feature) => feature.id)

    if (filter) {
      return ids.filter(filter)
    }

    return ids
  } catch {
    return []
  }
}

async function getFeature(id: string) {
  const json = await readFile(featuresPath, { encoding: 'utf-8' })

  try {
    const parsed = JSON.parse(json)
    return parsed.find((feature: Feature) => feature.id === id)
  } catch {
    return null
  }
}

async function updateFeature(id: string, value: Feature) {
  const json = await readFile(featuresPath, { encoding: 'utf-8' })

  try {
    const parsed = JSON.parse(json)
    const index = parsed.findIndex((feature: Feature) => feature.id === id)
    parsed[index] = value

    return writeFile(featuresPath, JSON.stringify(parsed), {
      encoding: 'utf-8',
    })
  } catch {
    return null
  }
}

export const featureResolver = createResolver(featureSchema)(
  async (filter) => {
    return getFeatureIds(filter)
  },
  async ({ key }) => {
    return getFeature(key)
  },
  async ({ key }, value) => {
    'use server'

    await updateFeature(key, value)
  },
)
