'use client'

import { createContext, useContext } from 'react'
import { type State, initialState } from './state'

const DeepDishContext = createContext<State | null>(null)

export function useDeepDish() {
  const context = useContext(DeepDishContext)

  if (!context) {
    throw new Error(
      'The `useDeepDish` hook must be used within a `DeepDishProvider`.',
    )
  }

  return context
}

type DeepDishProviderProps = {
  children: React.ReactNode
}

export function DeepDishProvider(props: DeepDishProviderProps) {
  return (
    <DeepDishContext.Provider value={initialState}>
      {props.children}
    </DeepDishContext.Provider>
  )
}
