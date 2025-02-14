import { getSettings } from '@deepdish/ui/config'
import { Provider } from './provider'

export function ProviderContainer(props: {
  children: React.ReactNode
  title?: React.ReactNode
  authDisabled?: boolean
}) {
  const settings = getSettings()
  const draft = settings.failure ? false : settings.data.draft

  return (
    <Provider
      draft={draft}
      title={props.title}
      authDisabled={props.authDisabled}
    >
      {props.children}
    </Provider>
  )
}
