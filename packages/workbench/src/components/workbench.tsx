import { WorkbenchProvider, useShadowRoot } from '@/lib/context'
import { queryClient, useAuth } from '@/lib/queries'
import { cn } from '@/lib/utils'
import { useActions, useMode } from '@deepdish/core/context'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  ChevronDown,
  ChevronUp,
  EyeIcon,
  LoaderCircle,
  PencilIcon,
  TerminalIcon,
} from 'lucide-react'
import { useState } from 'react'
import type { Dispatch, RefObject, SetStateAction } from 'react'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

function Spinner() {
  return <LoaderCircle className="animate-spin" />
}

type ContainerProps = {
  isExpanded?: boolean
  children: React.ReactNode
}

function Container({ children, isExpanded = true }: ContainerProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 right-0 left-0 h-12 w-full flex items-center px-4 justify-between z-9999',
        isExpanded === true
          ? 'bg-white border-t border-t-gray-200 dark:border-t-gray-600'
          : 'bg-transparent',
      )}
    >
      {children}
    </div>
  )
}

function CollapseWorkbench({
  setIsExpanded,
}: {
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}) {
  const host = useShadowRoot()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" onMouseDown={() => setIsExpanded(false)}>
          <ChevronDown />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" portal={host}>
        <p className="text-xs">Collapse workbench</p>
      </TooltipContent>
    </Tooltip>
  )
}

function ExpandWorkbench({
  setIsExpanded,
}: {
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}) {
  const host = useShadowRoot()

  return (
    <Container isExpanded={false}>
      <div className="flex items-center gap-2 ml-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onMouseDown={() => setIsExpanded(true)}>
              <ChevronUp />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" portal={host}>
            <p className="text-xs">Expand workbench</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Container>
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

function Toolbar(props: {
  title?: React.ReactNode
  setIsExpanded: Dispatch<SetStateAction<boolean>>
  authDisabled?: boolean
}) {
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
        <TerminalIcon className="h-4 w-4" />
        {props.title ?? <p className="text-xs">Deepdish Workbench</p>}
      </div>
      <div className="flex items-center gap-2">
        {!props.authDisabled ? (
          signedIn ? (
            <Button variant="secondary" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={handleSignIn}>
              Sign in
            </Button>
          )
        ) : null}
        {signedIn ? <ModeButton /> : null}
        <CollapseWorkbench setIsExpanded={props.setIsExpanded} />
      </div>
    </Container>
  )
}

export type WorkbenchProps = {
  ref?: RefObject<HTMLElement>
  title?: React.ReactNode
  authDisabled?: boolean
}

export function Workbench(props: WorkbenchProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WorkbenchProvider ref={props.ref}>
          {isExpanded ? (
            <Toolbar
              title={props.title}
              setIsExpanded={setIsExpanded}
              authDisabled={props.authDisabled}
            />
          ) : (
            <ExpandWorkbench setIsExpanded={setIsExpanded} />
          )}
        </WorkbenchProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
