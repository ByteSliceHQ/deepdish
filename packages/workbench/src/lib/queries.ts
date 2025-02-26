import { trpc } from '@deepdish/trpc/client'
import { QueryClient, queryOptions, useQuery } from '@tanstack/react-query'
import { health, verify } from './api'

export const queryClient = new QueryClient()

export function useAuth() {
  const health = useHealth()

  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      return await verify()
    },
    enabled: health.data?.ok,
  })
}

export function useHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      return await health()
    },
  })
}

export function catalogOptions() {
  return queryOptions({
    queryKey: ['catalog'],
    queryFn: async () => {
      return await trpc.getCatalog.query()
    },
  })
}

export function keyOptions(name: string) {
  return queryOptions({
    queryKey: ['key', name],
    queryFn: async () => {
      return await trpc.getKey.query({ name })
    },
  })
}
