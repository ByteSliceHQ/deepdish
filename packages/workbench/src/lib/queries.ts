import { QueryClient, useQuery } from '@tanstack/react-query'
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
