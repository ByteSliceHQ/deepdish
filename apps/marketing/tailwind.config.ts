import type { Config } from 'tailwindcss'
import { config as sharedConfig } from '@deepdish/config-tailwind'

const config: Pick<Config, 'content' | 'presets'> = {
  content: ['./src/**/*.tsx'],
  presets: [sharedConfig],
}

export default config
