import { Feature as Component } from '@/cms'
import type { DeepDishProps } from '@deepdish/ui/deepdish'

export function Feature(props: {
  deepdish: DeepDishProps
}) {
  return (
    <Component
      deepdish={props.deepdish}
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
