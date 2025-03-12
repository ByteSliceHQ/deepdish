import { Button } from '@/components/ui/button'
import { Menu } from '@/menu'
import { useState } from 'react'
import * as v from 'valibot'

const typographySchema = v.string()

const paragraph = v.parse(typographySchema, 'Paragraph')

const featureSchema = v.object({
  name: v.string(),
  description: v.string(),
})

const feature = v.parse(featureSchema, {
  name: 'Feature Name',
  description: 'Feature Description',
})

async function noop() {}

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
        deepdishContract="typography"
        deepdishKey="test/typography"
        mode={mode}
        onRequestEdit={noop}
        onUpdate={noop}
        value={paragraph}
      >
        <p>{paragraph}</p>
      </Menu>
      <Menu
        deepdishContract="feature"
        deepdishKey="test/feature"
        mode={mode}
        onRequestEdit={noop}
        onUpdate={noop}
        value={feature}
      >
        <div className="border rounded shadow-sm py-3 px-4">
          <h1 className="font-bold text-gray-800">{feature.name}</h1>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      </Menu>
    </div>
  )
}
