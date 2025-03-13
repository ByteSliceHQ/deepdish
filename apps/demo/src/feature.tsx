import { components } from '@/app/layout'
import { contracts } from '@/cms'
import type { DeepDishProps } from '@deepdish/ui/deepdish'
import { headers } from 'next/headers'

const Component = components.feature
const contract = contracts.feature

export function Feature(props: {
  deepdish: DeepDishProps
}) {
  return (
    <Component
      deepdish={props.deepdish}
      onUpdate={async (key, value) => {
        'use server'

        await contract.resolver.write({ key, headers: await headers() }, value)
      }}
      render={async (value) => {
        return (
          <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm inline-block">
            <h1 className="text-xl text-gray-800 font-bold">
              {value?.name ?? 'Feature Name'}
            </h1>
            <p className="text-gray-500">
              {value?.description ?? 'Feature Description'}
            </p>
          </div>
        )
      }}
    />
  )
}
