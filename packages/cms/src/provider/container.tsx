import { getSettings } from '@deepdish/ui/config'
import { Provider } from './provider'

export function ProviderContainer(props: {
  children: React.ReactNode
  title?: string
}) {
  const settings = getSettings()
  const draft = settings.failure ? false : settings.data.draft

  return (
    <Provider draft={draft} title={props.title}>
      {props.children}
    </Provider>
  )
}
