import { QueryClient, useQuery } from '@tanstack/react-query'
import { verify } from './auth'

export const queryClient = new QueryClient()

export function useAuth() {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      return await verify()
    },
  })
}
