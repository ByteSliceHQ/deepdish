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

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      await props.onUpdate(value)
      router.refresh()
    } catch (err) {
      // TODO: log error properly
      // TODO: show error in global DeepDish toast
      console.error('Failed to save content:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.wrapper} onSubmit={handleUpdate}>
      <textarea
        value={value}
        disabled={loading}
        className={styles.textarea}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <Button type="submit" disabled={loading} loading={loading}>
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  )
}
