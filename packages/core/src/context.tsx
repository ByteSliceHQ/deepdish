'use client'

import { createContext, useContext, useState } from 'react'
import { useStore } from 'zustand'
import { makeEmitter } from './events'
import { type Selector, type Store, createDeepDishStore } from './state'

type DeepDishContext = {
  emitter: ReturnType<typeof makeEmitter>
  store: Store
}

const DeepDishContext = createContext<DeepDishContext | null>(null)

function useDeepDish() {
  const context = useContext(DeepDishContext)

  if (!context) {
    throw new Error(
      'The `useDeepDish` hook must be used within a `DeepDishProvider`.',
    )
  }

  return context
}

function useDeepDishStore<T>(selector: Selector<T>) {
  const context = useDeepDish()
  return useStore(context.store, selector)
}

export function useActions() {
  return useDeepDishStore((state) => state.actions)
}

export function useEmitter() {
  const context = useDeepDish()
  return context.emitter
}

export function useMode() {
  return useDeepDishStore((state) => state.mode)
}

export function useWorkbenchOpen() {
  return useDeepDishStore((state) => state.workbench.open)
}

type DeepDishProviderProps = {
  children: React.ReactNode
}

export function DeepDishProvider(props: DeepDishProviderProps) {
  const [store] = useState(createDeepDishStore)
  const emitter = makeEmitter()

  return (
    <DeepDishContext.Provider value={{ store, emitter }}>
      {props.children}
    </DeepDishContext.Provider>
  )
}
