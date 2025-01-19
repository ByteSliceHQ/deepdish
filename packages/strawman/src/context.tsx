'use client'

import { createContext, useContext, useState } from 'react'
import { useStore } from 'zustand'
import { type Store, createDeepDishStore } from './state'

const DeepDishContext = createContext<Store | null>(null)

export function useDeepDish() {
  const store = useContext(DeepDishContext)

  if (!store) {
    throw new Error(
      'The `useDeepDish` hook must be used within a `DeepDishProvider`.',
    )
  }

  return useStore(store)
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
