import {
  QueryClient,
  queryOptions,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { health, verify } from './api'
import { useProcedures, type Procedures } from './context'

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

export function useContracts() {
  const procedures = useProcedures()
  return useSuspenseQuery(contractsOptions(procedures))
}

export function useContractKeys(contractName: string) {
  const procedures = useProcedures()
  return useSuspenseQuery(contractKeysOptions(procedures, contractName))
}

export function useContractSchema(contractName: string) {
  const procedures = useProcedures()
  return useSuspenseQuery(contractSchemaOptions(procedures, contractName))
}

export function useKey(contractName: string, keyName: string) {
  const procedures = useProcedures()
  return useSuspenseQuery(keyOptions(procedures, contractName, keyName))
}

export function useUpdateKey(contractName: string, keyName: string) {
  const procedures = useProcedures()

  return useMutation({
    mutationFn: async (data: string | boolean | number | object) => {
      await procedures.updateKey(contractName, keyName, data)
    },
  })
}

export function contractsOptions(procedures: Procedures) {
  return queryOptions({
    queryKey: ['contracts'],
    queryFn: async () => {
      return await procedures.getContracts()
    },
  })
}

export function contractKeysOptions(
  procedures: Procedures,
  contractName: string,
) {
  return queryOptions({
    queryKey: ['contracts', contractName, 'keys'],
    queryFn: async () => {
      return await procedures.getContractKeys(contractName)
    },
  })
}

export function contractSchemaOptions(
  procedures: Procedures,
  contractName: string,
) {
  return queryOptions({
    queryKey: ['contracts', contractName, 'schema'],
    queryFn: async () => {
      return await procedures.getContractSchema(contractName)
    },
  })
}

export function keyOptions(
  procedures: Procedures,
  contractName: string,
  keyName: string,
) {
  return queryOptions({
    queryKey: ['contracts', contractName, 'keys', keyName],
    queryFn: async () => {
      return await procedures.getKey(contractName, keyName)
    },
  })
}
