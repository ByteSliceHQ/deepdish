import { createStore } from 'zustand'

type Mode = 'edit' | 'view'

type Actions = {
  toggleMode: () => void
  toggleWorkbench: () => void
}

type State = {
  mode: Mode
  actions: Actions
  workbench: {
    open: boolean
  }
}

export type Selector<T> = (state: State) => T

export type Store = ReturnType<typeof createDeepDishStore>

export function createDeepDishStore() {
  return createStore<State>((set) => ({
    mode: 'view',
    workbench: { open: false },
    actions: {
      toggleMode: () => {
        set((state) => ({ mode: state.mode === 'edit' ? 'view' : 'edit' }))
      },
      toggleWorkbench: () => {
        set((state) => ({ workbench: { open: !state.workbench.open } }))
      },
    },
  }))
}
