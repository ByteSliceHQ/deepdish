import * as v from 'valibot'
import { useActions, useMode } from '@deepdish/core/context'
import { Button } from '@/components/ui/button'
import { Menu } from '@/menu'

const typographySchema = v.string()

const featureSchema = v.object({
  name: v.string(),
  description: v.string(),
})

export function App() {
  const mode = useMode()
  const actions = useActions()

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <Button onClick={actions.toggleMode}>
        {mode === 'view' ? 'Viewing' : 'Editing'}
      </Button>
      <Menu
        deepdishKey="test/typography"
        onUpdate={async (value) => {
          console.log('Updating test/typography', value)
        }}
        value={v.parse(typographySchema, 'Hello, world!')}
      >
        <p>Paragraph</p>
      </Menu>
      <Menu
        deepdishKey="test/feature"
        onUpdate={async (value) => {
          console.log('Updating test/feature', value)
        }}
        value={v.parse(featureSchema, {
          name: 'Feature Name',
          description: 'Feature Description',
        })}
      >
        <div className="border rounded shadow-sm py-3 px-4">
          <h1 className="font-bold text-gray-800">Feature Title</h1>
          <p className="text-gray-600">Feature Description</p>
        </div>
      </Menu>
    </div>
  )
}
