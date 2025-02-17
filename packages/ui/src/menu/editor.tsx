'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './button'
import * as styles from './editor.css'

type EditorProps = {
  value?: string | null
  onUpdate: (value: string | null) => Promise<void>
}

export function Editor(props: EditorProps) {
  const router = useRouter()
  const [value, setValue] = useState<string>(props.value || '')
  const [loading, setLoading] = useState<boolean>(false)

  const handleUpdate = async () => {
    setLoading(true)
    await props.onUpdate(value)
    // TODO: conditionally refresh if update was unsuccessful
    router.refresh()
    setLoading(false)
  }

  return (
    <form
      className={styles.wrapper}
      onSubmit={(e) => {
        e.preventDefault()
        handleUpdate()
      }}
    >
      <textarea
        value={value}
        disabled={loading}
        className={styles.textarea}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={(e) => {
          // NB: ensures sub menu isn't closed when arrow keys are pressed
          e.stopPropagation()

          if (e.metaKey && e.key === 'Enter') {
            e.preventDefault()
            handleUpdate()
          }
        }}
      />
      <Button type="submit" disabled={loading} loading={loading}>
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  )
}
