import { createStore } from 'zustand'

type Mode = 'edit' | 'view'

type Actions = {
  toggleMode: () => void
}

type State = {
  mode: Mode
  actions: Actions
}

export type Selector<T> = (state: State) => T

export type Store = ReturnType<typeof createDeepDishStore>

export function createDeepDishStore() {
  return createStore<State>((set) => ({
    mode: 'view',
    actions: {
      toggleMode: () => {
        set((state) => ({ mode: state.mode === 'edit' ? 'view' : 'edit' }))
      },
    },
  }))
}
