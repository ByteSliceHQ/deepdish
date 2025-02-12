import { useAuth, queryClient } from '@/lib/queries'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  ChevronUpIcon,
  EyeIcon,
  LoaderCircle,
  PencilIcon,
  TerminalIcon,
} from 'lucide-react'
import { useActions, useMode } from '@deepdish/core/context'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { useShadowRoot, WorkbenchProvider } from '@/lib/context'
import type { RefObject } from 'react'

function Spinner() {
  return <LoaderCircle className="animate-spin" />
}

type ContainerProps = {
  children: React.ReactNode
}

function Container(props: ContainerProps) {
  return (
    <div className="fixed bottom-0 right-0 left-0 h-12 w-full border-t border-t-gray-200 dark:border-t-gray-600 flex items-center px-4 justify-between">
      {props.children}
    </div>
  )
}

function ExpandButton() {
  const host = useShadowRoot()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <ChevronUpIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" portal={host}>
        <p>Expand DeepDish Workbench</p>
      </TooltipContent>
    </Tooltip>
  )
}

function ModeButton() {
  const actions = useActions()
  const mode = useMode()

  return (
    <Button size="sm" variant="secondary" onClick={actions.toggleMode}>
      {mode === 'edit' ? <PencilIcon /> : <EyeIcon />}
      {mode === 'edit' ? 'Editing' : 'Viewing'}
    </Button>
  )
}

function Toolbar() {
  const auth = useAuth()

  if (auth.isPending) {
    return (
      <Container>
        <Spinner />
      </Container>
    )
  }

  function handleSignIn() {
    window.location.assign('/__deepdish/sign-in')
  }

  function handleSignOut() {
    window.location.assign('/__deepdish/sign-out')
  }

  const signedIn = auth.data?.signedIn

  return (
    <Container>
      <div className="flex items-center gap-2">
        <TerminalIcon />
        {signedIn ? (
          <Button variant="secondary" size="sm" onClick={handleSignOut}>
            Sign out
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={handleSignIn}>
            Sign in
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {signedIn ? <ModeButton /> : null}
        <ExpandButton />
      </div>
    </Container>
  )
}

type WorkbenchProps = {
  ref?: RefObject<HTMLElement>
}

export function Workbench(props: WorkbenchProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WorkbenchProvider ref={props.ref}>
          <Toolbar />
        </WorkbenchProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
