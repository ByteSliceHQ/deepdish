import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import type { Content } from '.'

function Wrapper(props: {
  children: React.ReactNode
  onSubmit: (content: Content) => void
}) {
  return (
    <div className="space-y-4">
      {props.children}
      <Button variant="default">Submit</Button>
    </div>
  )
}

export function SimpleNumberForm(props: {
  content: number
  onSubmit: (content: Content) => void
  uniqueId: string
}) {
  const [value, setValue] = useState<number>(props.content)

  return (
    <Wrapper onSubmit={props.onSubmit}>
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </Wrapper>
  )
}

export function SimpleTextForm(props: {
  content: string
  onSubmit: (content: Content) => void
  uniqueId: string
}) {
  const [value, setValue] = useState<string>(props.content)

  return (
    <Wrapper onSubmit={props.onSubmit}>
      <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    </Wrapper>
  )
}
