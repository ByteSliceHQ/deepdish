import { getSettings } from '@deepdish/ui/config'
import { Provider } from './provider'

export function Config(props: { children: React.ReactNode }) {
  const settings = getSettings()
  const draft = settings.failure ? false : settings.data.draft

  return <Provider draft={draft}>{props.children}</Provider>
}
