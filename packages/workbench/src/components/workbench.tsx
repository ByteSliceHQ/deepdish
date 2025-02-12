import { useState } from 'react'
import { WorkbenchProvider, useShadowRoot } from '@/lib/context'
import { queryClient, useAuth } from '@/lib/queries'
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
import type { RefObject } from 'react'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { cn } from '@/lib/utils'

function Spinner() {
  return <LoaderCircle className="animate-spin" />
}

type ContainerProps = {
  isExpanded?: boolean
  children: React.ReactNode
}

function Container(props: ContainerProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 right-0 left-0 h-12 w-full flex items-center px-4 justify-between z-9999',
        props.isExpanded === true
          ? 'bg-white border-t border-t-gray-200 dark:border-t-gray-600'
          : 'bg-transparent',
      )}
    >
      {props.children}
    </div>
  )
}

function ExpandButton({
  setIsExpanded,
}: {
  setIsExpanded: (isExpanded: boolean) => void
}) {
  const host = useShadowRoot()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" onMouseDown={setIsExpanded.bind(null, false)}>
          <ChevronDown />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" portal={host}>
        <p className="text-xs">Collapse workbench</p>
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

function Toolbar({
  title,
  setIsExpanded,
}: {
  title?: string
  setIsExpanded: (isExpanded: boolean) => void
}) {
  const auth = useAuth()

  if (auth.isPending) {
    return (
      <Container isExpanded={true}>
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
    <Container isExpanded={true}>
      <div className="flex items-center gap-2">
        <TerminalIcon className="h-4 w-4" />
        <p className="text-xs">{title ?? 'DeepDish Workbench'}</p>
      </div>
      <div className="flex items-center gap-2">
        {signedIn ? (
          <Button variant="secondary" size="sm" onClick={handleSignOut}>
            Sign out
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={handleSignIn}>
            Sign in
          </Button>
        )}
        {signedIn ? <ModeButton /> : null}
        <ExpandButton setIsExpanded={setIsExpanded} />
      </div>
    </Container>
  )
}

function ExpandWorkbench({
  setIsExpanded,
}: {
  setIsExpanded: (isExpanded: boolean) => void
}) {
  const host = useShadowRoot()

  return (
    <Container isExpanded={false}>
      <div className="flex items-center gap-2 ml-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onMouseDown={setIsExpanded.bind(null, true)}
            >
              <ChevronUp />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" portal={host}>
            {' '}
            <p className="text-xs">Expand workbench</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Container>
  )
}

type WorkbenchProps = {
  ref?: RefObject<HTMLElement>
  title?: string
}

export function Workbench(props: WorkbenchProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WorkbenchProvider ref={props.ref}>
          {isExpanded ? (
            <Toolbar title={props.title} setIsExpanded={setIsExpanded} />
          ) : (
            <ExpandWorkbench setIsExpanded={setIsExpanded} />
          )}
        </WorkbenchProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
