import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAuthDisabled, useTitle } from '@/lib/context'
import { useAuth } from '@/lib/queries'
import { useActions, useMode, useWorkbenchOpen } from '@deepdish/core/context'
import {
  Link,
  Outlet,
  useCanGoBack,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDown,
  ChevronUp,
  EyeIcon,
  LoaderCircle,
  PencilIcon,
  TerminalIcon,
} from 'lucide-react'
import { Resizable } from 're-resizable'

function Spinner() {
  return <LoaderCircle className="animate-spin" />
}

function ExpandButton() {
  const actions = useActions()
  const workbenchOpen = useWorkbenchOpen()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={actions.toggleWorkbench}>
          {workbenchOpen ? <ChevronDown /> : <ChevronUp />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p className="text-xs">{workbenchOpen ? 'Collapse' : 'Expand'}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function ModeButton() {
  const actions = useActions()
  const mode = useMode()

  return (
    <Tooltip>
      <TooltipTrigger asChild onClick={(event) => event.preventDefault()}>
        <Button size="sm" variant="secondary" onClick={actions.toggleMode}>
          {mode === 'edit' ? <PencilIcon /> : <EyeIcon />}
          {mode === 'edit' ? 'Editing' : 'Viewing'}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        hidden={mode === 'view'}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <p className="text-xs">
          Right-click on a highlighted element to edit its content.
        </p>
      </TooltipContent>
    </Tooltip>
  )
}

function AuthButtons() {
  const auth = useAuth()
  const signedIn = auth.data?.signedIn

  function handleSignIn() {
    window.location.assign('/__deepdish/sign-in')
  }

  function handleSignOut() {
    window.location.assign('/__deepdish/sign-out')
  }

  if (signedIn) {
    return (
      <Button variant="secondary" size="sm" onClick={handleSignOut}>
        Sign out
      </Button>
    )
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleSignIn}>
      Sign in
    </Button>
  )
}

function TopBar() {
  const auth = useAuth()
  const authDisabled = useAuthDisabled()
  const title = useTitle()

  const signedIn = auth.data?.signedIn

  return (
    <>
      <div className="flex items-center gap-2">
        <TerminalIcon className="h-4 w-4" />
        {title ?? <p className="text-xs">DeepDish Workbench</p>}
      </div>
      <div className="flex items-center gap-2">
        {!authDisabled ? <AuthButtons /> : null}
        {signedIn ? <ModeButton /> : null}
        <ExpandButton />
      </div>
    </>
  )
}

function Wrapper(props: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 right-0 left-0 w-full bg-white border-t border-t-gray-200 dark:border-t-gray-600">
      {props.children}
    </div>
  )
}

function ResizableContainer(props: { children: React.ReactNode }) {
  return (
    <Resizable
      minHeight={200}
      defaultSize={{
        height: 500,
      }}
      enable={{
        top: true,
      }}
    >
      {props.children}
    </Resizable>
  )
}

function NavButtons() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        title="Go back"
        disabled={!canGoBack}
        onClick={() => router.history.back()}
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        title="Go forward"
        onClick={() => router.history.forward()}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  )
}

function NavigationSpinner() {
  const routerState = useRouterState()

  if (routerState.isLoading) {
    return <Spinner />
  }

  return null
}

function NavBar() {
  return (
    <div className="flex items-center gap-2 w-full">
      <NavButtons />
      <div className="flex items-center gap-2 ml-2">
        <Link to="/catalog">
          {({ isActive }) => (
            <Button size="sm" variant={isActive ? 'default' : 'outline'}>
              Catalog
            </Button>
          )}
        </Link>
        <Link to="/logs">
          {({ isActive }) => (
            <Button size="sm" variant={isActive ? 'default' : 'outline'}>
              Logs
            </Button>
          )}
        </Link>
        <Link to="/tone">
          {({ isActive }) => (
            <Button size="sm" variant={isActive ? 'default' : 'outline'}>
              Tone
            </Button>
          )}
        </Link>
        <Link to="/i18n">
          {({ isActive }) => (
            <Button size="sm" variant={isActive ? 'default' : 'outline'}>
              i18n
            </Button>
          )}
        </Link>
      </div>
      <div className="ml-auto">
        <NavigationSpinner />
      </div>
    </div>
  )
}

export function Layout() {
  const workbenchOpen = useWorkbenchOpen()
  const auth = useAuth()

  if (auth.isPending) {
    return (
      <Wrapper>
        <div className="flex items-center px-4 z-9999 h-[48px]">
          <Spinner />
        </div>
      </Wrapper>
    )
  }

  if (!workbenchOpen) {
    return (
      <Wrapper>
        <div className="flex items-center px-4 z-9999 justify-between h-[48px]">
          <TopBar />
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <ResizableContainer>
        <div className="flex flex-col h-full overflow-y-hidden">
          <div className="flex items-center z-9999 justify-between px-4 py-2 border-b">
            <TopBar />
          </div>
          <div className="flex items-center z-9999 justify-between px-4 py-2 border-b bg-gray-50">
            <NavBar />
          </div>
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </ResizableContainer>
    </Wrapper>
  )
}
