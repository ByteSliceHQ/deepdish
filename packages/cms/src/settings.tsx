import { getSettings } from '@deepdish/ui/config'
import { Provider } from './provider'

export function Settings(props: { children: React.ReactNode }) {
  const settings = getSettings()
  const draft = settings.failure ? false : settings.data.draft

  return <Provider draft={draft}>{props.children}</Provider>
}
