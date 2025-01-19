import { createStore } from 'zustand'

type Mode = 'edit' | 'view'

type State = {
  mode: Mode
}

export type Selector<T> = (state: State) => T

export type Store = ReturnType<typeof createDeepDishStore>

export function createDeepDishStore() {
  return createStore<State>(() => ({
    mode: 'view',
  }))
}
