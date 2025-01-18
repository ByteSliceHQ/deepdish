type Mode = 'edit' | 'view'

export type State = {
  mode: Mode
}

export const initialState: State = {
  mode: 'view',
}
