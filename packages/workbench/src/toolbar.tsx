'use client'

import { useWorkbench } from './context'
import { stylesheet } from './stylesheet'
import { Button } from './ui/button'

const wrapper = stylesheet.style({
  border: `1px solid ${stylesheet.var('slate300')}`,
  borderRadius: '4px',
  position: 'fixed',
  bottom: '8px',
  left: '8px',
  background: 'white',
  padding: '10px 14px',
})

const group = stylesheet.style({
  fontSize: stylesheet.var('fontSizeSm'),
  color: stylesheet.var('slate600'),
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

export function Toolbar() {
  const workbench = useWorkbench()

  return (
    <div className={wrapper}>
      <div className={group}>
        <div>DeepDish</div>
        {workbench.authenticated ? (
          <Button onClick={workbench.onSignOut}>Sign Out</Button>
        ) : (
          <Button onClick={workbench.onSignIn}>Sign In</Button>
        )}
      </div>
    </div>
  )
}
