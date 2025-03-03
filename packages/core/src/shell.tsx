'use client'

import { useMode } from './context'

function HighlightBox(props: {
  children: React.ReactNode
  deepdishKey: string
}) {
  // https://tailwindcss.com/docs/colors#default-color-palette-reference
  const sky50 = 'oklch(0.977 0.013 236.62)'
  const sky400 = 'oklch(0.828 0.111 230.318)'

  return (
    <div
      style={{
        outline: `2px solid ${sky400}`,
        outlineOffset: '2px',
        position: 'relative',
        borderRadius: '2px',
        display: 'table',
      }}
    >
      <div
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          position: 'absolute',
          fontSize: '10px',
          border: `1px solid ${sky400}`,
          background: sky50,
          borderRadius: '4px',
          padding: '2px 4px',
          top: '-16px',
          left: '12px',
        }}
      >
        {props.deepdishKey}
      </div>
      {props.children}
    </div>
  )
}

export function Shell(props: {
  children: React.ReactNode
  deepdishKey: string
}) {
  const mode = useMode()

  if (mode === 'edit') {
    return (
      <HighlightBox deepdishKey={props.deepdishKey}>
        {props.children}
      </HighlightBox>
    )
  }

  return <>{props.children}</>
}
