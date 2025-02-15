'use client'

import { createContext, useContext, useState } from 'react'
import { useStore } from 'zustand'
import { type Selector, type Store, createDeepDishStore } from './state'

const DeepDishContext = createContext<Store | null>(null)

function useDeepDish<T>(selector: Selector<T>) {
  const store = useContext(DeepDishContext)

  if (!store) {
    throw new Error(
      'The `useDeepDish` hook must be used within a `DeepDishProvider`.',
    )
  }

  return useStore(store, selector)
}

export function useActions() {
  return useDeepDish((state) => state.actions)
}

export function useMode() {
  return useDeepDish((state) => state.mode)
}

export function useWorkbenchOpen() {
  return useDeepDish((state) => state.workbench.open)
}

type DeepDishProviderProps = {
  children: React.ReactNode
}

export function DeepDishProvider(props: DeepDishProviderProps) {
  const [store] = useState(createDeepDishStore)

  return (
    <DeepDishContext.Provider value={store}>
      {props.children}
    </DeepDishContext.Provider>
  )
}
