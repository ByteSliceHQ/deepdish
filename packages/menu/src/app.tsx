import * as v from 'valibot'
import { Button } from '@/components/ui/button'
import { Menu } from '@/menu'
import { useState } from 'react'

const typographySchema = v.string()

const featureSchema = v.object({
  name: v.string(),
  description: v.string(),
})

export function App() {
  const [mode, setMode] = useState<'view' | 'edit'>('view')

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <Button
        onClick={() => setMode((mode) => (mode === 'view' ? 'edit' : 'view'))}
      >
        {mode === 'view' ? 'Viewing' : 'Editing'}
      </Button>
      <Menu
        deepdishKey="test/typography"
        mode={mode}
        onUpdate={async (value) => {
          console.log('Updating test/typography', value)
        }}
        value={v.parse(typographySchema, 'Hello, world!')}
      >
        <p>Paragraph</p>
      </Menu>
      <Menu
        deepdishKey="test/feature"
        mode={mode}
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
