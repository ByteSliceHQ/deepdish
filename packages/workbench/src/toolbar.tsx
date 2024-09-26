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

// https://github.com/facebook/create-react-app/pull/8177... fix types here and make sure passed in component supports asChild
type ToolbarProps = {
  signInButton: React.FunctionComponent<{ children: JSX.Element }>
  signOutButton: React.FunctionComponent<{ children: JSX.Element }>
}

export function Toolbar(props: ToolbarProps) {
  const workbench = useWorkbench()

  const SignInButton = props.signInButton
  const SignOutButton = props.signOutButton

  return (
    <div className={wrapper}>
      <div className={group}>
        <div>DeepDish</div>
        {workbench.authenticated ? (
          <SignOutButton>
            <Button>Sign Out</Button>
          </SignOutButton>
        ) : (
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        )}
      </div>
    </div>
  )
}
