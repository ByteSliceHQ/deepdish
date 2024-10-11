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

  function handleSignIn() {
    workbench.onSignIn()
  }

  async function handleSignOut() {
    await workbench.onSignOut()
    window.location.reload()
  }

  return (
    <div className={wrapper}>
      <div className={group}>
        <div>DeepDish</div>
        {workbench.authenticated ? (
          <Button onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <Button onClick={handleSignIn}>Sign In</Button>
        )}
      </div>
    </div>
  )
}
