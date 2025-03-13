import { components } from '@/app/layout'
import { contracts } from '@/cms'
import { headers } from 'next/headers'

const Component = components.text
const contract = contracts.text

type TextProps = Omit<React.ComponentProps<typeof Component>, 'onUpdate'>

export function Text(props: TextProps) {
  return (
    <Component
      {...props}
      onUpdate={async (key, value) => {
        'use server'

        await contract.resolver.write({ key, headers: await headers() }, value)
      }}
    />
  )
}
