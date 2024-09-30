'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './button'
import * as styles from './editor.css'

type EditorProps = {
  value?: string | null
  onUpdate: (value: string | null) => Promise<void>
}

export function Editor(props: EditorProps) {
  const [value, setValue] = useState<string>(props.value || '')
  const router = useRouter()

  // TODO: add loading variant to button
  const [loading, setLoading] = useState<boolean>(false)

  const handleUpdate = async () => {
    try {
      setLoading(true)
      await props.onUpdate(value)
      router.refresh()
    } catch {
      // TODO: handle error case
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <textarea
        value={value}
        disabled={loading}
        className={styles.textarea}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <Button type="submit" disabled={loading} onClick={handleUpdate}>
        Save
      </Button>
    </div>
  )
}
