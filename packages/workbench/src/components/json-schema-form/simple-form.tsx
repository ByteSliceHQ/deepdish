import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import type { Content } from '.'

function Wrapper(props: {
  children: React.ReactNode
}) {
  return <div className="space-y-4">{props.children}</div>
}

export function SimpleNumberForm(props: {
  content: number
  onSubmit: (content: Content) => Promise<void>
  uniqueId: string
}) {
  const [value, setValue] = useState<number>(props.content)
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit() {
    setLoading(true)
    await props.onSubmit(value)
    setLoading(false)
  }

  return (
    <Wrapper>
      <Input
        type="number"
        value={value || 0}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <Button
        variant="default"
        size="sm"
        loading={loading}
        onClick={handleSubmit}
      >
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </Wrapper>
  )
}

export function SimpleTextForm(props: {
  content: string
  onSubmit: (content: Content) => void
  uniqueId: string
}) {
  const [value, setValue] = useState<string>(props.content || '')
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit() {
    setLoading(true)
    await props.onSubmit(value)
    setLoading(false)
  }

  return (
    <Wrapper>
      <Input
        value={value || ''}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <Button
        variant="default"
        size="sm"
        loading={loading}
        onClick={handleSubmit}
      >
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </Wrapper>
  )
}
